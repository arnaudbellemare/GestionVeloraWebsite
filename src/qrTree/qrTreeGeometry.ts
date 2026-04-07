import { BLOCK_SIZE, MAX_BLOCKS } from "./qrTreeConstants";
import type { BlockKind } from "./qrTreeConstants";

function hash01(x: number, y: number, z = 0): number {
  const r = Math.sin(x * 127.1 + y * 311.7 + z * 43.7) * 43758.5453;
  return r - Math.floor(r);
}

/**
 * Voxel + cherry canopy instances derived from a QR boolean grid (port of original demo `E`).
 */
export function buildVoxelInstances(grid: boolean[][]): {
  instances: Float32Array;
  instanceCount: number;
  gridSize: number;
} {
  const t = grid.length;
  const half = t / 2;
  const canopyR = t * 0.46;
  const blossomBase = 12 * BLOCK_SIZE;

  const positions: number[] = [];

  const push = (col: number, row: number, baseY: number, kind: BlockKind) => {
    if (positions.length / 4 >= MAX_BLOCKS) return;
    positions.push(col, row, baseY, kind);
  };

  for (let row = 0; row < t; row++) {
    for (let col = 0; col < t; col++) {
      const on = grid[row]![col]!;
      const dx = col - half;
      const dz = row - half;
      const dist = Math.sqrt(dx * dx + dz * dz);
      push(col, row, 0, on ? (dist < 2.5 ? 2 : dist >= canopyR ? 3 : 4) : 0);
    }
  }

  for (let row = 0; row < t; row++) {
    for (let col = 0; col < t; col++) {
      if (!grid[row]![col]!) continue;
      const dx = col - half;
      const dz = row - half;
      if (Math.sqrt(dx * dx + dz * dz) >= 2.5) continue;
      for (let layer = 1; layer < 12; layer++) {
        push(col, row, layer * BLOCK_SIZE, 2);
      }
    }
  }

  for (let row = 0; row < t; row++) {
    for (let col = 0; col < t; col++) {
      if (!grid[row]![col]!) continue;
      const dx = col - half;
      const dz = row - half;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist >= canopyR) continue;

      const canopy = 1 - dist / canopyR;
      const stackCount = Math.max(
        3,
        Math.round(12 * (0.25 + 0.75 * canopy * canopy))
      );
      for (let k = 0; k < stackCount; k++) {
        const by = blossomBase + k * BLOCK_SIZE;
        const rOff = Math.floor(canopy * 3) * BLOCK_SIZE;
        push(col, row, by + rOff, 1);
      }
      const extra = Math.floor(hash01(col, row, 500) * 4);
      for (let k = 0; k < extra; k++) {
        const by = stackCount + k;
        const rOff = Math.floor(canopy * 3) * BLOCK_SIZE;
        push(col, row, blossomBase + by * BLOCK_SIZE + rOff, 1);
      }
    }
  }

  const innerR = 2.5 * 0.6;
  for (let row = 0; row < t; row++) {
    for (let col = 0; col < t; col++) {
      const dx = col - half;
      const dz = row - half;
      if (Math.sqrt(dx * dx + dz * dz) >= innerR) continue;
      for (let k = 0; k < 4; k++) {
        push(col, row, blossomBase + k * BLOCK_SIZE, 2);
      }
    }
  }

  /**
   * Ornamental grass along the platform edge (reference demo: blade clumps on the rim).
   * Uses Branch kind + fractional col/row so blades sit between QR cells; hidden when progress→1.
   */
  const addGrassCluster = (col: number, row: number, seed: number) => {
    if (hash01(seed, 11) > 0.38) return;
    const jitter = 0.42;
    const ox = (hash01(seed, 12) - 0.5) * 2 * jitter;
    const oy = (hash01(seed, 13) - 0.5) * 2 * jitter;
    const fc = col + 0.5 + ox;
    const fr = row + 0.5 + oy;
    const layers = 2 + Math.floor(hash01(seed, 14) * 4);
    for (let l = 0; l < layers; l++) {
      push(fc, fr, l * BLOCK_SIZE, 5 as BlockKind);
    }
  };

  for (let c = 0; c < t; c++) {
    addGrassCluster(c, 0, c * 17 + 3);
    addGrassCluster(c, t - 1, c * 19 + 9001);
  }
  for (let r = 1; r < t - 1; r++) {
    addGrassCluster(0, r, r * 23 + 5);
    addGrassCluster(t - 1, r, r * 29 + 7003);
  }
  // Softer inner ring so the “floor” feels planted, not only the outer rim
  if (t > 6) {
    for (let c = 1; c < t - 1; c++) {
      if (hash01(c, 41) > 0.72) addGrassCluster(c, 1, c * 31 + 42);
      if (hash01(c, 43) > 0.72) addGrassCluster(c, t - 2, c * 37 + 44);
    }
    for (let r = 2; r < t - 2; r++) {
      if (hash01(r, 45) > 0.72) addGrassCluster(1, r, r * 47 + 46);
      if (hash01(r, 47) > 0.72) addGrassCluster(t - 2, r, r * 53 + 48);
    }
  }

  /** Fallen leaf chips on the tiled floor (reference: small green leaves near the trunk). */
  const leafBudget = Math.min(72, Math.floor(t * 2.2));
  for (let i = 0; i < leafBudget; i++) {
    const a = hash01(i, 61) * Math.PI * 2;
    const rad = 2.8 + hash01(i, 62) * (canopyR * 0.92 - 2.8);
    const col = half + Math.cos(a) * rad + (hash01(i, 63) - 0.5) * 0.35;
    const row = half + Math.sin(a) * rad + (hash01(i, 64) - 0.5) * 0.35;
    if (col < 1 || col > t - 2 || row < 1 || row > t - 2) continue;
    if (hash01(i, 65) > 0.42) continue;
    push(col, row, BLOCK_SIZE * 0.22, 6 as BlockKind);
  }

  const instanceCount = Math.min(positions.length / 4, MAX_BLOCKS);
  const instances = new Float32Array(instanceCount * 4);
  for (let i = 0; i < instanceCount; i++) {
    instances[i * 4] = positions[i * 4]!;
    instances[i * 4 + 1] = positions[i * 4 + 1]!;
    instances[i * 4 + 2] = positions[i * 4 + 2]!;
    instances[i * 4 + 3] = positions[i * 4 + 3]!;
  }

  return { instances, instanceCount, gridSize: t };
}
