import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#DE1537",

          secondary: "#3c5aa6",

          accent: "#2a75bb",

          neutral: "#22252b",

          "base-100": "#DEDEDE",

          info: "#98b6f6",

          success: "#4CA459",

          warning: "#ffcb05",

          error: "#f06a5c",
        },
      },
    ],
  },
};
export default config;
