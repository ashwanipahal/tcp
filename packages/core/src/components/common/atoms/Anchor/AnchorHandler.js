//@flow
import React from 'react';
import { Linking, Alert } from 'react-native';

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
