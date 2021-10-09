// eslint-disable-next-line
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],

  rules: {
    "no-undef": "off",
    "no-use-before-define": "off",
    "arrow-parens": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    indent: "off",
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "object-curly-newline": "off",
    "operator-linebreak": "off",
    "implicit-arrow-linebreak": "off",
  },
};
