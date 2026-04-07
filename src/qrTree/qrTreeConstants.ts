/** Voxel size in world units (matches original WebGPU demo). */
export const BLOCK_SIZE = 0.0245;

/** Cap for instanced blocks (41×41 QR × ~24 layers worst case). */
export const MAX_BLOCKS = 1681 * 24;

export const BlockKind = {
  Dirt: 0,
  CherryBlossom: 1,
  Trunk: 2,
  Grass: 3,
  FallenPetals: 4,
  Branch: 5,
  /** Flat leaf chips on the platform (reference: scattered near trunk). */
  FloorLeaf: 6,
} as const;

export type BlockKind = (typeof BlockKind)[keyof typeof BlockKind];
