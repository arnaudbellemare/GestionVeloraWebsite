/**
 * Port of `buildMontrealMaps()` RGB logic from `public/static/qr-montreal-city.html`
 * (île voxel palette: mountain green, brick/cream, streets, waterfront).
 */

function hash01(i: number, j: number, seed: number): number {
  const x = Math.sin(i * 12.9898 + j * 78.233 + seed) * 43758.5453;
  return x - Math.floor(x);
}

function clamp01(t: number): number {
  return Math.min(1, Math.max(0, t));
}

function rgbToHex(r: number, g: number, b: number): string {
  const ri = Math.round(clamp01(r) * 255);
  const gi = Math.round(clamp01(g) * 255);
  const bi = Math.round(clamp01(b) * 255);
  return `#${ri.toString(16).padStart(2, "0")}${gi.toString(16).padStart(2, "0")}${bi.toString(16).padStart(2, "0")}`;
}

/** Relative luminance 0–1; used to keep “dark” QR modules dark enough for scanners. */
function luminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

/** Pull overly light building/water colors down so modules stay readable vs white. */
function ensureQrContrast(r: number, g: number, b: number): [number, number, number] {
  const lum = luminance(r, g, b);
  const maxLum = 0.4;
  if (lum <= maxLum) return [r, g, b];
  const s = (maxLum / lum) * 0.92;
  return [r * s, g * s, b * s];
}

/**
 * @param col - matrix column (0..n-1)
 * @param row - matrix row (0..n-1)
 * @param n - grid size (matches QR module count)
 */
export function montrealCityHex(col: number, row: number, n: number): string {
  const cx = (n - 1) / 2;
  const cy = (n - 1) / 2;
  const i = col;
  const j = row;
  const bx = i - cx;
  const bz = j - cy;
  const nu = hash01(i, j, 41);

  const stLaurent = Math.abs(bx + 3.4) < 1.2;
  const peelAxis = Math.abs(bx - 2.4) < 1.05;
  const sherbrooke = Math.abs(bz + 2.1) < 0.65;
  const reneLevesque = Math.abs(bz - 3.2) < 0.65;
  const minorBlock = (i + 2) % 5 === 0 || (j + 1) % 5 === 0;
  const isArtery = stLaurent || peelAxis || sherbrooke || reneLevesque;
  const isStreet = isArtery || minorBlock;

  const mx = (bx + 2.2) / 6.4;
  const mz = (bz + 6.4) / 8.2;
  const dMount = Math.hypot(mx, mz);
  let mountain = clamp01(1.15 - dMount);
  mountain *= bz < 2 ? 1 : 0.25 + 0.75 * clamp01(1 - (bz - 2) / 5);

  const southness = clamp01((bz - 5.5) / 4);
  const waterfront = southness;

  const cbdDx = bx - 5.2;
  const cbdDz = bz - 0.9;
  const dCbd = Math.hypot(cbdDx / 5.4, cbdDz / 4.6);
  const cbd = Math.exp(-dCbd * dCbd * 1.35);

  const plateau = Math.exp(-((bx - 6.8) ** 2 / 20 + (bz + 3.2) ** 2 / 24));

  let r = 0.44;
  let g = 0.46;
  let b = 0.5;

  if (mountain > 0.12) {
    r = 0.16 + nu * 0.1;
    g = 0.34 + nu * 0.14;
    b = 0.22 + nu * 0.08;
  } else if (waterfront > 0.45 && bz > 4) {
    r = 0.56 + nu * 0.06;
    g = 0.48 + nu * 0.05;
    b = 0.42 + nu * 0.06;
  } else if (isStreet) {
    r = 0.26;
    g = 0.28;
    b = 0.33;
    if (stLaurent) {
      r = 0.3;
      g = 0.32;
      b = 0.37;
    }
  } else {
    if (cbd > 0.2) {
      /* Neutral towers (3D used a blue tint; here we keep concrete / glass gray) */
      r = 0.34 + nu * 0.1;
      g = 0.38 + nu * 0.12;
      b = 0.4 + nu * 0.08;
    } else if (plateau > 0.22) {
      r = 0.52 + nu * 0.1;
      g = 0.35 + nu * 0.08;
      b = 0.3 + nu * 0.06;
    } else {
      r = 0.47 + nu * 0.1;
      g = 0.39 + nu * 0.08;
      b = 0.36 + nu * 0.06;
    }
  }

  if (bz > 9) {
    r = r * 0.65 + 0.12;
    g = g * 0.72 + 0.16;
    b = b * 0.85 + 0.22;
  }

  const [rr, gg, bb] = ensureQrContrast(r, g, b);
  return rgbToHex(rr, gg, bb);
}
