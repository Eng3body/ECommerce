/* eslint-disable no-undef */
const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}" ,   flowbite.content()],

  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
}

