export function jalaliToGregorian(
  jy: number,
  jm: number,
  jd: number
): { gy: number; gm: number; gd: number } {
  const epBase = jy - (jy >= 0 ? 474 : 473);
  const epYear = 474 + (epBase % 2820);
  const mdays = jm <= 7 ? (jm - 1) * 31 : (jm - 1) * 30 + 6;
  const jdn =
    jd +
    mdays +
    Math.floor((epYear * 682 - 110) / 2816) +
    (epYear - 1) * 365 +
    Math.floor(epBase / 2820) * 1029983 +
    (1948320 - 1);

  let j = jdn + 68569;
  const n = Math.floor((4 * j) / 146097);
  j = j - Math.floor((146097 * n + 3) / 4);
  const i = Math.floor((4000 * (j + 1)) / 1461001);
  j = j - Math.floor((1461 * i) / 4) + 31;
  const k = Math.floor((80 * j) / 2447);
  const gd = j - Math.floor((2447 * k) / 80);
  const j2 = Math.floor(k / 11);
  const gm = k + 2 - 12 * j2;
  const gy = 100 * (n - 49) + i + j2;
  return { gy, gm, gd };
}

export function ageFromJalali(dateStr: string): number {
  const [jy, jm, jd] = dateStr.split('-').map(Number);
  const g = jalaliToGregorian(jy, jm, jd);
  const birth = new Date(g.gy, g.gm - 1, g.gd);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const birthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (now < birthday) age--;
  return age;
}

export interface CustomThemePreset {
  id: string;
  labelFa: string;
  labelEn: string;
  accent: string;
  accentHover: string;
  accentSecondary: string;
  bg: string;
  surface: string;
  elevated: string;
}

export const CUSTOM_THEME_PRESETS: CustomThemePreset[] = [
  {
    id: 'volcanic',
    labelFa: 'آتشفشانی',
    labelEn: 'Volcanic Ember',
    accent: '#ff6b00',
    accentHover: '#ff8229',
    accentSecondary: '#ffb347',
    bg: '#0c0807',
    surface: '#160f0d',
    elevated: '#211714',
  },
  {
    id: 'cobalt',
    labelFa: 'کبالت شبانه',
    labelEn: 'Midnight Cobalt',
    accent: '#2563eb',
    accentHover: '#3b82f6',
    accentSecondary: '#60a5fa',
    bg: '#060a14',
    surface: '#0c1324',
    elevated: '#131d36',
  },
  {
    id: 'emerald',
    labelFa: 'زمرد کد',
    labelEn: 'Emerald Studio',
    accent: '#059669',
    accentHover: '#10b981',
    accentSecondary: '#34d399',
    bg: '#050d0a',
    surface: '#0b1713',
    elevated: '#11231d',
  },
  {
    id: 'crimson',
    labelFa: 'یاقوت تیره',
    labelEn: 'Crimson Forge',
    accent: '#e11d48',
    accentHover: '#f43f5e',
    accentSecondary: '#fb7185',
    bg: '#0e070a',
    surface: '#190e13',
    elevated: '#25151c',
  },
];

export function hexToRgbTuple(hex: string): string {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return '255, 107, 0';
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  if ([r, g, b].some(Number.isNaN)) return '255, 107, 0';
  return `${r}, ${g}, ${b}`;
}
