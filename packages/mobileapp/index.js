/**
 * @format
 */

import { AppRegistry } from 'react-native';
import MobileApp from './src/pages/_app';
import { name as appName } from './app.json';
import codePush from 'react-native-code-push';

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

AppRegistry.registerComponent(appName, () => codePush(codePushOptions)(MobileApp));

// eslint-disable-next-line
console.disableYellowBox = true;
