import React from 'react';
import { PropTypes } from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { View, WebView, Platform, KeyboardAvoidingView } from 'react-native';
import { getScreenHeight } from '@tcp/core/src/utils';
import CONSTANTS from '../../../../../../Checkout/Checkout.constants';

const containerStyle = { flex: 1 };
let styles = {
  height: 42,
  width: 340,
  flex: 1,
  overflow: 'hidden',
};

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

  dynamicWebUrl = () => {
    const { getPayPalSettings, paypalEnv, paypalStaticUrl, isBillingPage } = this.props;
    let webURL = '';
    const paypalColor = isBillingPage
      ? CONSTANTS.PAYPAL_CTA_COLOR.BLUE
      : CONSTANTS.PAYPAL_CTA_COLOR.DEFAULT;
    if (getPayPalSettings && getPayPalSettings.paypalInContextToken) {
      webURL = `${paypalStaticUrl}/static/paypal/index.html?key=${
        getPayPalSettings.paypalInContextToken
      }&paypalEnv=${paypalEnv}&paypalColor=${paypalColor}`;
    }
    return webURL;
  };

  render() {
    const { getPayPalSettings, top } = this.props;

    const { showAsModal } = this.state;
    if (showAsModal) {
      const isIOS = Platform.OS === 'ios';
      const screenHeight = getScreenHeight();
      styles = {
        position: 'absolute',
        top: isIOS && top ? top : 0,
        width: '100%',
        height: isIOS ? screenHeight - top : screenHeight,
        zIndex: 999,
        overflow: 'hidden',
      };
    }

    const webURL = this.dynamicWebUrl();
    return getPayPalSettings && getPayPalSettings.paypalInContextToken ? (
      <View style={{ ...styles }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={containerStyle}
        >
          <WebView
            scalesPageToFit={false}
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
            automaticallyAdjustContentInsets={false}
          />
        </KeyboardAvoidingView>
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
  top: PropTypes.number,
  isBillingPage: PropTypes.bool.isRequired,
};

PayPalButton.defaultProps = {
  top: 0,
};

export default PayPalButton;
