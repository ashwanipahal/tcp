module.exports = {
  dependencies: {
    'react-native-code-push': {
      platforms: {
        android: null, // disable Android platform, other platforms will still autolink if provided
      },
    },
    // appcenter: {
    //   platforms: {
    //     android: null, // disable Android platform, other platforms will still autolink if provided
    //   },
    // },
    // 'appcenter-analytics': {
    //   platforms: {
    //     android: null, // disable Android platform, other platforms will still autolink if provided
    //   },
    // },
    // 'appcenter-crashes': {
    //   platforms: {
    //     android: null, // disable Android platform, other platforms will still autolink if provided
    //   },
    // },
  },
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./assets/fonts'], // stays the same
};
