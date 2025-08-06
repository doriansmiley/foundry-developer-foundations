export default {
  displayName: 'foundry-tracing-foundations',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/foundry-tracing-foundations',

  transformIgnorePatterns: ['/node_modules/(?!(?:@osdk|@codestrap)/)'],
  extensionsToTreatAsEsm: ['.ts'],
  testPathIgnorePatterns: ['<rootDir>/dist/'],

  moduleNameMapper: {
    // Strip `.js` from your TS imports so ESM paths resolve
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@xreason/(.*)$': '<rootDir>/src/$1',
    '^@osdk/shared\\.client$':
      '<rootDir>/../../node_modules/@osdk/shared.client/index.js',
    '^@osdk/shared\\.client2$':
      '<rootDir>/../../node_modules/@osdk/shared.client2/index.js',
  },
};
