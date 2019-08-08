// eslint-disable-next-line import/no-unresolved
import * as Keychain from 'react-native-keychain';
// eslint-disable-next-line import/no-unresolved
import TouchID from 'react-native-touch-id';

export const setUserLoginDetails = (emailAddress, password) => {
  return Keychain.setGenericPassword(emailAddress, password);
};

export const getUserLoginDetails = () => {
  return Keychain.getGenericPassword();
};

export const resetTouchPassword = () => {
  return Keychain.resetGenericPassword();
};

export const touchIDCheck = () => {
  return TouchID.authenticate('Authentication Required')
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

export const isSupportedTouch = () => {
  return TouchID.isSupported()
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};
