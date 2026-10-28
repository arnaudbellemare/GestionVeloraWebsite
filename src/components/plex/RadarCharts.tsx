/**
 * Dependency-free SVG charts for the Plex Radar dashboard. Each one takes
 * already-computed numbers and draws them; no fetching, no formatting rules.
 * Colours come from the --rd-* tokens declared in plex-radar.css.
 */

const TONE: Record<string, string> = {
  green: "var(--rd-green)",
  amber: "var(--rd-amber)",
  red: "var(--rd-red)",
  blue: "var(--rd-blue)",
  purple: "var(--rd-purple)",
  muted: "var(--rd-text-3)",
  top: "var(--rd-top)",
  above: "var(--rd-green)",
  inline: "var(--rd-blue)",
  below: "var(--rd-amber)",
  priority: "var(--rd-top)",
  analyze: "var(--rd-green)",
  watch: "var(--rd-amber)",
  low: "var(--rd-red)",
};

const tone = (key?: string) => TONE[key ?? ""] ?? TONE.muted;

// ─── Bar chart with an average line ──────────────────────────────────────────

export type Bar = { label: string; value: number; count?: number };

export function BarChart({ bars, average, averageLabel, format, title }: {
  bars: Bar[];
  average: number | null;
  averageLabel: string;
  format: (value: number) => string;
  title: string;
}) {
  const W = 640;
  const H = 230;
  const left = 54;
  const right = 14;
  const top = 18;
  const bottom = 34;
  const innerW = W - left - right;
  const innerH = H - top - bottom;
  const max = Math.max(...bars.map((bar) => bar.value), average ?? 0, 0.0001) * 1.12;
  const y = (value: number) => top + innerH - (value / max) * innerH;
  const slot = innerW / Math.max(1, bars.length);
  const barW = Math.min(52, slot * 0.62);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((fraction) => fraction * max);
  return (
    <svg className="radar-svg radar-svg-bars" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title}>
      {ticks.map((tick) => <g key={tick}>
        <line x1={left} x2={W - right} y1={y(tick)} y2={y(tick)} className="radar-svg-grid" />
        <text x={left - 8} y={y(tick) + 3} className="radar-svg-axis" textAnchor="end">{format(tick)}</text>
      </g>)}
      {bars.map((bar, index) => {
        const x = left + slot * index + (slot - barW) / 2;
        const h = Math.max(2, top + innerH - y(bar.value));
        return <g key={bar.label}>
          <rect x={x} y={y(bar.value)} width={barW} height={h} rx={4} className="radar-svg-bar" />
          <text x={x + barW / 2} y={y(bar.value) - 5} className="radar-svg-value" textAnchor="middle">{format(bar.value)}</text>
          <text x={x + barW / 2} y={H - bottom + (index % 2 === 0 ? 14 : 27)} className="radar-svg-label" textAnchor="middle">{bar.label.length > 16 ? `${bar.label.slice(0, 15)}…` : bar.label}{bar.count !== undefined && <tspan className="radar-svg-axis"> · {bar.count}</tspan>}</text>
          <title>{bar.label} · {format(bar.value)}{bar.count !== undefined ? ` · n=${bar.count}` : ""}</title>
        </g>;
      })}
      {average !== null && <g>
        <line x1={left} x2={W - right} y1={y(average)} y2={y(average)} className="radar-svg-average" />
        <rect x={W - right - 78} y={y(average) - 19} width={78} height={15} rx={3} className="radar-svg-chip" />
        <text x={W - right - 39} y={y(average) - 8} className="radar-svg-average-label" textAnchor="middle">{averageLabel} {format(average)}</text>
      </g>}
    </svg>
  );
}

// ─── Gauge ───────────────────────────────────────────────────────────────────

export type GaugeBand = { from: number; to: number; tone: string; label: string };

