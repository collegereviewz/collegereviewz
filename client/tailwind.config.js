/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#3b4eba",
                "primary-light": "#51c1ef",
                secondary: "#1a2a6c",
                accent: "#f26a21",
                "bg-main": "#f8fafc",
                "bg-dark": "#0f172a",
            },
            fontFamily: {
                outfit: ["Outfit", "sans-serif"],
            }
        },
    },
    plugins: [],
}
