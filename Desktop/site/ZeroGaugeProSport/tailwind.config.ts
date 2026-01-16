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
        background: "#FFFFFF",
        foreground: "#000000",
        primary: "#000000",
        secondary: "#4B5563",
        accent: {
          DEFAULT: "hsl(213, 94%, 55%)", // Updated CTA Blue
          hover: "#1D4ED8",
        },
        prosport: {
          light: "hsl(213.1, 93.9%, 67.8%)", // Hero Background
        },
        'feature-accent': 'hsl(224.3, 76.3%, 48%)',
        'feature-accent-light': 'hsl(224.3, 76.3%, 95%)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
