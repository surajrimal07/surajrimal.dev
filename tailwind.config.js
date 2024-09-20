/* eslint-disable prettier/prettier */
// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

// ../node_modules/pliny/dist/**/*.mjs is needed for monorepo setup
/** @type {import("tailwindcss/types").Config } */
module.exports = {
	content: [
		'../node_modules/pliny/**/*.{js,ts,tsx}',
		'./node_modules/pliny/**/*.{js,ts,tsx}',
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,tsx}',
		'./components/**/*.{js,ts,tsx}',
		'./layouts/**/*.{js,ts,tsx}',
		'./lib/**/*.{js,ts,tsx}',
		'./data/**/*.mdx',
	],
	darkMode: 'class',
	theme: {
		extend: {
			keyframes: {
				'wave-animation': {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'10%': {
						transform: 'rotate(14deg)'
					},
					'20%': {
						transform: 'rotate(-8deg)'
					},
					'30%': {
						transform: 'rotate(14deg)'
					},
					'40%': {
						transform: 'rotate(-4deg)'
					},
					'50%': {
						transform: 'rotate(10deg)'
					},
					'60%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(0deg)'
					}
				},
			},
			animation: {
				wave: 'wave-animation 2.5s linear infinite',
				'music-bar-1': 'music-bar-1 .8s linear infinite',
				'music-bar-2': 'music-bar-2 .8s linear infinite',
				'music-bar-3': 'music-bar-3 .8s linear infinite',
				'music-bar-4': 'music-bar-4 .8s linear infinite'
			},
			boxShadow: {
				nextjs: '0 8px 20px rgb(0,0,0,0.12)',
				'nextjs-dark': '0 8px 20px rgb(255,255,255,0.12)'
			},
			spacing: {
				'9/16': '56.25%'
			},
			lineHeight: {
				'11': '2.75rem',
				'12': '3rem',
				'13': '3.25rem',
				'14': '3.5rem'
			},
			fontFamily: {
				sans: ['var(--font-space-grotesk)', ...fontFamily.sans],
			},
			colors: {
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				sky: colors.sky,
				gray: colors.gray,
				dark: '#000000FF',
				coral: '#EF596F',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					1: 'hsl(var(--chart-1))',
					2: 'hsl(var(--chart-2))',
					3: 'hsl(var(--chart-3))',
					4: 'hsl(var(--chart-4))',
					5: 'hsl(var(--chart-5))'
				}
			},
			zIndex: {
				60: '60',
				70: '70',
				80: '80',
			},
			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						a: {
							color: theme('colors.primary.500'),
							'&:hover': {
								color: `${theme('colors.primary.600')}`,
							},
							code: { color: theme('colors.primary.400') },
						},
						h1: {
							letterSpacing: theme('letterSpacing.tight'),
						},
						h2: {
							fontWeight: '700',
							letterSpacing: theme('letterSpacing.tight'),
						},
						h3: {
							fontWeight: '600',
						},
						code: {
							color: '#f78c22',
							backgroundColor: '#24283b',
							paddingLeft: '4px',
							paddingRight: '4px',
							paddingTop: '2px',
							paddingBottom: '2px',
							borderRadius: '0.25rem',
						},
						// 'code::before': {
						// 	content: 'none',
						// },
						// 'code::after': {
						// 	content: 'none',
						// },
						// details: {
						// 	backgroundColor: theme('colors.gray.100'),
						// 	paddingLeft: '4px',
						// 	paddingRight: '4px',
						// 	paddingTop: '2px',
						// 	paddingBottom: '2px',
						// 	borderRadius: '0.25rem',
						// },
						// hr: { borderColor: theme('colors.gray.200') },
						// 'ol li::marker': {
						// 	fontWeight: '600',
						// 	color: theme('colors.gray.500'),
						// },
						// 'ul li::marker': {
						// 	backgroundColor: theme('colors.gray.500'),
						// },
						blockquote: {
							color: theme('colors.gray.900'),
							borderLeftColor: theme('colors.gray.200'),
						},
					},
				},
				invert: {
					css: {
						a: {
							color: theme('colors.primary.500'),
							'&:hover': {
								color: `${theme('colors.primary.400')}`,
							},
							code: { color: theme('colors.primary.400') },
						},
						'h1,h2,h3,h4,h5,h6': {
							color: theme('colors.gray.100'),
						},
					},
				},
			}), borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require("tailwindcss-animate")],
};
