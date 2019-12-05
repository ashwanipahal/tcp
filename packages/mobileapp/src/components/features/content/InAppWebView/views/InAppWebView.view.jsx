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
   * To Hide the header,footer and continue shopping button in case of help center and static page.
   */
  hideWebViewHeaderFooter = () => {
    return `document.querySelector('.header-global').style.display = 'none';
    document.querySelector('.footer-global').style.display = 'none';
    const helpCenter = document.querySelector('.help-center-back');
    if(helpCenter){
      helpCenter.style.display = 'none';
    }
    `;
  };

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
    } else if (
      url &&
      (url.includes(URL_PATTERN.PRODUCT_LIST) ||
        url.includes(URL_PATTERN.CATEGORY_LANDING) ||
        url.includes(URL_PATTERN.OUTFIT_DETAILS))
    ) {
      this.removeLastNavStack();
      const cmsValidatedUrl = configureInternalNavigationFromCMSUrl(url);
      navigateToPage(cmsValidatedUrl, navigation);
    } else if (url && url.includes('/account')) {
      this.removeLastNavStack();
      navigation.navigate(url);
    }
  };

  render() {
    const { pageUrl } = this.props;
    const webViewProps = {
      onMessage: this.handleWebViewEvents,
      javaScriptEnabled: true,
      injectedJavaScript: this.hideWebViewHeaderFooter(),
      source: { uri: pageUrl },
    };
    return (
      <View height={getScreenHeight() + 100}>
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
