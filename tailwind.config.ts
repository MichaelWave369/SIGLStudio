import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#06070b",
        panel: "#111420",
        line: "#22283b",
        accent: "#8ef5d0",
        muted: "#96a0be"
      },
      boxShadow: {
        glow: "0 0 80px rgba(142, 245, 208, 0.07)"
      }
    }
  },
  plugins: []
};

export default config;
