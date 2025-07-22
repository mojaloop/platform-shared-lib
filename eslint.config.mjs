import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config(
    {
        ignores: [
            "**/*.d.ts",
            "**/*.js.map",
            "**/dist/**",
            "**/node_modules/**",
            "**/coverage/**"
        ]
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,
                ...globals.es2021
            },
            parser: tseslint.parser,
            parserOptions: {
                project: true,
                tsconfigRootDir: __dirname
            }
        },
        plugins: {
            "@typescript-eslint": tseslint.plugin
        },
        rules: {
            "brace-style": ["error", "1tbs"],
            "semi": ["error"],
            "quotes": ["error", "double", { "allowTemplateLiterals": false }],
            "@typescript-eslint/no-inferrable-types": "off",
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    "selector": "memberLike",
                    "modifiers": [
                        "private",
                        "protected"
                    ],
                    "format": [
                        "camelCase"
                    ],
                    "leadingUnderscore": "require"
                }
            ],
            "@typescript-eslint/no-unused-vars": ["warn"],
            "@typescript-eslint/no-explicit-any": ["warn"]
        }
    },
    {
        files: ["test/**/*.ts"],
        rules: {
            "@typescript-eslint/explicit-function-return-type": "off"
        }
    }
);