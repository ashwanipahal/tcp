module.exports = {
  verbose: true,
  rootDir: '../',
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/packages'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testMatch: ['**/__tests__/*.+(js|jsx)', '**/*.test.+(js|jsx)'],
  globals: {
    'babel-jest': {
      extends: './babel.config.js',
    },
  },
  coveragePathIgnorePatterns: ['/node_modules/', 'enzyme.js'],
  setupFiles: ['<rootDir>/config/jest.setup.js'],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
};
