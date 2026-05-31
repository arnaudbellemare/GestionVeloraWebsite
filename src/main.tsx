import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChunkErrorBoundary } from "./components/ChunkErrorBoundary";
import { ThemeProvider } from "./context/ThemeContext";
import "./i18n";
import "./index.css";

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

/**
 * Prerender (see scripts/prerender.ts) may place a semantic <main> inside #root for crawlers.
 * We use createRoot().render() rather than hydrateRoot() because that markup is not guaranteed
 * to match the full client tree (Layout, motion, hooks, etc.). React would warn or fail hydration
 * if the DOM structures differ. Replacing the subtree is intentional “SEO shell → client takeover”.
 * True hydration would require the same components (or isomorphic output) for static and client.
 *
 * #root starts with data-gv-boot="pending" + inline visibility:hidden (index.html)
 * so the SEO shell cannot flash before JS paints the real app.
 */
const rootEl = document.getElementById("root")!;
if (!rootEl.dataset.gvBoot) rootEl.dataset.gvBoot = "pending";

const root = ReactDOM.createRoot(rootEl);
root.render(
  <React.StrictMode>
    <ChunkErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ChunkErrorBoundary>
  </React.StrictMode>
);

requestAnimationFrame(() => {
  rootEl.dataset.gvBoot = "ready";
  document.body.removeAttribute("style");
});
