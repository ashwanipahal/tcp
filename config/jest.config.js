module.exports = {
  verbose: true,
  rootDir: '../',
  roots: ['<rootDir>/packages'],
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
  coverageDirectory: 'reports/coverage',
  collectCoverageFrom: ['**/*.js', '**/*.jsx', '!**/*.style.js'],
  coveragePathIgnorePatterns: ['/node_modules/', 'enzyme.js', 'index.js'],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
};
