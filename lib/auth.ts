const SESSION_COOKIE = 'enter10_admin';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

export type Role = 'super_admin' | 'branch_admin';

export interface SessionPayload {
  email: string;
  role: Role;
  branchId: string | null;
}

interface SignedPayload extends SessionPayload {
  exp: number;
}

interface AccountRecord {
  email: string;
  password: string;
  role: Role;
  branchId: string | null;
}

function b64urlEncode(bytes: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(input: string): Uint8Array {
  const norm = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = norm.length % 4 === 0 ? '' : '='.repeat(4 - (norm.length % 4));
  const bin = atob(norm + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

function timingSafeStringEqual(a: string, b: string): boolean {
  const ea = new TextEncoder().encode(a);
  const eb = new TextEncoder().encode(b);
  if (ea.length !== eb.length) return false;
  return timingSafeEqual(ea, eb);
}

export async function signSession(payload: SessionPayload, secret: string): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const body: SignedPayload = { ...payload, exp };
  const payloadB64 = b64urlEncode(new TextEncoder().encode(JSON.stringify(body)));
  const key = await hmacKey(secret);
  const sig = new Uint8Array(
    await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payloadB64)),
  );
  return `${payloadB64}.${b64urlEncode(sig)}`;
}

export async function verifySession(
  token: string | undefined | null,
  secret: string,
): Promise<SessionPayload | null> {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payloadB64, sigB64] = parts;
  try {
    const key = await hmacKey(secret);
    const expected = new Uint8Array(
      await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payloadB64)),
    );
    const provided = b64urlDecode(sigB64);
    if (!timingSafeEqual(expected, provided)) return null;
    const payloadJson = new TextDecoder().decode(b64urlDecode(payloadB64));
    const data = JSON.parse(payloadJson) as Partial<SignedPayload>;
    if (!data || typeof data.exp !== 'number' || data.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    if (data.role !== 'super_admin' && data.role !== 'branch_admin') return null;
    if (typeof data.email !== 'string') return null;
    const branchId = typeof data.branchId === 'string' && data.branchId.length > 0 ? data.branchId : null;
    if (data.role === 'branch_admin' && !branchId) return null;
    return { email: data.email, role: data.role, branchId };
  } catch {
    return null;
  }
}

function loadAccounts(): AccountRecord[] {
  const out: AccountRecord[] = [];

  const superEmail = process.env.ADMIN_EMAIL?.trim();
  const superPwd = process.env.ADMIN_PASSWORD;
  if (superEmail && superPwd) {
    out.push({
      email: superEmail.toLowerCase(),
      password: superPwd,
      role: 'super_admin',
      branchId: null,
    });
  }

  const raw = process.env.BRANCH_ACCOUNTS;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Array<{
        email?: string;
        password?: string;
        branchId?: string;
        role?: Role;
      }>;
      if (Array.isArray(parsed)) {
        for (const acct of parsed) {
          if (!acct.email || !acct.password) continue;
          const role: Role = acct.role === 'super_admin' ? 'super_admin' : 'branch_admin';
          const branchId = role === 'super_admin' ? null : acct.branchId ?? null;
          if (role === 'branch_admin' && !branchId) continue;
          out.push({
            email: acct.email.trim().toLowerCase(),
            password: acct.password,
            role,
            branchId,
          });
        }
      }
    } catch {
      /* ignore malformed BRANCH_ACCOUNTS */
    }
  }

  return out;
}

export function authenticate(email: string, password: string): SessionPayload | null {
  const accounts = loadAccounts();
  const cleanEmail = email.trim().toLowerCase();
  // Walk every account in constant time-ish to avoid leaking which step failed
  let matched: AccountRecord | null = null;
  for (const acct of accounts) {
    const emailOk = timingSafeStringEqual(acct.email, cleanEmail);
    const pwdOk = timingSafeStringEqual(acct.password, password);
    if (emailOk && pwdOk) matched = acct;
  }
  if (!matched) return null;
  return { email: matched.email, role: matched.role, branchId: matched.branchId };
}

export const SESSION = {
  cookieName: SESSION_COOKIE,
  ttlSeconds: SESSION_TTL_SECONDS,
};
