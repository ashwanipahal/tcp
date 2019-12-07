/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View } from 'react-native';
import {
  getScreenHeight,
  configureInternalNavigationFromCMSUrl,
  getAPIConfig,
} from '@tcp/core/src/utils';
import { navigateToPage } from '@tcp/core/src/utils/index.native';
import { WebView } from 'react-native-webview';
import config from '@tcp/core/src/components/common/atoms/Anchor/config.native';
import { StackActions } from 'react-navigation';
import { MobileChannel } from '@tcp/core/src/services/api.constants';

class InAppWebView extends React.Component {
  /**
   * This will be used to update the url when only the base path is given
   * @param {*} url
   */

  updateUrl = url => {
    const { webAppDomain, siteId } = getAPIConfig();
    let URL = url;
    // url path transformation in case of absolute image URL
    if (/^http/.test(url)) {
      URL = url && url.replace(/^\//, '');
    } else {
      // url path transformation in case of relative image URL
      URL = `${webAppDomain}/${siteId}${url}`;
    }
    return URL;
  };

  /**
   * To remove the last stack from the navigation when user is redirected to home or plp,pdp
   * this will open the account page again not the web view.
   */
  removeLastNavStack = () => {
    const { navigation } = this.props;
    const popAction = StackActions.pop({
      n: 1,
    });
    navigation.dispatch(popAction);
  };

  /**
   * To capture the postmessages for web view.
   */

  handleWebViewEvents = event => {
    const url = event.nativeEvent.data;
    const { navigation } = this.props;
    const { URL_PATTERN } = config;
    if (url && url.includes('home')) {
      this.removeLastNavStack();
      navigation.navigate('Home');
    } else if (url && url.includes('/account')) {
      this.removeLastNavStack();
    } else if (
      url &&
      (url.includes(URL_PATTERN.PRODUCT_LIST) ||
        url.includes(URL_PATTERN.CATEGORY_LANDING) ||
        url.includes(URL_PATTERN.OUTFIT_DETAILS))
    ) {
      this.removeLastNavStack();
      const cmsValidatedUrl = configureInternalNavigationFromCMSUrl(url);
      navigateToPage(cmsValidatedUrl, navigation);
    }
  };

  render() {
    const {
      pageUrl,
      javaScriptEnabled,
      domStorageEnabled,
      thirdPartyCookiesEnabled,
      isApplyDeviceHeight,
    } = this.props;
    console.log(pageUrl);

    console.log(getAPIConfig());
    const screenHeight = Math.round(Dimensions.get('window').height);
    const style = { backgroundColor: 'transparent' };
    const styleWithHeight = { backgroundColor: 'transparent', height: screenHeight };
    return (
      <View height={getScreenHeight() - 150}>
        <WebView
          style={isApplyDeviceHeight ? styleWithHeight : style}
          originWhitelist={['*']}
          javaScriptEnabled={javaScriptEnabled}
          domStorageEnabled={domStorageEnabled}
          thirdPartyCookiesEnabled={thirdPartyCookiesEnabled}
          source={{ uri: this.updateUrl(pageUrl), headers: { 'x-tcp-device': MobileChannel } }}
          onMessage={this.handleWebViewEvents}
        />
      </View>
    );
  }
}

InAppWebView.propTypes = {
  navigation: PropTypes.func,
  pageUrl: PropTypes.string,
  javaScriptEnabled: PropTypes.bool,
  domStorageEnabled: PropTypes.bool,
  thirdPartyCookiesEnabled: PropTypes.bool,
  isApplyDeviceHeight: PropTypes.bool,
};

InAppWebView.defaultProps = {
  navigation: null,
  pageUrl: '',
  javaScriptEnabled: true,
  domStorageEnabled: false,
  thirdPartyCookiesEnabled: false,
  isApplyDeviceHeight: false,
};

export default InAppWebView;
