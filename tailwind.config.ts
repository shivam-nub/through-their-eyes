import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#05070B",
        surface: {
          50: "#1A2230",
          100: "#141B26",
          200: "#0F1520",
          300: "#0B0F17",
          400: "#070B10",
        },
        cyan: {
          glow: "#00F5FF",
          subtle: "#0ea5e9",
        },
        violet: {
          glow: "#A855F7",
          deep: "#6D28D9",
        },
        emerald: {
          glow: "#10B981",
        },
        amber: {
          glow: "#F59E0B",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan-line": "scanline 8s linear infinite",
        "glow-fade": "glowFade 3s ease-in-out infinite alternate",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        glowFade: {
          "0%": { opacity: "0.4" },
          "100%": { opacity: "0.9" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
