import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
