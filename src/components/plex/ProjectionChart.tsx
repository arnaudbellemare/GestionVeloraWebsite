import { useId } from "react";

export interface ChartRow {
  year: number;
  noi: number;
  cashFlow: number;
  equity: number;
}

/**
 * Ten-year projection drawn as inline SVG.
 *
 * Deliberately hand-rolled rather than pulling in a charting library: this
 * renders on a marketing site where every kilobyte of JavaScript costs Core Web
 * Vitals, and the shapes needed here are bars, a line and an axis. Colours come
 * from the calculator's CSS custom properties, so it themes with the rest of
 * the component and follows dark mode for free.
 *
 * The chart is decorative in the accessibility sense: the same figures sit in
 * the table directly beneath it, so it is exposed as a labelled image with a
 * one-line summary rather than trying to make every bar focusable.
 */
export function ProjectionChart({
  rows, formatCurrency, labelNoi, labelCashFlow, labelEquity, ariaLabel,
}: {
  rows: ChartRow[];
  formatCurrency: (v: number) => string;
  labelNoi: string;
  labelCashFlow: string;
  labelEquity: string;
  ariaLabel: string;
}) {
  const clipId = useId();
  if (rows.length === 0) return null;

  // Viewport is fixed; the SVG scales to its container via viewBox.
  const W = 760, H = 300;
  const padL = 62, padR = 54, padT = 16, padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const cashMin = Math.min(0, ...rows.map((r) => r.cashFlow));
  const cashMax = Math.max(0, ...rows.map((r) => r.cashFlow), ...rows.map((r) => r.noi));
  // A little headroom so the tallest bar never touches the frame.
  const yMax = cashMax * 1.08 || 1;
  const yMin = cashMin * 1.15;
  const span = yMax - yMin || 1;

  const y = (v: number) => padT + plotH - ((v - yMin) / span) * plotH;
  const bandW = plotW / rows.length;
  const barW = Math.min(30, bandW * 0.5);

  const zeroY = y(0);

  // Equity rides a second scale: it is an order of magnitude larger than the
  // flows, so sharing an axis would flatten the bars into nothing.
  const eqMax = Math.max(...rows.map((r) => r.equity)) * 1.05 || 1;
  const eqY = (v: number) => padT + plotH - (v / eqMax) * plotH;

  const noiPath = rows
    .map((r, i) => `${i === 0 ? "M" : "L"} ${padL + bandW * i + bandW / 2} ${y(r.noi)}`)
    .join(" ");
  const eqPath = rows
    .map((r, i) => `${i === 0 ? "M" : "L"} ${padL + bandW * i + bandW / 2} ${eqY(r.equity)}`)
    .join(" ");

  // Four gridlines across the flow scale.
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => yMin + span * f);

  return (
    <figure className="plexc-chart">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={ariaLabel}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={padL} y={padT} width={plotW} height={plotH} />
          </clipPath>
        </defs>

        {ticks.map((t, i) => (
          <g key={i}>
            <line
              x1={padL} x2={padL + plotW} y1={y(t)} y2={y(t)}
              className={Math.abs(t) < span * 0.01 ? "plexc-chart-zero" : "plexc-chart-grid"}
            />
            <text x={padL - 8} y={y(t) + 4} textAnchor="end" className="plexc-chart-tick">
              {Math.abs(t) >= 1000 ? `${Math.round(t / 1000)}k` : Math.round(t)}
            </text>
          </g>
        ))}

        <g clipPath={`url(#${clipId})`}>
          {rows.map((r, i) => {
            const cx = padL + bandW * i + bandW / 2;
            const top = r.cashFlow >= 0 ? y(r.cashFlow) : zeroY;
            const h = Math.abs(y(r.cashFlow) - zeroY);
            return (
              <rect
                key={r.year}
                x={cx - barW / 2}
                y={top}
                width={barW}
                height={Math.max(1, h)}
                rx={2}
                className={r.cashFlow >= 0 ? "plexc-chart-bar-pos" : "plexc-chart-bar-neg"}
              >
                <title>{`${labelCashFlow} ${r.year}: ${formatCurrency(r.cashFlow)}`}</title>
              </rect>
            );
          })}
          <path d={eqPath} className="plexc-chart-equity" fill="none" />
          <path d={noiPath} className="plexc-chart-noi" fill="none" />
        </g>

        {/* Right-hand axis marks the equity scale so the second line is readable. */}
        <text x={padL + plotW + 8} y={eqY(eqMax) + 10} className="plexc-chart-tick">
          {`${Math.round(eqMax / 1000)}k`}
        </text>

        {rows.map((r, i) => (
          <text
            key={r.year}
            x={padL + bandW * i + bandW / 2}
            y={H - 12}
            textAnchor="middle"
            className="plexc-chart-tick"
          >
            {r.year}
          </text>
        ))}
      </svg>

      <figcaption className="plexc-chart-legend">
        <span><i className="plexc-chart-key-noi" />{labelNoi}</span>
        <span><i className="plexc-chart-key-cf" />{labelCashFlow}</span>
        <span><i className="plexc-chart-key-eq" />{labelEquity}</span>
      </figcaption>
    </figure>
  );
}

export default ProjectionChart;
