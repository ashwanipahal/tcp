module.exports = {
  dependencies: {
    'react-native-code-push': {
      platforms: {
        android: null, // disable Android platform, other platforms will still autolink if provided
      },
    },
    'react-native-permissions': {
      platforms: {
        ios: null,
      },
    },
  },
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./assets/fonts'], // stays the same
};
