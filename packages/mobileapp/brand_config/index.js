/* eslint-disable */

import Config from 'react-native-config';
import gymboree from './gymboree/config';
import main from './main/config';

const brandConfigs = {
  main,
  gymboree,
};

export default { ...brandConfigs[Config.APP_PIN], ...Config };

