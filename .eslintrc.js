module.exports = {
  extends: ["airbnb", "prettier"],
  env: {
    browser: true,
    "jest/globals": true
  },
  plugins: ["jest", "prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "implicit-arrow-linebreak": "off",
    "arrow-body-style": "off",
    "no-console": "off"
  }
};
