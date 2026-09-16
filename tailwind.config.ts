import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          light: "#fcfaf0",
          DEFAULT: "#f8f4e6",
          dark: "#e8e4d8",
          darker: "#dcd8cc",
          bottom: "#f4f1ea",
        },
        gold: {
          light: "#f7eed0",
          DEFAULT: "#d4af37",
          dark: "#b8962d",
          muted: "#e6cca0",
        },
        eucalyptus: {
          light: "#7a9a80",
          DEFAULT: "#5b7c61",
          dark: "#3d5442",
        },
        charcoal: {
          light: "#4a5568",
          DEFAULT: "#2d3436",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        cursive: ["var(--font-cursive)", "cursive"],
      },
      boxShadow: {
        card: "0 10px 30px -5px rgba(212, 175, 55, 0.1), 0 20px 40px -15px rgba(0, 0, 0, 0.07)",
        gold: "0 0 20px rgba(212, 175, 55, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;

