/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		"./src/**/*.js"
	],
	theme: {
		extend: {}
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("daisyui")
	],
	safelist: [
		{
			pattern: /(peer-checked:)?(bg|text|border)-(emerald|red|blue|violet)-(100|200|300|400|500|600|700|800|900)/
		}
	],
	daisyui: {
		themes: ["light", "dark", "nord"],
	},
}
