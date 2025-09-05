/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const prettierConfig = {
  plugins: ["prettier-plugin-tailwindcss"],
  tabWidth: 4,
  useTabs: true,
  semi: true,
  singleQuote: true,
  trailingComma: "all",
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
