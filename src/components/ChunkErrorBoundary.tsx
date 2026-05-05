import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

const SESSION_KEY = "chunk_reload_attempted";

/**
 * Catches dynamic import failures (ChunkLoadError) that occur when Vercel
 * deploys a new build and old chunk filenames are no longer available.
 * - First error: silently reloads (no flash of UI).
 * - If the reload itself fails: shows a manual refresh button.
 */
export class ChunkErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    const isChunkError =
      error.name === "ChunkLoadError" ||
      /loading chunk \d+ failed/i.test(error.message) ||
      /failed to fetch dynamically imported module/i.test(error.message) ||
      /dynamically imported module/i.test(error.message);

    if (!isChunkError) return;

    const alreadyReloaded = sessionStorage.getItem(SESSION_KEY) === "1";
    if (!alreadyReloaded) {
      sessionStorage.setItem(SESSION_KEY, "1");
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      const alreadyReloaded = sessionStorage.getItem(SESSION_KEY) === "1";
      if (!alreadyReloaded) {
        // Reload is about to fire — render nothing to avoid any flash.
        return null;
      }
      // Reload happened but the error persists — show the manual button.
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
          <button
            onClick={() => {
              sessionStorage.removeItem(SESSION_KEY);
              window.location.reload();
            }}
            className="px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black font-sans text-sm font-medium"
          >
            Actualiser la page
          </button>
        </div>
      );
    }

    // Clear the flag on successful render.
    sessionStorage.removeItem(SESSION_KEY);
    return this.props.children;
  }
}
