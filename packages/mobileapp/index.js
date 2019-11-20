/**
 * @format
 */

import { AppRegistry } from 'react-native';
import MobileApp from './src/pages/_app';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => MobileApp);

// eslint-disable-next-line
console.disableYellowBox = true;
