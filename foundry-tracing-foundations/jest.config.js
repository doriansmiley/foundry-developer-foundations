export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',

    // Treat JS and TS as ESM
    extensionsToTreatAsEsm: ['.ts'],

    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
            useESM: true,
        },
    },

    testMatch: [
        "**/test/**/*.test.ts",
        "**/test/**/*.test.js"
    ],

    transform: {
        '^.+\\.[tj]sx?$': 'ts-jest',
        '^.+\\.js$': 'ts-jest',
    },

    // Allow ts-jest to transform @osdk/* ESM modules
    transformIgnorePatterns: [
        'node_modules/(?!(?:@osdk)/)',
    ],

    moduleNameMapper: {
        // Strip `.js` from your TS imports so ESM paths resolve
        '^(\\.{1,2}/.*)\\.js$': '$1',
        '^@tracing/(.*)$': '<rootDir>/src/$1',
    },
};
