module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["prettier", "@typescript-eslint", "fp"],
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "plugin:fp/recommended",
  ],
  rules: {
    "fp/no-mutation": [
      "error",
      {
        commonjs: true,
        allowThis: true,
      },
    ],
    "fp/no-let": "error",
  },
};
