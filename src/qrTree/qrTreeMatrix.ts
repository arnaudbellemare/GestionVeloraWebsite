import { create } from "qrcode";

/** ISO 18004: at least 4 modules of light margin around the symbol (quiet zone). */
const QUIET_ZONE_MODULES = 4;

function padQuietZone(grid: boolean[][], margin: number): boolean[][] {
  const n = grid.length;
  const m = n + 2 * margin;
  const out: boolean[][] = [];
  for (let r = 0; r < m; r++) {
    const row: boolean[] = [];
    for (let c = 0; c < m; c++) {
      if (r < margin || r >= margin + n || c < margin || c >= margin + n) {
        row.push(false);
      } else {
        row.push(grid[r - margin]![c - margin]!);
      }
    }
    out.push(row);
  }
  return out;
}

/**
 * QR modules as `grid[row][col]` booleans (true = dark module).
 * Pads with a white quiet zone so the code can scan when it fills the viewport.
 */
export function qrTextToBooleanGrid(text: string): boolean[][] {
  /** Match reference demo: high error correction (`qrcode-generator` type `'H'`). */
  const qr = create(text, { errorCorrectionLevel: "H" });
  const n = qr.modules.size;
  const grid: boolean[][] = [];
  for (let r = 0; r < n; r++) {
    const row: boolean[] = [];
    for (let c = 0; c < n; c++) {
      row.push(qr.modules.get(r, c) !== 0);
    }
    grid.push(row);
  }
  return padQuietZone(grid, QUIET_ZONE_MODULES);
}
