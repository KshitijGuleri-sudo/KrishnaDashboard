/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				// Royal Wedding Theme Colors
				royal: {
					green: '#0F3D2E',
					brown: '#4E342E',
					gold: '#C9A24D',
					cream: '#F5F5DC',
					'green-dark': '#0A2A1F',
					'gold-light': '#D4B76A',
				},
				brand: {
					50: '#eff6ff',
					100: '#dbeafe',
					200: '#bfdbfe',
					300: '#93c5fd',
					400: '#60a5fa',
					500: '#3b82f6',
					600: '#2563eb',
					700: '#1d4ed8',
					800: '#1e40af',
					900: '#1e3a8a',
					950: '#172554',
				},
				accent: {
					50: '#f0f9ff',
					100: '#e0f2fe',
					200: '#bae6fd',
					300: '#7dd3fc',
					400: '#38bdf8',
					500: '#0ea5e9',
					600: '#0284c7',
					700: '#0369a1',
					800: '#075985',
					900: '#0c4a6e',
				},
			},
			fontFamily: {
				display: ["Playfair Display", "ui-serif", "Georgia", "serif"],
				body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
				ui: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
				elegant: ["Cormorant Garamond", "serif"],
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem',
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.6s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
			},
			backgroundImage: {
				'royal-gradient': 'linear-gradient(135deg, #0F3D2E 0%, #4E342E 100%)',
				'gold-gradient': 'linear-gradient(135deg, #C9A24D 0%, #D4B76A 100%)',
				'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
			},
			boxShadow: {
				'royal': '0 10px 40px rgba(15, 61, 46, 0.2)',
				'gold': '0 10px 40px rgba(201, 162, 77, 0.3)',
			},
		},
	},
	plugins: [],
};
