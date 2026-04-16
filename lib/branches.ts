export interface Branch {
  id: string;
  name: string;
  city: string;
  country: 'SA' | 'AE' | 'PH';
  flag: string;
  color: string;
}

export const ALL_BRANCHES: Branch[] = [
  { id: 'b1000000-0000-0000-0000-000000000008', name: 'Philippines',                      city: 'Taguig',     country: 'PH', flag: '🇵🇭', color: '#00D4FF' },
  { id: 'b1000000-0000-0000-0000-000000000001', name: 'Abhur Mall, Jeddah',               city: 'Jeddah',     country: 'SA', flag: '🇸🇦', color: '#d10d41' },
  { id: 'b1000000-0000-0000-0000-000000000005', name: 'Prince Sultan Road, Jeddah',       city: 'Jeddah',     country: 'SA', flag: '🇸🇦', color: '#FFB800' },
  { id: 'b1000000-0000-0000-0000-000000000006', name: 'Al Musaidiyah District, Jeddah',   city: 'Jeddah',     country: 'SA', flag: '🇸🇦', color: '#22C55E' },
  { id: 'b1000000-0000-0000-0000-000000000007', name: 'Corniche Road, Jeddah',            city: 'Jeddah',     country: 'SA', flag: '🇸🇦', color: '#8B5CF6' },
  { id: 'b1000000-0000-0000-0000-000000000009', name: 'Prince Nayef Road, Abhur, Jeddah', city: 'Jeddah',     country: 'SA', flag: '🇸🇦', color: '#F472B6' },
  { id: 'b1000000-0000-0000-0000-000000000002', name: 'Al Hamra District, Riyadh',        city: 'Riyadh',     country: 'SA', flag: '🇸🇦', color: '#06B6D4' },
  { id: 'b1000000-0000-0000-0000-00000000000a', name: 'Al Nada District, Riyadh',         city: 'Riyadh',     country: 'SA', flag: '🇸🇦', color: '#F59E0B' },
  { id: 'b1000000-0000-0000-0000-000000000003', name: 'King Salman Road, Tabuk',          city: 'Tabuk',      country: 'SA', flag: '🇸🇦', color: '#10B981' },
  { id: 'b1000000-0000-0000-0000-000000000004', name: 'Abu Dhabi, UAE',                   city: 'Abu Dhabi',  country: 'AE', flag: '🇦🇪', color: '#A855F7' },
];

export const PH_BRANCH_ID = 'b1000000-0000-0000-0000-000000000008';

export function getBranch(branchId: string | null | undefined): Branch | undefined {
  if (!branchId) return undefined;
  return ALL_BRANCHES.find((b) => b.id === branchId);
}

export function getBranchName(branchId: string | null | undefined): string {
  return getBranch(branchId)?.name ?? 'Unknown branch';
}

export function getBranchFlag(branchId: string | null | undefined): string {
  return getBranch(branchId)?.flag ?? '🏢';
}

export function getBranchColor(branchId: string | null | undefined): string {
  return getBranch(branchId)?.color ?? '#94a3b8';
}

export const MIN_PEOPLE = 10;
