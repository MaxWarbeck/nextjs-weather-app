import type { Config } from "tailwindcss";

const config: Config = {
  module: {
    exports: {
      darkMode: 'class',
    },
  },
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          1: "rgb(var(--color-accent1) / <alpha-value>)",
          2: "rgb(var(--color-accent2) / <alpha-value>)",
        },
        bkg: {
          1: "rgb(var(--color-bkg1) / <alpha-value>)",
          2: "rgb(var(--color-bkg2) / <alpha-value>)",
          3: "rgb(var(--color-bkg3) / <alpha-value>)",
        },
        con: "rgb(var(--color-con) / <alpha-value>)",
        content: "rgb(var(--color-content) / <alpha-value>)",
        backgroundImage: {
          "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
          "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        },
      },
    },
  },
  plugins: [],
};
export default config;