export function Gauge({ value, bands, caption, title }: { value: number; bands: GaugeBand[]; caption: string; title: string }) {
  const cx = 100;
  const cy = 98;
  const outer = 84;
  const inner = 68;
  const polar = (v: number, r: number) => {
    const angle = Math.PI - (Math.max(0, Math.min(100, v)) / 100) * Math.PI;
    return [cx + r * Math.cos(angle), cy - r * Math.sin(angle)] as const;
  };
  const band = (from: number, to: number) => {
    const [ax, ay] = polar(from, outer);
    const [bx, by] = polar(to, outer);
    const [cxI, cyI] = polar(to, inner);
    const [dx, dy] = polar(from, inner);
    return `M ${ax} ${ay} A ${outer} ${outer} 0 0 1 ${bx} ${by} L ${cxI} ${cyI} A ${inner} ${inner} 0 0 0 ${dx} ${dy} Z`;
  };
  const [nx, ny] = polar(value, inner - 6);
  const active = bands.find((item) => value >= item.from && value < item.to) ?? bands[bands.length - 1];
  return (
    <figure className="radar-gauge">
      <svg viewBox="-14 -12 228 130" role="img" aria-label={`${title}: ${value}`}>
        {bands.map((item) => <path key={item.label} d={band(item.from + (item.from > 0 ? 0.6 : 0), item.to - (item.to < 100 ? 0.6 : 0))} fill={tone(item.tone)} opacity={item === active ? 1 : 0.32} />)}
        {Array.from({ length: 11 }, (_, index) => index * 10).map((tick) => {
          const [x1, y1] = polar(tick, inner - 4);
          const [x2, y2] = polar(tick, inner - (tick % 50 === 0 ? 12 : 8));
          return <line key={tick} x1={x1} y1={y1} x2={x2} y2={y2} className="radar-svg-tick" />;
        })}
        {[0, 50, 100].map((tick) => {
          const [x, y] = polar(tick, outer + 9);
          return <text key={tick} x={x} y={y + (tick === 50 ? 0 : 4)} className="radar-svg-axis" textAnchor={tick === 0 ? "end" : tick === 100 ? "start" : "middle"}>{tick}</text>;
        })}
        <line x1={cx} y1={cy} x2={nx} y2={ny} className="radar-gauge-needle" />
        <circle cx={cx} cy={cy} r={5} className="radar-gauge-hub" />
      </svg>
      <figcaption><strong style={{ color: tone(active?.tone) }}>{value}</strong><small>{caption}</small></figcaption>
    </figure>
  );
}

// ─── Waffle ──────────────────────────────────────────────────────────────────

export type WaffleSlice = { key: string; label: string; count: number; tone: string };

export function Waffle({ slices, title }: { slices: WaffleSlice[]; title: string }) {
  const total = slices.reduce((sum, slice) => sum + slice.count, 0);
  // Largest-remainder rounding so the cells always sum to exactly 100.
  const raw = slices.map((slice) => total ? (slice.count / total) * 100 : 0);
  const cells = raw.map(Math.floor);
  let remaining = 100 - cells.reduce((sum, cell) => sum + cell, 0);
  const order = raw.map((value, index) => ({ index, fraction: value - Math.floor(value) })).sort((a, b) => b.fraction - a.fraction);
  for (const { index } of order) {
    if (remaining <= 0) break;
    if (raw[index] > 0) { cells[index] += 1; remaining -= 1; }
  }
  const grid = slices.flatMap((slice, index) => Array.from({ length: cells[index] }, () => slice));
  while (grid.length < 100) grid.push({ key: "empty", label: "", count: 0, tone: "muted" });
  return (
    <div className="radar-waffle" role="img" aria-label={title}>
      <div className="radar-waffle-grid" aria-hidden="true">
        {grid.slice(0, 100).map((slice, index) => <i key={index} style={{ background: slice.key === "empty" ? "var(--rd-panel-3)" : tone(slice.tone) }} />)}
      </div>
      <ul className="radar-waffle-legend">
        {slices.map((slice, index) => <li key={slice.key}><i style={{ background: tone(slice.tone) }} aria-hidden="true" /><span>{slice.label}</span><b>{cells[index]}%</b></li>)}
      </ul>
    </div>
  );
}

// ─── Treemap (squarified) ────────────────────────────────────────────────────

export type TreeItem = { key: string; label: string; value: number };
type Rect = { x: number; y: number; w: number; h: number; item: TreeItem };

function worstRatio(row: number[], side: number) {
  const sum = row.reduce((total, value) => total + value, 0);
  if (sum === 0) return Infinity;
  const max = Math.max(...row);
  const min = Math.min(...row);
  return Math.max((side * side * max) / (sum * sum), (sum * sum) / (side * side * min));
}

