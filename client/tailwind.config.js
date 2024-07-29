/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Add custom column configurations here
        "custom-3": "1fr 2fr 1fr",
        "custom-3-fixed":
          "minmax(110px, 1fr) minmax(500px, 2fr) minmax(0px, 1fr)",
        "custom-2": "1fr 2fr",
        "custom-2-fixed":
          "minmax(80px, 1fr) minmax(500px, 2fr) ",
      },
    },
  },
  plugins: [],
};
