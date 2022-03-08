module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {},
  },
  // Safelist required per https://github.com/tailwindlabs/tailwindcss/issues/7203 to include all tailwind classes.
safelist: [{ pattern: /.*/ }],
  plugins: [],
}