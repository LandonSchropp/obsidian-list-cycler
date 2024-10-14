import javascript from "@eslint/js";
import prettier from "eslint-config-prettier";
import globals from "globals";
import typescript from "typescript-eslint";

export default [
  {
    ignores: ["main.js"],
  },
  javascript.configs.recommended,
  ...typescript.configs.recommended,
  prettier,
  {
    files: ["**/*.{js,ts,cjs,mjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
