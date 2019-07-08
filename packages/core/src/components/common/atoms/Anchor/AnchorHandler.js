// eslint-disable-next-line import/no-unresolved
import { Linking } from 'react-native';

// eslint-disable-next-line flowtype/no-types-missing-file-annotation
const UrlHandler = (url: Props) => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    }
  });
};

export default UrlHandler;
