import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Header-template tokens
        bg: "#FFFFFF",
        primary: "#1F3FD9",
        ink: "#0E1117",
        // Brand palette — S11 Architectural Product, royal-blue accent
        paper: "#FFFFFF",
        mist: "#F3F4F7",
        cloud: "#E7E9EF",
        charcoal: "#14181F",
        slate: "#565C66",
        steel: "#8A8F99",
        accent: "#1F3FD9",
        "accent-soft": "#ECEFFC",
        "accent-deep": "#13267F",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        shell: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
