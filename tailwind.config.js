module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        ink: "#202322",
        paper: "#f7f6f2",
        line: "#e9e7e1",
        muted: "#8b8e89",
        coral: "#ff8066",
        mint: "#b9e6d4",
        lavender: "#d9d2ff",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
      boxShadow: {
        soft: "0 12px 35px rgba(32, 35, 34, 0.08)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
