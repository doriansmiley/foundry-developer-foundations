export default {
  displayName: 'x-reason',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        useESM: true,
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/x-reason',
  transformIgnorePatterns: ['/node_modules/(?!(?:@osdk|@codestrap)/)'],
  extensionsToTreatAsEsm: ['.ts'],
  testPathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: {
    // Strip `.js` from your TS imports so ESM paths resolve
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@osdk/shared\\.client$':
      '<rootDir>/../../node_modules/@osdk/shared.client/index.js',
    '^@osdk/shared\\.client2$':
      '<rootDir>/../../node_modules/@osdk/shared.client2/index.js',
  },
};
