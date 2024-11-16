module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1536px',  // Default
        '3xl': '1920px',  // Custom for larger screens
        '4k': '3840px',   // Custom breakpoint for 4K resolution
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark"], // Enables both light and dark themes
  },
};