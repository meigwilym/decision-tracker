/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
	"./src/**/*.js",
	"./src/Components/*.js",
	"./src/Components/Controls.js"
  ],
  theme: {
    extend: {}
  },
  plugins: [],
  safelist: [
	{
        pattern: /(peer-checked:)?(bg|text|border)-(emerald|red|blue|violet)-(100|200|300|400|500|600|700|800|900)/
	}
]
}
