/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        nd: {
          canvas: "var(--nd-canvas)",
          surface: "var(--nd-surface)",
          raised: "var(--nd-surface-raised)",
          border: "var(--nd-border)",
          "border-visible": "var(--nd-border-visible)",
          muted: "var(--nd-text-disabled)",
          secondary: "var(--nd-text-secondary)",
          primary: "var(--nd-text-primary)",
          display: "var(--nd-text-display)",
          accent: "var(--nd-accent)",
          "accent-subtle": "var(--nd-accent-subtle)",
          interactive: "var(--nd-interactive)",
          success: "#4a9e5c",
          warning: "#d4a843",
        },
        /** Legacy Velora — keep hex for unmigrated paths; prefer `nd-*` in new UI */
        "velora-green": "#485c11",
        "accentaccent-1": "var(--nd-text-display)",
        "accentaccent-2": "var(--nd-surface-raised)",
        "mid-green": "var(--nd-text-secondary)",
        "velora-light": "var(--nd-surface-raised)",
        "velora-dark": "var(--nd-text-primary)",
        "velora-muted": "var(--nd-text-secondary)",
        "velora-gold": "var(--nd-text-secondary)",
        "velora-cream": "var(--nd-canvas)",
        "velora-charcoal": "var(--nd-canvas)",
        "velora-darker": "var(--nd-surface)",
        "waabi-pink": "#d71921",
        "velora-ocean": "var(--nd-interactive)",
        "velora-ocean-hover": "#4a8ee5",
      },
      fontFamily: {
        /** Google Fonts — see index.html stylesheet */
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
        /** Dot-matrix display (Nothing-adjacent) — load Doto in index.html */
        doto: ["Doto", "ui-monospace", "monospace"],
        display: ['"Playfair Display"', "Georgia", "serif"],
        /** Large marketing serif blocks (was Syne) */
        syne: ['"Instrument Serif"', "Georgia", "serif"],
        serif: ['"Crimson Text"', "Georgia", "serif"],
        playfair: ['"Playfair Display"', "Georgia", "serif"],
        crimson: ['"Crimson Text"', "Georgia", "serif"],
        instrument: ['"Instrument Serif"', "Georgia", "serif"],
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "fade-in": "fadeIn 0.35s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "fade-up": "fadeUp 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
