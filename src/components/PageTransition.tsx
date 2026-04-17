/*
 * ═══════════════════════════════════════════════════════════════
 *  PAGE TRANSITION - Framer-style scale + fade
 * ───────────────────────────────────────────────────────────────
 *  Replicates the exact feel from Framer's Page Effects panel:
 *
 *  EXIT  (outgoing page):
 *    opacity  100% → 0%
 *    scale    100% → 96%     (subtle shrink)
 *    duration 0.65s
 *    ease     [0.23, 1, 0.32, 1]  (smooth "out" from easing.dev)
 *
 *  ENTER (incoming page):
 *    opacity  0% → 100%
 *    scale    104% → 100%    (slight overshoot grow → settle)
 *    duration 0.75s
 *    ease     [0.23, 1, 0.32, 1]
 *
 *  Header/footer are EXCLUDED (not wrapped in the animated div).
 *  No overlay, no circle, no shapes - just pure motion.
 * ═══════════════════════════════════════════════════════════════
 */

// This file is intentionally empty of a React component.
// The transition logic lives entirely in Layout.tsx using
// AnimatePresence + motion.div around the <Outlet />.
// This file is kept for backwards compatibility of imports.

export function PageTransition() {
  return null;
}
