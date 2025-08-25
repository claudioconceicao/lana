// tailwind.config.js
import defaultTheme from "tailwindcss/defaultTheme";

export const content = [
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    fontFamily: {
      sans: ["var(--font-inter)", ...fontFamily.sans], // default body
      heading: ["var(--font-poppins)", ...fontFamily.sans], // headings
    },
  },
};
export const plugins = [];
