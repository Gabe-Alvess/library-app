/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "p-sBlue": "#003049",
        "p-red": "#c1121f",
        "p-dRed": "#780000",
        "p-beige": "#fdf0d5",
        "p-lBlue": "#669bbc",
      },
      fontFamily: {
        mooli: ["Mooli", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
      },
      backgroundImage: {
        "library-img": "url('/../assets/images/library-bg.jpg')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
