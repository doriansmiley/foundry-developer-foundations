const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const globals = require("globals");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const _import = require("eslint-plugin-import");

const {
    fixupPluginRules,
    fixupConfigRules,
} = require("@eslint/compat");

const tsParser = require("@typescript-eslint/parser");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 11,
        sourceType: "module",

        parserOptions: {
            project: ["./tsconfig.json"],
        },
    },

    plugins: {
        import: fixupPluginRules(_import),
    },

    settings: {
        "import/resolver": {
            typescript: {
                project: "./tsconfig.json",
                alwaysTryTypes: true           // resolves @types packages
            }
        }
    },

    extends: fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
    )),

    rules: {
        "no-unused-vars": "off",
        "no-redeclare": "off",
        "no-undef": "off",
        "no-case-declarations": "off",
        "@typescript-eslint/no-explicit-any": "off",
        '@typescript-eslint/no-unsafe-function-type': 'off',
    },
}, globalIgnores(["**/dist", "**/.eslintrc.cjs"])]);