function squarify(items: TreeItem[], x: number, y: number, w: number, h: number): Rect[] {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  if (total <= 0 || items.length === 0) return [];
  const scale = (w * h) / total;
  const areas = items.map((item) => item.value * scale);
  const rects: Rect[] = [];
  let index = 0;
  let cx = x;
  let cy = y;
  let cw = w;
  let ch = h;
  while (index < items.length) {
    const side = Math.min(cw, ch);
    const row: number[] = [areas[index]];
    let next = index + 1;
    while (next < items.length && worstRatio([...row, areas[next]], side) <= worstRatio(row, side)) {
      row.push(areas[next]);
      next += 1;
    }
    const rowArea = row.reduce((sum, value) => sum + value, 0);
    if (cw >= ch) {
      // Vertical strip on the left.
      const stripW = rowArea / ch;
      let offset = cy;
      row.forEach((area, position) => {
        const height = area / stripW;
        rects.push({ x: cx, y: offset, w: stripW, h: height, item: items[index + position] });
        offset += height;
      });
      cx += stripW;
      cw -= stripW;
    } else {
      const stripH = rowArea / cw;
      let offset = cx;
      row.forEach((area, position) => {
        const width = area / stripH;
        rects.push({ x: offset, y: cy, w: width, h: stripH, item: items[index + position] });
        offset += width;
      });
      cy += stripH;
      ch -= stripH;
    }
    index = next;
  }
  return rects;
}

export function Treemap({ items, title, formatShare }: { items: TreeItem[]; title: string; formatShare: (share: number) => string }) {
  const W = 420;
  const H = 240;
  const gap = 4;
  const sorted = [...items].filter((item) => item.value > 0).sort((a, b) => b.value - a.value);
  const total = sorted.reduce((sum, item) => sum + item.value, 0);
  const rects = squarify(sorted, 0, 0, W, H);
  return (
    <svg className="radar-svg radar-svg-treemap" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title}>
      {rects.map((rect, index) => {
        const w = Math.max(0, rect.w - gap);
        const h = Math.max(0, rect.h - gap);
        const share = total ? rect.item.value / total : 0;
        const opacity = 0.92 - (index / Math.max(1, rects.length - 1)) * 0.55;
        return <g key={rect.item.key} transform={`translate(${rect.x + gap / 2} ${rect.y + gap / 2})`}>
          <rect width={w} height={h} rx={8} fill="var(--rd-blue)" opacity={opacity} />
          {w > 56 && h > 34 && <text x={12} y={22} className="radar-svg-tile-label">{rect.item.label}</text>}
          {w > 56 && h > 52 && <text x={12} y={40} className="radar-svg-tile-value">{formatShare(share)}</text>}
          <title>{rect.item.label} · {formatShare(share)} · {rect.item.value}</title>
        </g>;
      })}
    </svg>
  );
}

// ─── Radar (spider) chart ────────────────────────────────────────────────────

export type RadarAxis = { label: string; value: number };

export function SpiderChart({ axes, baseline, title, seriesLabel, baselineLabel, note }: {
  axes: RadarAxis[];
  baseline: number;
  title: string;
  seriesLabel: string;
  baselineLabel: string;
  note?: string;
}) {
  const cx = 170;
  const cy = 108;
  const R = 72;
  const count = axes.length;
  const at = (index: number, r: number) => {
    const angle = -Math.PI / 2 + (index / count) * Math.PI * 2;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const;
  };
  const point = (index: number, value: number) => at(index, (Math.max(0, Math.min(100, value)) / 100) * R);
  const ring = (value: number) => axes.map((_, index) => point(index, value).join(",")).join(" ");
  return (
    <figure className="radar-spider">
      <svg viewBox="0 0 340 216" role="img" aria-label={title}>
        {[20, 40, 60, 80, 100].map((level) => <polygon key={level} points={ring(level)} className={level === 100 ? "radar-svg-ring is-outer" : "radar-svg-ring"} />)}
        {axes.map((_, index) => {
          const [x, y] = point(index, 100);
          return <line key={index} x1={cx} y1={cy} x2={x} y2={y} className="radar-svg-ring" />;
        })}
        <polygon points={ring(baseline)} className="radar-spider-baseline" />
        <polygon points={axes.map((axis, index) => point(index, axis.value).join(",")).join(" ")} className="radar-spider-series" />
        {axes.map((axis, index) => {
          const [x, y] = point(index, axis.value);
          return <circle key={axis.label} cx={x} cy={y} r={3.5} className="radar-spider-dot" />;
        })}
        {axes.map((axis, index) => {
          const [x, y] = at(index, R + 18);
          const anchor = Math.abs(x - cx) < 4 ? "middle" : x > cx ? "start" : "end";
          const dy = y < cy - R * 0.9 ? -2 : y > cy + R * 0.9 ? 10 : 4;
          return <text key={axis.label} x={x} y={y + dy} className="radar-svg-label" textAnchor={anchor}>{axis.label} <tspan className="radar-svg-label-value">{Math.round(axis.value)}</tspan></text>;
        })}
      </svg>
      <figcaption><span><i className="is-series" aria-hidden="true" />{seriesLabel}</span><span><i className="is-baseline" aria-hidden="true" />{baselineLabel}</span>{note && <small>{note}</small>}</figcaption>
    </figure>
  );
}

