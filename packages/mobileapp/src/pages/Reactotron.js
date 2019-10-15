import Reactotron, {
  asyncStorage,
  openInEditor,
  networking,
  trackGlobalErrors,
} from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

// eslint-disable-next-line
let ReactotronConfig = null;
if (__DEV__) {
  ReactotronConfig = Reactotron.configure({ name: 'TCP' })
    .use(networking())
    .use(reactotronRedux())
    .use(asyncStorage())
    .use(openInEditor())
    .use(trackGlobalErrors())
    .useReactNative()
    .connect();

  // This will not block normal console.log. This can be use like console.tron.log('tcp')
  console.log = ReactotronConfig.log;
  ReactotronConfig.clear();
}

export default ReactotronConfig;
