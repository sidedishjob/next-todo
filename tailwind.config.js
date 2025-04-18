/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./hooks/**/*.{js,ts,jsx,tsx}',
		'./layouts/**/*.{js,ts,jsx,tsx}',
		'./lib/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#3b82f6',
					hover: '#2563eb',
					dark: '#60a5fa',
				},
				secondary: {
					DEFAULT: '#10b981',
					hover: '#059669',
				},
				danger: {
					DEFAULT: '#ef4444',
					hover: '#dc2626',
				},
				background: {
					DEFAULT: '#ffffff',
					dark: '#1f2937',
				},
				card: {
					DEFAULT: '#f9fafb',
					dark: '#374151',
				},
			},
			borderRadius: {
				md: '0.375rem',
			},
			boxShadow: {
				card: '0 2px 4px rgba(0, 0, 0, 0.1)',
				hover: '0 4px 6px rgba(0, 0, 0, 0.1)',
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(-10px)' },
				},
				complete: {
					'0%': { backgroundColor: 'transparent' },
					'30%': { backgroundColor: 'rgba(16, 185, 129, 0.1)' },
					'100%': { backgroundColor: 'transparent' },
				},
				'draw-check': {
					'0%': { 'stroke-dashoffset': '24' },
					'100%': { 'stroke-dashoffset': '0' },
				},
			},
			animation: {
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				complete: 'complete 1s ease-out',
				'draw-check': 'draw-check 0.5s ease-out forwards',
			},
		},
	},
	plugins: [],
};
