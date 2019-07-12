module.exports = {
  rootDir: '../../',
  preset: './packages/mobileapp/node_modules/react-native/jest-preset.js',
  verbose: true,
  roots: ['<rootDir>/packages/core', '<rootDir>/packages/mobileapp'],
  moduleDirectories: ['node_modules', './packages/mobileapp/node_modules'],
  moduleFileExtensions: ['js', 'jsx'],
  testMatch: [
    '**/core/**/__tests__/*-test.native.+(js|jsx)',
    '**/mobileapp/**/__tests__/*-test.+(js|jsx)',
  ],

  transform: {
    '^.+\\.jsx?$': '<rootDir>/packages/mobileapp/node_modules/react-native/jest/preprocessor.js',
  },
  setupFiles: ['<rootDir>/config/app/mobile.setup.js'],
  collectCoverage: true,
  coverageDirectory: 'reports/mobile/coverage',
  collectCoverageFrom: [
    '**/core/**/*.native.js',
    '**/core/**/*.native.jsx',
    '**/mobileapp/**/*.js',
    '**/mobileapp/**/*.jsx',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', 'index.native.js', 'index.js'],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
