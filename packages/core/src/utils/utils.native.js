import { Dimensions, Linking } from 'react-native';

export const importGraphQLClientDynamically = module => {
  return new Promise((resolve, reject) => {
    switch (module) {
      case 'graphQL':
        // eslint-disable-next-line global-require
        resolve(require('../services/handler/graphQL'));
        break;
      default:
        reject();
        break;
    }
  });
};

export const importGraphQLQueriesDynamically = query => {
  return new Promise((resolve, reject) => {
    switch (query) {
      case 'footer':
        // eslint-disable-next-line global-require
        resolve(require('../services/handler/graphQL/queries/footer'));
        break;
      case 'header':
        // eslint-disable-next-line global-require
        resolve(require('../services/handler/graphQL/queries/header'));
        break;
      case 'layout':
        // eslint-disable-next-line global-require
        resolve(require('../services/handler/graphQL/queries/layout'));
        break;
      case 'labels':
        // eslint-disable-next-line global-require
        resolve(require('../services/handler/graphQL/queries/labels'));
        break;
      case 'moduleD':
        // eslint-disable-next-line global-require
        resolve(require('../services/handler/graphQL/queries/moduleD'));
        break;
      case 'moduleH':
        // eslint-disable-next-line global-require
        resolve(require('../services/handler/graphQL/queries/moduleH'));
        break;
      default:
        reject();
        break;
    }
  });
};

export const UrlHandler = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    }
  });
};

/**
 * @function getScreenWidth function returns screen width.
 * @return {number} function returns width of device vieport.
 */
export const getScreenWidth = () => {
  return parseInt(Dimensions.get('screen').width, 10);
};
