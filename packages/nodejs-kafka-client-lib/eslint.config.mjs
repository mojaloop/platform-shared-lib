import baseConfig from "../../eslint.config.mjs";

export default [
    ...baseConfig,
    {
        rules: {
            "@typescript-eslint/no-unused-expressions": "off"
        }
    }
];