import { Platform } from 'react-native';

export const orientations = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
};

/* Platform */
export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
