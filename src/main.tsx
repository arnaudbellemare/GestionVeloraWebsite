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
 * The prerendered shell stays visible so Lighthouse and crawlers always have an
 * immediate first-viewport paint candidate. React then replaces it with the app.
 */
const rootEl = document.getElementById("root")!;
rootEl.dataset.gvBoot = "ready";

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

document.body.removeAttribute("style");
