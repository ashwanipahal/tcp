const ignorePsuedoCodeDir = [
  '/ProductListingPage/',
  '/services/abstractors/CnC/AddedToBag.js',
  '/plpDeltaSync/',
  '/LoginPage/',
  '/server/',
  '/service/',
];

module.exports = {
  verbose: true,
  rootDir: '../',
  roots: ['<rootDir>/packages/web', '<rootDir>/packages/core'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', './packages/web/node_modules'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testMatch: ['**/__tests__/*-test.+(js|jsx)', '**/*.test.+(js|jsx)'],
  globals: {
    'babel-jest': {
      extends: './babel.config.js',
    },
  },
  setupFiles: ['<rootDir>/config/jest.setup.js'],
  collectCoverage: true,
  coverageDirectory: 'reports/web/coverage',
  collectCoverageFrom: [
    '**/*.js',
    '**/*.jsx',
    '!**/*.style.js',
    '!**/*.style.native.js',
    '!**/*.constants.js',
    '!**/*.config.js',
    '!**/core/styles/**',
    '!**/*.actions.js',
    '!**/*.container.js',
    '!**/*.query.js',
    '!**/__mocks__/**',
    '!**/*.native.js',
    '!**/*.native.jsx',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'enzyme.js',
    'index.js',
    'mock.js',
    '/flow-typed/',
    '/pages/',
    '/*.app.js',
    ...ignorePsuedoCodeDir,
  ],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  coverageThreshold: {
    global: {
      statements: 66,
      branches: 51,
      functions: 57,
      lines: 66,
    },
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
