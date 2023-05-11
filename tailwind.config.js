/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textPrimary: "#11181C",
        textSecondary: "#687076",
        textBlue: "#006ADC",
        bgrBlue: "#0091FF",
        bgrBlue2: "#EDF6FF",
        bgrGray: "#F1F3F5",
        bgrGray2: "#FBFCFD",
        bgrRed: "#EF6165",
        bgrHover: "rgb(193 200 205 / 8%)",
        bgrHoverActive: "rgba(0, 145, 255, 0.16)",
        black: "#000",
        white: "#fff",
        textGray: "#FBFDFF",
        red1: "rgb(243, 174, 175)",
        red2: "rgb(255, 239, 239)",
        red3: "rgb(229, 72, 77)",
        green: "#30A46C",
      },

      fontSize: {
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        24: "24px",
        36: "36px",
        48: "48px",
        64: "64px",
      },
    },
  },
  plugins: [],
};
