import {Platform, Dimensions, NativeModules, I18nManager} from 'react-native';

const dimensionsScope = {
  WINDOW: 'window',
  SCREEN: 'screen',
};
export const orientations = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
};

/* Platform */
export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

const {height, width} = Dimensions.get(dimensionsScope.WINDOW);
