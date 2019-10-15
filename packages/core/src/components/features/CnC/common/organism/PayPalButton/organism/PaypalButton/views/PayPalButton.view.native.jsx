import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { View, WebView, Platform } from 'react-native';

const PayPalButton = props => {
  const { getPayPalSettings, payPalWebViewHandle } = props;
  const [showAsModal, setAsModal] = useState(false);
  const handleWebViewEvents = event => {
    switch (event.nativeEvent.data) {
      case 'payment':
        payPalWebViewHandle(true);
        setAsModal(true);
        break;
      default:
        payPalWebViewHandle(false);
        setAsModal(false);
    }
  };
  let styles = {
    height: 42,
    width: 150,
  };
  if (showAsModal) {
    styles = {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: 800,
      zIndex: 1,
    };
  }

  const webURL = `http://dev.childrensplace.com:3000/static/paypal/index.html?key=${
    getPayPalSettings.paypalInContextToken
  }`;

  return (
    <View style={{ ...styles }}>
      <WebView
        scalesPageToFit
        originWhitelist={['*']}
        source={{
          uri: webURL,
        }}
        mixedContentMode="always"
        useWebKit={Platform.OS === 'ios'}
        scrollEnabled
        domStorageEnabled
        thirdPartyCookiesEnabled
        startInLoadingState
        allowUniversalAccessFromFileURLs
        javaScriptEnabled
        onMessage={handleWebViewEvents}
      />
    </View>
  );
};

PayPalButton.propTypes = {
  getPayPalSettings: PropTypes.shape({}).isRequired,
  payPalWebViewHandle: PropTypes.func.isRequired,
};

export default PayPalButton;
