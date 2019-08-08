// eslint-disable-next-line import/no-unresolved
import * as Keychain from 'react-native-keychain';
// eslint-disable-next-line import/no-unresolved
import TouchID from 'react-native-touch-id';

export const setUserUserPassword = (emailAddress, password) => {
  return Keychain.setGenericPassword(emailAddress, password);
};

export const getUserUserPassword = () => {
  return Keychain.getGenericPassword();
};

export const resetTouchPassword = () => {
  return Keychain.resetGenericPassword();
};

export const touchIDCheck = () => {
  return TouchID.authenticate('Authentication Required')
    .then(success => {
      return true;
    })
    .catch(error => {
      return false;
    });
};

export const isSupportedTouch = () => {
  return TouchID.isSupported;
};
