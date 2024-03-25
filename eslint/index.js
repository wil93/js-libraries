import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

import react from "eslint-plugin-react/configs/jsx-runtime.js";
import ts from "typescript-eslint";
import unicorn from "eslint-plugin-unicorn";

import globals from "globals";

const compat = new FlatCompat();

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  react,
  unicorn.configs["flat/recommended"],
  ...compat.extends("plugin:react-hooks/recommended"),
  ...compat.extends("plugin:tailwindcss/recommended"),
  {
    ignores: ["dist/*", "out/*"],
    settings: {
      react: {
        version: "18",
      },
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      quotes: "off",
      semi: "off",
      "linebreak-style": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "unicorn/no-nested-ternary": "off",
      "unicorn/no-null": "off",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/switch-case-braces": "off",
      "unicorn/catch-error-name": ["error", { name: "err" }],
      "no-duplicate-imports": "warn",
      "no-restricted-imports": ["warn", { patterns: ["../*"] }],
    },
  },
);
