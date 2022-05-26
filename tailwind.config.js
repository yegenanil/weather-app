module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '305px',
      'sm': '800px',
      'md': '968px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    backgroundImage: {
      'sun': "url('../src/assets/sun.jpg')",
      'cloud': "url('../src/assets/cloud.jpg')",
      'rain': "url('../src/assets/rain.jpg')",
      'clear': "url('../src/assets/clear.jpg')",
    },

    extend: {},
  },
  plugins: [],
}