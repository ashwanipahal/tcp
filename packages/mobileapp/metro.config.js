const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

const watchFolders = [path.join(__dirname, '/../core/'), path.join(__dirname, '/../web/')];

const extraNodeModules = new Proxy(
  /* First argument in Proxy constructor is passed as
   * "target" to the "get" method.
   * Put the names of the libraries included in your reusable
   * module as they would be imported when the module is actually used.
   */
  {
    '@tcp/core': path.join(__dirname, '/../core/'),
    '@tcp/web': path.join(__dirname, '/../web/'),
  },
  {
    get: (target, name) => {
      if (target.hasOwnProperty.call(name)) {
        return target[name];
      }
      return path.join(__dirname, `node_modules/${name}`);
    },
  }
);

module.exports = {
  resolver: {
    /* This configuration allows you to build React-Native modules and
     * test them without having to publish the module. Any exports provided
     * by your source should be added to the "target" parameter. Any import
     * not matched by a key in target will have to be located in the embedded
     * app's node_modules directory.
     */
    extraNodeModules,
    sourceExts: ['jsx', 'js', 'ts'],
    blacklistRE: blacklist([/node_modules\/.*\/node_modules\/react-native\/.*/]),
  },
  watchFolders,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
