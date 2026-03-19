import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "gestion-velora-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return stored === "dark" || stored === "light" ? stored : "dark";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    // Swap favicon based on theme
    const v = "11";
    const d = theme === "dark" ? "dark" : "light";
    const f32 = document.getElementById("favicon-32") as HTMLLinkElement | null;
    const f16 = document.getElementById("favicon-16") as HTMLLinkElement | null;
    const fMain = document.getElementById("favicon-main") as HTMLLinkElement | null;
    if (f32) f32.href = `/favicon-${d}-32.png?v=${v}`;
    if (f16) f16.href = `/favicon-${d}-16.png?v=${v}`;
    if (fMain) fMain.href = `/favicon-${d}.png?v=${v}`;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
