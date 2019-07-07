// eslint-disable-next-line import/no-unresolved
import { Linking, Alert } from 'react-native';

// eslint-disable-next-line flowtype/no-types-missing-file-annotation
const UrlHandler = (url: Props) => {
  const AlertBox = () => {
    Alert.alert('The is Wrong Url');
  };

  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      AlertBox();
    }
  });
};

export default UrlHandler;
