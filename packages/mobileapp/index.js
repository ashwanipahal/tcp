/**
 * @format
 */

import { AppRegistry } from 'react-native';
import MobileApp from './src/pages/_app';
import { name as appName } from './app.json';
import codePush from 'react-native-code-push';

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

AppRegistry.registerComponent(appName, () => MobileApp);

// eslint-disable-next-line
console.disableYellowBox = true;
