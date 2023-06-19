/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slate_custom: "#f6f8fc",
        message_window: "#e2d8d4",
      },
      minWidth: {
        10: "2.5rem",
      },
    },
  },
  plugins: [],
};
