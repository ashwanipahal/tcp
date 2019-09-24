/** @module resourceLoader
 * @summary provides convenience methods for loading url and file resources.
 *
 * Currently a simple loader based on little-loader, with very little intelligence.
 *
 * Author Ben
 */

import scriptLoad from 'little-loader';
import { getAPIConfig } from './utils';

const getNamedModulesMap = apiConfig => {
  // TODO: load this from a JSON file
  return {
    'google.maps': {
      url: `https://maps.googleapis.com/maps/api/js?v=3.27&key=${
        apiConfig.googleApiKey
      }&libraries=places,geometry`,
      loadPromise: null,
    },
    recaptcha: {
      url: 'https://www.google.com/recaptcha/api.js',
      loadPromise: null,
    },
    paypal: {
      url: 'https://www.paypalobjects.com/api/checkout.js',
      loadPromise: null,
    },

    jquery: {
      url:
        'https://www.childrensplace.com/wcsstore/GlobalSAS/javascript/tcp/libs/jquery-1.11.3.min.js',
      loadPromise: null,
    },

    wallJs: {
      url: 'https://api.getcandid.com/scripts/wall.js',
      loadPromise: null,
    },

    getCandidIsotope: {
      url: 'https://api.getcandid.com/scripts/wall-isotope.js',
      loadPromise: null,
    },

    getCandid: {
      url: 'https://api.getcandid.com/scripts/widget.js',
      loadPromise: null,
    },
  };
};
export function requireUrlScript(url) {
  return new Promise((resolve, reject) => {
    scriptLoad(url, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function requireNamedOnlineModule(moduleName) {
  const apiConfig = getAPIConfig();
  const namedModulesMap = getNamedModulesMap(apiConfig);

  if (!namedModulesMap[moduleName].loadPromise) {
    namedModulesMap[moduleName].loadPromise = requireUrlScript(namedModulesMap[moduleName].url);
  }
  return namedModulesMap[moduleName].loadPromise;
}
