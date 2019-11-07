import React from 'react';
import { PropTypes } from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { View, WebView, Platform } from 'react-native';

class PayPalButton extends React.PureComponent {
  state = { showAsModal: false };

  handleWebViewEvents = event => {
    const {
      payPalWebViewHandle,
      paypalAuthorizationHandle,
      clearPaypalSettings,
      navigation,
      setVenmoState,
      closeModal,
    } = this.props;

    switch (event.nativeEvent.data) {
      case 'payment':
        payPalWebViewHandle(true);
        this.setState({ showAsModal: true });
        setVenmoState(false);
        break;
      case 'onAuthorize':
        paypalAuthorizationHandle({ navigation, navigationActions: NavigationActions });
        payPalWebViewHandle(false);
        this.setState({ showAsModal: false });
        setVenmoState(true);
        closeModal(true);
        break;
      case 'onCancel':
        clearPaypalSettings();
        setVenmoState(true);
        payPalWebViewHandle(false);
        this.setState({ showAsModal: false });
        break;
      default:
        payPalWebViewHandle(false);
        this.setState({ showAsModal: false });
        setVenmoState(true);
    }
  };

  render() {
    const { getPayPalSettings, paypalEnv, paypalStaticUrl } = this.props;

    let styles = {
      height: 42,
      width: 150,
      flex: 1,
      overflow:'hidden',
    };

    const { showAsModal } = this.state;
    if (showAsModal) {
      styles = {
        position: 'absolute',
        top: 12,
        width: '100%',
        height: 800,
        zIndex: 999,
        overflow:'hidden',
      };
    }
    let webURL = '';
    if (getPayPalSettings && getPayPalSettings.paypalInContextToken) {
      webURL = `${paypalStaticUrl}/static/paypal/index.html?key=${
        getPayPalSettings.paypalInContextToken
      }&paypalEnv=${paypalEnv}`;
    }

    return getPayPalSettings && getPayPalSettings.paypalInContextToken ? (
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
          onMessage={this.handleWebViewEvents}
        />
      </View>
    ) : null;
  }
}

PayPalButton.propTypes = {
  getPayPalSettings: PropTypes.shape({}).isRequired,
  payPalWebViewHandle: PropTypes.func.isRequired,
  paypalAuthorizationHandle: PropTypes.func.isRequired,
  clearPaypalSettings: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  paypalEnv: PropTypes.string.isRequired,
  setVenmoState: PropTypes.bool.isRequired,
  closeModal: PropTypes.bool.isRequired,
  paypalStaticUrl: PropTypes.string.isRequired,
};

export default PayPalButton;
