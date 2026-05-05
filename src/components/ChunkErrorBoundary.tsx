import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches dynamic import failures (ChunkLoadError) that occur when Vercel
 * deploys a new build and old chunk filenames are no longer available.
 * Automatically reloads once to fetch the new bundle.
 */
export class ChunkErrorBoundary extends Component<Props, State> {
  private reloadAttempted = false;

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

    if (isChunkError && !this.reloadAttempted) {
      this.reloadAttempted = true;
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError && !this.reloadAttempted) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="font-sans text-nd-secondary text-sm">
            Une mise à jour est disponible.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black font-sans text-sm font-medium"
          >
            Actualiser la page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
