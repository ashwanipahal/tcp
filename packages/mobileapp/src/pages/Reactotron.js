import Reactotron, { asyncStorage, openInEditor, networking } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import { AsyncStorage } from '@react-native-community/async-storage';
import sagaPlugin from 'reactotron-redux-saga';
import { name } from '../../app.json';

Reactotron.setAsyncStorageHandler(AsyncStorage);
Reactotron.configure({
  name,
});
Reactotron.useReactNative();
Reactotron.use(asyncStorage());
Reactotron.use(reactotronRedux());
Reactotron.use(networking());
Reactotron.use(openInEditor());
Reactotron.use(sagaPlugin());

if (__DEV__) {
  Reactotron.connect();
  Reactotron.clear();
}

console.tron = Reactotron;

export default Reactotron;
