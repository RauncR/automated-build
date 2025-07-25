import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";

export default [
  // Ignore files/folders just like .eslintignore
  {
    ignores: ["node_modules/**", "dist/**", "build/**", "public/**"],
  },

  // Main linting config for JS and JSX files
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      // Customize any rules here
      "react/react-in-jsx-scope": "off", // React 17+ doesn’t require React import in scope
    },
    settings: {
      react: {
        version: "detect", // auto-detect React version for plugin-react
      },
    },
    // Spread recommended configs from eslint core and react plugin
    ...js.configs.recommended,
    ...pluginReact.configs.flat.recommended,
  },
];
