import { create } from "qrcode";
import { useMemo } from "react";
import { montrealCityHex } from "./montrealCityColors";

type Props = {
  data: string;
  className?: string;
};

/**
 * Data modules use the same spatial palette as the 3D city (greens, brick, cream, gray streets).
 * Finder / timing / format / alignment stay black & white for decoding.
 */
export function MontrealStyleQrSvg({ data, className = "" }: Props): JSX.Element {
  const { n, rects } = useMemo(() => {
    const qr = create(data, { errorCorrectionLevel: "Q" });
    const size = qr.modules.size;
    const out: JSX.Element[] = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const on = qr.modules.get(r, c) !== 0;
        const reserved = qr.modules.isReserved(r, c) !== 0;
        let fill: string;
        if (reserved) {
          fill = on ? "#0a0a0a" : "#ffffff";
        } else {
          fill = on ? montrealCityHex(c, r, size) : "#ffffff";
        }
        out.push(
          <rect
            key={`${r}-${c}`}
            x={c + 0.035}
            y={r + 0.035}
            width={0.93}
            height={0.93}
            rx={0.07}
            ry={0.07}
            fill={fill}
          />
        );
      }
    }
    return { n: size, rects: out };
  }, [data]);

  return (
    <svg
      viewBox={`0 0 ${n} ${n}`}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {rects}
    </svg>
  );
}
