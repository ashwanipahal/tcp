const ignorePsuedoCodeDir = [
  '/ProductListing/',
  '/FulfillmentSection/',
  '/Recommendations/',
  '/PickupStoreModal/',
  '/StoreSummaryComponents/',
  '/ProductDetail/',
  '/SearchDetail/',
  '/OutfitDetails/',
  '/OutfitListing/',
  '/ProductPickup/',
  '/bopisInventory/',
  '/SearchBar/',
  '/services/abstractors/productListing/',
  '/services/abstractors/common/recommendations/',
  '/ProductListingPage/',
  '/AddressForm/',
  '/plpDeltaSync/',
  '/LoginPage/',
  '/server/',
  '/service/',
  '/FPO/',
  '/services/abstractors/CnC/Checkout.js',
  '/GoogleAutoSuggest/',
  '/utils/localStorageManagement.js',
  '/Favorites/',
  '/services/abstractors/account/ordersList', // TO DO - Furkan The story is in progress Excluding for now
  '/services/abstractors/common/searchBar/makeSearch.js',
  '/ModuleK/',
  '/formValidation/createValidateMethod.js',
  '/ExtraPoints/imageSourceMap.js',
  '/twitterDynamicAbstractor/',
  '/twitterLoginComponent/',
  '/twitterRedirectPage/',
  '/config/SEOTags.config.js',
  '/BundleProduct/',
  '/components/features/CnC/LoyaltyBanner/util', // TODO - Loyalty Banner Story In Progress -- Harmeet
  'components/features/CnC/LoyaltyBanner/container/LoyaltyBanner.selectors.js',
  '/QuickViewModal/',
  '/ProductColorChipSelector/views/',
  '/organisms/QuickViewModal/',
  '/ProductCustomizeForm/views/',
  '/ProductSizeSelector/',
  '/StyliticsProductTabList/',
  '/LabeledRadioButton/',
  '/ReactToolTip/',
  '/ModuleQ/',
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
    '!**/*.styles.js',
    '!**/*.styles.native.js',
    '!**/*.constants.js',
    '!**/*.config.js',
    '!**/config.js',
    '!**/core/styles/**',
    '!**/*.actions.js',
    '!**/*.container.js',
    '!**/*.container.native.js',
    '!**/*.container.native.jsx',
    '!**/*.container.jsx',
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
    '/stories/',
    '/*.stories.jsx',
    '/ModuleK/',
    ...ignorePsuedoCodeDir,
  ],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
