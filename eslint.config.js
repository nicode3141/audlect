// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
// @ts-ignore -- no types for this plugin
import drizzle from "eslint-plugin-drizzle";
// @ts-ignore -- no types for this plugin
import svgJsx from "eslint-plugin-svg-jsx";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default tseslint.config({
  ignores: [".next"],
}, ...compat.extends("next/core-web-vitals"), {
  files: ["**/*.ts", "**/*.tsx"],
  plugins: {
    drizzle,
    "svg-jsx": svgJsx,
  },
  extends: [
    ...tseslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  rules: {
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { prefer: "type-imports", fixStyle: "inline-type-imports" },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: { attributes: false } },
    ],
    "drizzle/enforce-delete-with-where": [
      "error",
      { drizzleObjectName: ["db", "ctx.db"] },
    ],
    "drizzle/enforce-update-with-where": [
      "error",
      { drizzleObjectName: ["db", "ctx.db"] },
    ],
    'svg-jsx/camel-case-dash': 'error',
    'svg-jsx/camel-case-colon': 'error',
    'svg-jsx/no-style-string': 'error',
  },
}, {
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
  languageOptions: {
    parserOptions: {
      projectService: true,
    },
  },
}, storybook.configs["flat/recommended"]);
