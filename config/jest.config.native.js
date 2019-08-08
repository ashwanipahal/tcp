module.exports = {
  rootDir: '../',
  preset: './packages/mobileapp/node_modules/react-native/jest-preset.js',
  verbose: true,
  roots: ['<rootDir>/packages/core', '<rootDir>/packages/mobileapp'],
  moduleDirectories: ['node_modules', './packages/mobileapp/node_modules'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    'styled-components':
      '<rootDir>/packages/mobileapp/node_modules/styled-components/native/dist/styled-components.native.cjs.js',
  },
  testMatch: [
    '**/core/**/__tests__/*-test.native.+(js|jsx)',
    '**/mobileapp/**/__tests__/*-test.+(js|jsx)',
  ],

  transform: {
    '^.+\\.jsx?$': '<rootDir>/packages/mobileapp/node_modules/react-native/jest/preprocessor.js',
  },
  setupFiles: ['<rootDir>/config/jest.setup.native.js'],
  collectCoverage: true,
  coverageDirectory: 'reports/mobile/coverage',
  collectCoverageFrom: [
    '**/core/**/*.native.js',
    '**/core/**/*.native.jsx',
    '**/core/**/*.app.js',
    '**/mobileapp/**/*.js',
    '**/mobileapp/**/*.jsx',
    '!**/*.style.js',
    '!**/*.style.native.js',
    '!**/*.constants.js',
    '!**/*.config.js',
    '!**/core/styles/**',
    '!**/*.actions.js',
    '!**/*.container.js',
    '!**/*.query.js',
    '!**/__mocks__/**',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'index.native.js',
    'index.js',
    'mock.js',
    '/flow-typed/',
    '/pages/',
    '/__mocks__/',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  coverageThreshold: {
    global: {
      statements: 61.5,
      branches: 43.5,
      functions: 53.5,
      lines: 69.5,
    },
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
