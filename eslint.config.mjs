import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import importPlugin from "eslint-plugin-import";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    ignores: ["dist/", "node_modules/", "*.d.ts", "**/*.config.*"],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],

  eslintPluginPrettierRecommended,

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "import/no-unresolved": "off",
      "import/named": "off",
      "import/no-duplicates": "error",
      "import/newline-after-import": "error",

      "no-console": "warn",
      "no-debugger": "warn",
      "no-var": "error",
      "prefer-const": "error",
      "no-undef": "off",
      "no-unused-vars": "off",
    },
  },

  {
    files: ["**/*.{ts,mts,cts}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },

  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        ecmaFeatures: { jsx: false },
      },
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/component-definition-name-casing": ["error", "PascalCase"],
      "vue/prop-name-casing": ["error", "camelCase"],
      "vue/no-mutating-props": "error",
      "vue/no-unused-components": "warn",
      "vue/no-unused-vars": "error",
      "vue/max-attributes-per-line": "off",
    },
  },
];
