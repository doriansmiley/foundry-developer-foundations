export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',

    setupFiles: ['./jest.setup.js'],

    // Treat JS and TS as ESM
    extensionsToTreatAsEsm: ['.ts'],

    testPathIgnorePatterns: ['<rootDir>/dist/'],

    transform: {
        // Updated transform entry to include ts-jest options directly
        '^.+\\.[tj]sx?$': [
            'ts-jest', // Specify the transformer
            { // Include ts-jest config here
                tsconfig: 'tsconfig.json',
                useESM: true,
                isolatedModules: true,
            }
        ],
    },

    // Allow ts-jest to transform @osdk/* ESM modules
    transformIgnorePatterns: [
        '/node_modules/(?!(?:@osdk|@codestrap)/)',
    ],

    moduleNameMapper: {
        // Strip `.js` from your TS imports so ESM paths resolve
        '^(\\.{1,2}/.*)\\.js$': '$1',
        '^@xreason/(.*)$': '<rootDir>/src/$1',
        '^@osdk/shared\\.client$': '<rootDir>/node_modules/@osdk/shared.client/index.js',
        '^@osdk/shared\\.client2$': '<rootDir>/node_modules/@osdk/shared.client2/index.js',
    },

    testMatch: [
        "**/test/**/*.test.ts",
        "**/test/**/*.test.js"
    ],
};
