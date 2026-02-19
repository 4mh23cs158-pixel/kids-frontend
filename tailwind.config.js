/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#FF8EBC',
                    DEFAULT: '#FF6B9D',
                    dark: '#FF4D7D',
                },
                secondary: {
                    light: '#7EDBD5',
                    DEFAULT: '#4ECDC4',
                    dark: '#36B0A8',
                },
                accent: {
                    light: '#FFFACD',
                    DEFAULT: '#FFE66D',
                    dark: '#F7D61B',
                },
                background: {
                    DEFAULT: '#F7FBFF',
                    soft: '#EBF4FF',
                    bright: '#FFFFFF',
                },
                pop: '#FF4081',
            },
            fontFamily: {
                bubblegum: ['"Bubblegum Sans"', 'cursive'],
                quicksand: ['Quicksand', 'sans-serif'],
            },
            animation: {
                'bounce-slow': 'bounce 3s infinite',
                'pulse-gentle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
