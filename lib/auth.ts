const SESSION_COOKIE = 'enter10_admin';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

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

export async function signSession(email: string, secret: string): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = JSON.stringify({ email, exp });
  const payloadB64 = b64urlEncode(new TextEncoder().encode(payload));
  const key = await hmacKey(secret);
  const sig = new Uint8Array(
    await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payloadB64)),
  );
  return `${payloadB64}.${b64urlEncode(sig)}`;
}

export async function verifySession(
  token: string | undefined | null,
  secret: string,
): Promise<{ email: string } | null> {
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
    const data = JSON.parse(payloadJson) as { email: string; exp: number };
    if (!data || typeof data.exp !== 'number' || data.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return { email: data.email };
  } catch {
    return null;
  }
}

export function credentialsMatch(email: string, password: string): boolean {
  const expectedEmail = process.env.ADMIN_EMAIL ?? '';
  const expectedPassword = process.env.ADMIN_PASSWORD ?? '';
  if (!expectedEmail || !expectedPassword) return false;

  const eA = new TextEncoder().encode(email.trim().toLowerCase());
  const eB = new TextEncoder().encode(expectedEmail.trim().toLowerCase());
  const pA = new TextEncoder().encode(password);
  const pB = new TextEncoder().encode(expectedPassword);

  const sameLengthEmail = eA.length === eB.length;
  const sameLengthPwd = pA.length === pB.length;
  if (!sameLengthEmail || !sameLengthPwd) return false;

  let diffE = 0;
  for (let i = 0; i < eA.length; i++) diffE |= eA[i] ^ eB[i];
  let diffP = 0;
  for (let i = 0; i < pA.length; i++) diffP |= pA[i] ^ pB[i];
  return diffE === 0 && diffP === 0;
}

export const SESSION = {
  cookieName: SESSION_COOKIE,
  ttlSeconds: SESSION_TTL_SECONDS,
};
