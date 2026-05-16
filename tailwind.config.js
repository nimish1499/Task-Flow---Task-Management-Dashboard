/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg:        "#0f1117",
        surface:   "#1a1d27",
        surface2:  "#22263a",
        border:    "#2e3248",
        borderHov: "#4a5080",
        accent:    "#6c8bff",
        accentHov: "#8aa3ff",
        pending:   "#f5a623",
        inprog:    "#4fc3f7",
        done:      "#66bb6a",
        danger:    "#ef5350",
        overdue:   "#ff7043",
        textPri:   "#eef0f8",
        textSec:   "#8a90b4",
        textMut:   "#555c80",
      },
      fontFamily: {
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      keyframes: {
        fadeIn:  { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        fadeIn:  "fadeIn 0.15s ease",
        slideUp: "slideUp 0.2s ease",
      },
    },
  },
  plugins: [],
};
