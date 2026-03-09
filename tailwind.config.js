/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "velora-green": "#485c11",
        "accentaccent-1": "#485c11",
        "accentaccent-2": "#dfecc6",
        "mid-green": "#8e9c78",
        "velora-light": "#dfecc6",
        "velora-dark": "#0a0a0a",
        "velora-muted": "#717171",
        "velora-gold": "#d4a853",
        "velora-cream": "#f9f6f3",
        "velora-charcoal": "#191818",
        "velora-darker": "#121212",
        "waabi-pink": "#FF0066",
      },
      fontFamily: {
        serif: ["Instrument Serif", "Georgia", "serif"],
        playfair: ["Playfair Display", "Georgia", "serif"],
        "crimson": ["Crimson Text", "Georgia", "serif"],
        sans: ["DM Sans", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "flash-green": "flashGreen 1.5s ease-in-out infinite",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
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
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        flashGreen: {
          "0%, 100%": { backgroundColor: "#485c11", boxShadow: "0 0 4px #485c11" },
          "50%": { backgroundColor: "#8e9c78", boxShadow: "0 0 8px #8e9c78" },
        },
      },
    },
  },
  plugins: [],
}
