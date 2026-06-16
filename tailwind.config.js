/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-container-lowest": "#0e0e0e",
        "surface-tint": "#4cd6ff",
        "primary": "#a4e6ff",
        "on-background": "#e5e2e1",
        "surface": "#131313",
        "primary-container": "#00d1ff",
        "surface-container-highest": "#353534",
        "surface-container-high": "#2a2a2a",
        "secondary-container": "#184f60",
        "on-surface": "#e5e2e1",
        "outline": "#859399",
        "surface-dim": "#131313",
        "on-surface-variant": "#bbc9cf",
        "surface-container-low": "#1c1b1b",
        "surface-container": "#201f1f",
        "surface-variant": "#353534",
        "outline-variant": "#3c494e",
        "background": "#131313",
      },
      spacing: {
        "gutter": "24px",
        "margin-desktop": "40px",
        "container-max": "1280px",
        "unit": "8px",
        "margin-mobile": "16px"
      },
      fontFamily: {
        "headline-lg": ["Poppins", "sans-serif"],
        "label-md": ["Poppins", "sans-serif"],
        "label-sm": ["Poppins", "sans-serif"],
        "headline-lg-mobile": ["Poppins", "sans-serif"],
        "body-md": ["Poppins", "sans-serif"],
        "headline-md": ["Poppins", "sans-serif"],
        "display": ["Poppins", "sans-serif"],
        "body-lg": ["Poppins", "sans-serif"]
      },
      fontSize: {
        "headline-lg": ["32px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        "label-md": ["14px", { lineHeight: "1.2", letterSpacing: "0.02em", fontWeight: "500" }],
        "label-sm": ["12px", { lineHeight: "1.2", fontWeight: "600" }],
        "headline-lg-mobile": ["24px", { lineHeight: "1.2", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "display": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }]
      }
    },
  },
  plugins: [],
}