module.exports = {
  verbose: true,
  clearMocks: true,
  coverageDirectory: 'coverage',
  roots: ['<rootDir>packages'],
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
  setupTestFrameworkScriptFile: '<rootDir>/enzyme.js',
  setupFiles: ['./test-setup.js'],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/mocks.js',
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/mocks.js',
  },
};
