const baseConfig = require("../../eslint.config.js");

module.exports = [
    ...baseConfig,
    {
        rules: {
            "@typescript-eslint/no-unused-expressions": "off"
        }
    }
];