import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { getScreenHeight, configureInternalNavigationFromCMSUrl } from '@tcp/core/src/utils';
import { navigateToPage } from '@tcp/core/src/utils/index.native';
import { RichText } from '@tcp/core/src/components/common/atoms';
import config from '@tcp/core/src/components/common/atoms/Anchor/config.native';
import { StackActions } from 'react-navigation';

class InAppWebView extends React.Component {
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
    const { pageUrl } = this.props;
    const webViewProps = {
      javaScriptEnabled: true,
      onMessage: this.handleWebViewEvents,
      source: { uri: pageUrl },
    };
    return (
      <View height={getScreenHeight() - 150}>
        {pageUrl ? <RichText {...webViewProps} /> : null}
      </View>
    );
  }
}

InAppWebView.propTypes = {
  navigation: PropTypes.func,
  pageUrl: PropTypes.string,
};

InAppWebView.defaultProps = {
  navigation: null,
  pageUrl: '',
};

export default InAppWebView;
