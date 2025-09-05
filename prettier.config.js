/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const prettierConfig = {
  plugins: ["prettier-plugin-tailwindcss"],
  tabWidth: 4,
  useTabs: true,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 120,
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
      options: {
        tabWidth: 2,
      },
    },
  ],
};

export default prettierConfig;
