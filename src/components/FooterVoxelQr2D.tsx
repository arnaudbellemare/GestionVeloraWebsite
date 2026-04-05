import { motion, useReducedMotion } from "framer-motion";
import { MontrealStyleQrSvg } from "./MontrealStyleQrSvg";

type Props = {
  url: string;
  ariaLabel: string;
};

/** Sits on footer charcoal; QR is a smaller white tile (quiet zone) centered — no outer frame. */
export function FooterVoxelQr2D({ url, ariaLabel }: Props): JSX.Element {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="absolute inset-0 flex min-h-0 min-w-0 items-center justify-center bg-[#1C1C1C] pb-5 pt-0"
      initial={{ opacity: 0.97 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
    >
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="aspect-square w-[80%] max-w-[9rem] min-w-0 translate-y-1 overflow-hidden rounded-sm bg-white p-[3px] touch-manipulation"
        aria-label={ariaLabel}
        whileHover={reduce ? undefined : { scale: 1.03 }}
        whileTap={reduce ? undefined : { scale: 0.98 }}
      >
        <MontrealStyleQrSvg
          data={url}
          className="block h-full w-full min-h-0 bg-[#161616]"
        />
      </motion.a>
    </motion.div>
  );
}
