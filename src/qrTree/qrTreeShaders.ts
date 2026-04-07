/**
 * WGSL: single `progress` dial (0 = 3D tree, 1 = flat scannable QR).
 *
 * 1) Camera — isometric → top-down via mixed euler-style angles (see vs_main).
 * 2) Visibility — stacked / trunk blocks fade out so modules aren’t occluded.
 * 3) Grid — mix 3D heights + sway into a flat QR plane as progress → 1.
 */
export const QR_TREE_SHADER = /* wgsl */ `
struct Uniforms {
  /** JavaScript: projection * view (Three.js lookAt + WebGPU perspective). */
  viewProj: mat4x4<f32>,
  gridSize: f32,
  time: f32,
  season: f32,
  progress: f32,
}

@group(0) @binding(0) var<uniform> u: Uniforms;
@group(0) @binding(1) var<storage, read> instances: array<vec4<f32>>;

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) worldPos: vec3<f32>,
  @location(1) normal: vec3<f32>,
  @location(2) kind: f32,
  @location(3) seasonTint: f32,
  @location(4) progress: f32,
  @location(5) discardMe: f32,
  @location(6) cellCr: vec2<f32>,
  @location(7) baseInst: f32,
}

const CUBE_POS = array<vec3<f32>, 8>(
  vec3<f32>(-0.5, -0.5, -0.5),
  vec3<f32>( 0.5, -0.5, -0.5),
  vec3<f32>( 0.5, -0.5,  0.5),
  vec3<f32>(-0.5, -0.5,  0.5),
  vec3<f32>(-0.5,  0.5, -0.5),
  vec3<f32>( 0.5,  0.5, -0.5),
  vec3<f32>( 0.5,  0.5,  0.5),
  vec3<f32>(-0.5,  0.5,  0.5),
);

const CUBE_IDX = array<u32, 36>(
  0u, 2u, 1u, 0u, 3u, 2u,
  4u, 5u, 6u, 4u, 6u, 7u,
  0u, 1u, 5u, 0u, 5u, 4u,
  3u, 7u, 6u, 3u, 6u, 2u,
  0u, 4u, 7u, 0u, 7u, 3u,
  1u, 2u, 6u, 1u, 6u, 5u,
);

const BLOCK: f32 = 0.0245;

fn face_normal_from_vid(vid: u32) -> vec3<f32> {
  let f = vid / 6u;
  switch (f) {
    case 0u: { return vec3<f32>(0.0, -1.0, 0.0); }
    case 1u: { return vec3<f32>(0.0, 1.0, 0.0); }
    case 2u: { return vec3<f32>(0.0, 0.0, -1.0); }
    case 3u: { return vec3<f32>(0.0, 0.0, 1.0); }
    case 4u: { return vec3<f32>(-1.0, 0.0, 0.0); }
    default: { return vec3<f32>(1.0, 0.0, 0.0); }
  }
}

/** Reference palette: 0=Spring, 1=Summer, 2=Autumn, 3=Winter (same band tests as the demo). */
fn season_palette(s: f32) -> vec3<f32> {
  if (s < 0.5) {
    return vec3<f32>(0.88, 0.48, 0.55);
  }
  if (s < 1.5) {
    return vec3<f32>(0.18, 0.42, 0.10);
  }
  if (s < 2.5) {
    return vec3<f32>(0.82, 0.35, 0.12);
  }
  return vec3<f32>(0.42, 0.36, 0.30);
}

fn kind_color(kind: u32, season: f32) -> vec3<f32> {
  var c: vec3<f32>;
  switch (kind) {
    case 0u: { return vec3<f32>(0.91, 0.92, 0.93); } // neutral tile; checker + rim in fs_main
    case 1u: { c = vec3<f32>(0.95, 0.65, 0.78); }
    case 2u: { c = vec3<f32>(0.28, 0.16, 0.10); }
    case 3u: { c = vec3<f32>(0.35, 0.55, 0.28); }
    case 4u: { c = vec3<f32>(0.88, 0.72, 0.78); }
    case 5u: { c = vec3<f32>(0.34, 0.72, 0.32); } // rim grass — saturated like reference
    case 6u: { c = vec3<f32>(0.42, 0.78, 0.38); } // fallen leaf chips
    default: { c = vec3<f32>(0.40, 0.28, 0.18); }
  }
  let sp = season_palette(season);
  return mix(c, sp, 0.58);
}

@vertex
fn vs_main(
  @builtin(vertex_index) vid: u32,
  @builtin(instance_index) iid: u32,
) -> VertexOutput {
  var out: VertexOutput;
  let p = clamp(u.progress, 0.0, 1.0);
  let inst = instances[iid];
  let col = inst.x;
  let row = inst.y;
  let baseY = inst.z;
  let kind = inst.w;
  let k = u32(kind + 0.5);
  let half = u.gridSize * 0.5;
  let wx = (col - half) * BLOCK;
  let wz = (row - half) * BLOCK;
  let wy = baseY + BLOCK * 0.5;
  let vi = vid % 36u;
  var corner = CUBE_POS[CUBE_IDX[vi]];
  if (k == 5u) {
    corner = vec3<f32>(corner.x * 0.11, corner.y * 2.4 + 0.1, corner.z * 0.11);
  } else if (k == 6u) {
    corner = vec3<f32>(corner.x * 0.88, corner.y * 0.14 - 0.44, corner.z * 0.88);
  }
  let world3d = vec3<f32>(wx, wy, wz) + corner * BLOCK;

  let flatCorner = CUBE_POS[CUBE_IDX[vi]];
  let flatY = BLOCK * 0.5 + flatCorner.y * BLOCK * 0.14;
  let worldFlat = vec3<f32>(wx + flatCorner.x * BLOCK, flatY, wz + flatCorner.z * BLOCK);
  var world = mix(world3d, worldFlat, p);

  // Only collapse the trunk stack for scanning. Cherry / canopy (kind 1) must stay visible when
  // flat or you lose all pink — “from above” should still show the same palette as 3D.
  var vis = 1.0;
  if (k == 2u && baseY > 0.01) {
    vis = smoothstep(0.1, 0.5, 1.0 - p);
  }
  if (k == 5u) {
    vis *= smoothstep(0.0, 0.48, 1.0 - p);
  }
  if (k == 6u) {
    vis *= smoothstep(0.0, 0.52, 1.0 - p);
  }
  world = world * vis;

  if (vis < 0.0005 && (baseY > 0.01 || k == 5u || k == 6u)) {
    out.position = vec4<f32>(0.0, 0.0, 2.0, 1.0);
    out.worldPos = world;
    out.normal = vec3<f32>(0.0, 1.0, 0.0);
    out.kind = kind;
    out.seasonTint = u.season;
    out.progress = p;
    out.discardMe = 1.0;
    out.cellCr = vec2<f32>(col, row);
    out.baseInst = baseY;
    return out;
  }

  out.position = u.viewProj * vec4<f32>(world, 1.0);
  out.worldPos = world;
  out.normal = face_normal_from_vid(vi);
  out.kind = kind;
  out.seasonTint = u.season;
  out.progress = p;
  out.discardMe = 0.0;
  out.cellCr = vec2<f32>(col, row);
  out.baseInst = baseY;
  return out;
}

fn aces_tonemap(x: vec3<f32>) -> vec3<f32> {
  let a = 2.51;
  let b = 0.03;
  let c = 2.43;
  let d = 0.59;
  let e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), vec3<f32>(0.0), vec3<f32>(1.0));
}

@fragment
fn fs_main(in: VertexOutput) -> @location(0) vec4<f32> {
  if (in.discardMe > 0.5) {
    discard;
  }
  let k = u32(in.kind + 0.5);
  var base = kind_color(k, in.seasonTint);
  var n = normalize(in.normal);
  if (k == 5u) {
    n = normalize(vec3<f32>(-0.42, 0.88, 0.22));
  } else if (k == 6u) {
    n = vec3<f32>(0.0, 1.0, 0.0);
  }
  let p = clamp(in.progress, 0.0, 1.0);
  // Soft key from upper-left (matches reference screenshots).
  let lightDir = normalize(vec3<f32>(-0.42, 0.86, 0.28));
  let ndl = max(dot(n, lightDir), 0.0);
  let amb = 0.42;
  let diff = 0.58 * ndl;
  var col = base * (amb + diff);
  // Checkerboard floor tiles (light modules, ground layer only).
  if (k == 0u && in.baseInst < 0.002) {
    let ix = i32(floor(in.cellCr.x + 0.001));
    let iy = i32(floor(in.cellCr.y + 0.001));
    let parity = f32((ix + iy) % 2);
    let tileHi = vec3<f32>(0.94, 0.95, 0.96);
    let tileLo = vec3<f32>(0.86, 0.88, 0.9);
    base = mix(tileHi, tileLo, parity);
    col = base * (amb + diff);
    let gs = u.gridSize;
    let ed = min(min(in.cellCr.x, in.cellCr.y), min(gs - 1.0 - in.cellCr.x, gs - 1.0 - in.cellCr.y));
    let lip = 1.0 - smoothstep(0.0, 1.15, ed);
    col = mix(col, col * vec3<f32>(0.78, 0.82, 0.86), lip * 0.55 * (1.0 - p));
  }
  // QR scan contrast: only data voxels; ornaments 5–6 excluded.
  let isDark = f32(k != 0u && k != 5u && k != 6u);
  let qrData = f32(k != 5u && k != 6u);
  let qrBoost = p * p;
  let dirt = vec3<f32>(0.82, 0.76, 0.66);
  col = mix(col, dirt, qrBoost * (1.0 - isDark) * qrData);
  col = mix(col, vec3<f32>(0.05, 0.05, 0.05), qrBoost * isDark);

  let bg = vec3<f32>(0.94, 0.95, 0.96);
  let fog = clamp(length(in.worldPos) * 0.12, 0.0, 0.22);
  var rgb = mix(col, bg, fog * (1.0 - in.progress));
  rgb = aces_tonemap(rgb);
  return vec4<f32>(rgb, 1.0);
}
`;

/** Uniform: mat4 + vec3 + pad + 4 floats; pad to 256 for WebGPU min uniform size. */
export const QR_TREE_UNIFORM_BYTE_LENGTH = 256;
