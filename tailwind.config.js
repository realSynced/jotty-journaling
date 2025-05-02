const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(select|form|listbox|divider|popover|button|ripple|spinner|scroll-shadow).js"
  ],
  theme: {
    extend: {
      colors: {
        jotty: {
          sage: "#CCD5AE",
          spring: "#E9EDC9",
          cream: "#FEFAE0",
          honey: "#FAEDCD",
          caramel: "#D4A373",
        },
      },
      fontFamily: {
        itim: ["var(--font-itim)", "cursive"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [heroui()],
};
