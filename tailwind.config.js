module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      inset: {
        "-1": "-0.25rem",
        "-2": "-0.5rem",
      },
      fontFamily: {
        sans: ["QuickSand", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        customgreen: {
          DEFAULT: "#D7F89F",
          light: "#D1D5DB",
          dark: "#77B310",
        },
        custompurple: {
          DEFAULT: "#7045AF",
          dark: "#6239A1",
          sidebar: "#7045AF",
        },
        customyellow: {
          DEFAULT: "#FFF6A4",
          light: "#FFFBD2",
          dark: "#ECD92F",
        },
        customred: {
          light: "#E06AA6",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
};