// ─── Two-column sankey ───────────────────────────────────────────────────────

export type SankeyNode = { key: string; label: string; value: number; tone: string };

export function Sankey({ sources, targets, title, format }: { sources: SankeyNode[]; targets: SankeyNode[]; title: string; format: (value: number) => string }) {
  const W = 520;
  const H = 230;
  const nodeW = 12;
  const gap = 10;
  const leftX = 132;
  const rightX = 352;
  const liveSources = sources.filter((node) => node.value > 0);
  const liveTargets = targets.filter((node) => node.value > 0);
  const total = Math.max(liveSources.reduce((sum, node) => sum + node.value, 0), liveTargets.reduce((sum, node) => sum + node.value, 0), 1);
  const scaleFor = (nodes: SankeyNode[]) => (H - gap * Math.max(0, nodes.length - 1)) / total;
  const place = (nodes: SankeyNode[]) => {
    const scale = scaleFor(nodes);
    let offset = 0;
    let labelFloor = 0;
    return nodes.map((node) => {
      const y = offset;
      const h = node.value * scale;
      offset += h + gap;
      // Two-line labels need ~28px; push a label down when the node above was too thin.
      const labelY = Math.max(y + Math.max(2, h) / 2, labelFloor);
      labelFloor = labelY + 28;
      return { ...node, y, h, cursor: y, labelY };
    });
  };
  const left = place(liveSources);
  const right = place(liveTargets);
  const sourceScale = scaleFor(liveSources);
  const targetScale = scaleFor(liveTargets);
  // Fill each target from the sources in order, like pouring from one column into the other.
  const links: Array<{ sy0: number; sy1: number; ty0: number; ty1: number; tone: string; red: boolean }> = [];
  let sourceIndex = 0;
  let sourceLeft = left[0]?.value ?? 0;
  for (const target of right) {
    let needed = target.value;
    while (needed > 0.0001 && sourceIndex < left.length) {
      const source = left[sourceIndex];
      const take = Math.min(needed, sourceLeft);
      links.push({
        sy0: source.cursor, sy1: source.cursor + take * sourceScale,
        ty0: target.cursor, ty1: target.cursor + take * targetScale,
        tone: target.tone, red: source.tone === "red",
      });
      source.cursor += take * sourceScale;
      target.cursor += take * targetScale;
      needed -= take;
      sourceLeft -= take;
      if (sourceLeft <= 0.0001) {
        sourceIndex += 1;
        sourceLeft = left[sourceIndex]?.value ?? 0;
      }
    }
  }
  const mid = (leftX + nodeW + rightX) / 2;
  const ribbon = (link: typeof links[number]) => `M ${leftX + nodeW} ${link.sy0} C ${mid} ${link.sy0}, ${mid} ${link.ty0}, ${rightX} ${link.ty0} L ${rightX} ${link.ty1} C ${mid} ${link.ty1}, ${mid} ${link.sy1}, ${leftX + nodeW} ${link.sy1} Z`;
  return (
    <svg className="radar-svg radar-svg-sankey" viewBox={`-4 -4 ${W + 8} ${H + 36}`} role="img" aria-label={title}>
      {links.map((link, index) => <path key={index} d={ribbon(link)} fill={link.red ? "var(--rd-red)" : tone(link.tone)} opacity={link.red ? 0.42 : 0.3} />)}
      {left.map((node) => <g key={node.key}>
        <rect x={leftX} y={node.y} width={nodeW} height={Math.max(2, node.h)} rx={3} fill={tone(node.tone)} />
        <text x={leftX - 10} y={node.labelY - 2} className="radar-svg-node" textAnchor="end">{node.label}</text>
        <text x={leftX - 10} y={node.labelY + 12} className="radar-svg-node-value" textAnchor="end">{format(node.value)}</text>
      </g>)}
      {right.map((node) => <g key={node.key}>
        <rect x={rightX} y={node.y} width={nodeW} height={Math.max(2, node.h)} rx={3} fill={tone(node.tone)} />
        <text x={rightX + nodeW + 10} y={node.labelY - 2} className="radar-svg-node">{node.label}</text>
        <text x={rightX + nodeW + 10} y={node.labelY + 12} className="radar-svg-node-value">{format(node.value)}</text>
      </g>)}
    </svg>
  );
}
