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

  console.log = ReactotronConfig.log;
  ReactotronConfig.clear();
}

export default ReactotronConfig;
