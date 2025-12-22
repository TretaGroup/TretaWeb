import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // ⬅️ REQUIRED FOR next-themes
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        caldina: ["var(--font-caldina)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
