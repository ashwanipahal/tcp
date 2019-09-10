const ignorePsuedoCodeDir = [
  '/ProductListing/',
  '/FulfillmentSection/',
  '/PickupStoreModal/',
  '/ProductDetail/',
  '/services/abstractors/productListing/',
  '/ProductListingPage/',
  '/AddressForm/',
  '/plpDeltaSync/',
  '/LoginPage/',
  '/server/',
  '/service/',
  '/FPO/',
  '/services/abstractors/CnC/Checkout.js',
  '/GoogleAutoSuggest/',
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
    '/*.app.jsx',
    ...ignorePsuedoCodeDir,
  ],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
