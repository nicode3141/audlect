import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

import storybook from "eslint-plugin-storybook";
import tseslint from "typescript-eslint";
import js from "@eslint/js";

// @ts-ignore
import drizzle from "eslint-plugin-drizzle";

// @ts-ignore
import svgJsx from "eslint-plugin-svg-jsx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
});

export default tseslint.config(
	{
		ignores: [".next", ".temp", "dist", "build", "node_modules"],
	},

	...compat.extends("next/core-web-vitals"),

	{
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
				{
					prefer: "type-imports",
					fixStyle: "inline-type-imports",
				},
			],

			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
				},
			],

			"@typescript-eslint/require-await": "off",

			"@typescript-eslint/no-misused-promises": [
				"error",
				{
					checksVoidReturn: {
						attributes: false,
					},
				},
			],

			"drizzle/enforce-delete-with-where": [
				"error",
				{
					drizzleObjectName: ["db", "ctx.db"],
				},
			],

			"drizzle/enforce-update-with-where": [
				"error",
				{
					drizzleObjectName: ["db", "ctx.db"],
				},
			],

			"svg-jsx/camel-case-dash": "error",
			"svg-jsx/camel-case-colon": "error",
			"svg-jsx/no-style-string": "error",
		},
	},

	{
		linterOptions: {
			reportUnusedDisableDirectives: true,
		},

		languageOptions: {
			parserOptions: {
				projectService: true,
			},
		},
	},

	storybook.configs["flat/recommended"],
);
