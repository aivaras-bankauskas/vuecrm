/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        colors: {
            'body-bg': '#e5e7eb',
            'background': '#ffffff',
            'color': '#111827',
            'hover': '#4f46e5',
            'primary': '#4f46e5',
            'secondary': '#9ca3af',
            'success': '#22c55e',
            'danger': '#be185d',
            'warning': '#f97316',
            'info': '#0284c7',
            'gray-dark': '#273444',
            'gray': '#8492a6',
            'gray-light': '#e5e7eb',
            'black': '#111827',
            'white': '#f8fafc'
        },
        extend: {},
    },
    plugins: [],
};

