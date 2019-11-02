import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { View, WebView, Platform } from 'react-native';

const PayPalButton = props => {
  const {
    getPayPalSettings,
    payPalWebViewHandle,
    paypalAuthorizationHandle,
    clearPaypalSettings,
    navigation,
    paypalEnv,
    setVenmoState,
    closeModal,
    paypalStaticUrl,
  } = props;

  const [showAsModal, setAsModal] = useState(false);
  const handleWebViewEvents = event => {
    switch (event.nativeEvent.data) {
      case 'payment':
        payPalWebViewHandle(true);
        setAsModal(true);
        setVenmoState(false);
        break;
      case 'onAuthorize':
        paypalAuthorizationHandle({ navigation, navigationActions: NavigationActions });
        payPalWebViewHandle(false);
        setAsModal(false);
        setVenmoState(true);
        closeModal(true);
        break;
      case 'onCancel':
        clearPaypalSettings();
        setVenmoState(true);
        payPalWebViewHandle(false);
        setAsModal(false);
        break;
      default:
        payPalWebViewHandle(false);
        setAsModal(false);
        setVenmoState(true);
    }
  };

  let styles = {
    height: 42,
    width: 150,
    flex: 1,
  };

  if (showAsModal) {
    styles = {
      position: 'absolute',
      top: 12,
      width: '100%',
      height: 800,
      zIndex: 999,
    };
  }

  const webURL = `${paypalStaticUrl}/static/paypal/index.html?key=${
    getPayPalSettings.paypalInContextToken
  }&paypalEnv=${paypalEnv}`;
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
  paypalAuthorizationHandle: PropTypes.func.isRequired,
  clearPaypalSettings: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  paypalEnv: PropTypes.string.isRequired,
  setVenmoState: PropTypes.bool,
  closeModal: PropTypes.bool,
  paypalStaticUrl: PropTypes.string.isRequired,
};

export default PayPalButton;
