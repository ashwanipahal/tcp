import { isMobileApp } from '../../../../utils';

let keychainWrapper;
const checkApp = isMobileApp();
if (checkApp) {
  keychainWrapper = require('../LoginPage/container/loginUtils/keychain.utils');
}

const keychainInfo = keychainWrapper;

export default keychainInfo;
