import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import parser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin"; // Import the TypeScript plugin
import prettierPlugin from "eslint-plugin-prettier"; // Import the Prettier plugin
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import sonarjs from "eslint-plugin-sonarjs";
import security from "eslint-plugin-security";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),

  // Global configuration
  {
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      parser,
    },

    // Configure plugins
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
      sonarjs,
      "simple-import-sort": simpleImportSortPlugin,
      security,
    },

    // Your custom rules + manually added security rules
    rules: {
      "sonarjs/todo-tag": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // Manually added security rules (combining yours and the recommended set)
      "security/detect-object-injection": "error",
      "security/detect-non-literal-fs-filename": "error",
      "security/detect-possible-timing-attacks": "error",
      "security/detect-buffer-noassert": "error",
      "security/detect-child-process": "error",
      "security/detect-disable-mustache-escape": "error",
      "security/detect-eval-with-expression": "error",
      "security/detect-new-buffer": "error",
      "security/detect-no-csrf-before-method-override": "error",
      "security/detect-non-literal-regexp": "error",
      "security/detect-non-literal-require": "error",
      "security/detect-pseudoRandomBytes": "error",
      "security/detect-unsafe-regex": "error",

      // Manually add sonarjs rules
      "sonarjs/cognitive-complexity": "error",
      "sonarjs/no-identical-expressions": "error",
      "sonarjs/no-duplicate-string": "error",
      "sonarjs/no-redundant-boolean": "error",
      "sonarjs/no-small-switch": "error",
      "sonarjs/prefer-immediate-return": "error",
    },
  },
];

export default eslintConfig;
