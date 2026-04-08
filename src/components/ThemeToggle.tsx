import { useTheme } from "../context/ThemeContext";

interface ThemeToggleProps {
  lightModeOverWhite?: boolean;
}

export function ThemeToggle({ lightModeOverWhite = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const iconDark = theme === "light" && lightModeOverWhite;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Mode sombre" : "Mode clair"}
      className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 ${
        iconDark ? "hover:bg-black/5" : "hover:bg-white/10"
      }`}
    >
      {theme === "light" ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-5 h-5 ${iconDark ? "text-black" : "text-white"}`}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-5 h-5 ${iconDark ? "text-black" : "text-white"}`}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      )}
    </button>
  );
}
