import React, { PureComponent } from 'react';
import { WebView } from 'react-native-webview';
import { Dimensions, View } from 'react-native';
import { RenderTree, ComponentMap } from '@fabulas/astly';
import { PropTypes } from 'prop-types';
import { MobileChannel } from '@tcp/core/src/services/api.constants';
import generateComponentMap from '../ComponentMap.native';

/**
 * @param {object} props : Props for RichText
 * @desc This is a RichText component.
 * 1. Loads static HTML or a URI (with optional headers) in the WebView.
 * Note that static HTML will require setting originWhitelist to ["*"]
 */

class RichText extends PureComponent {
  renderWebView = () => {
    const {
      javaScriptEnabled,
      domStorageEnabled,
      thirdPartyCookiesEnabled,
      isApplyDeviceHeight,
      source,
      onMessage,
      ...others
    } = this.props;
    const screenHeight = Math.round(Dimensions.get('window').height);
    const style = { backgroundColor: 'transparent' };
    const styleWithHeight = { backgroundColor: 'transparent', height: screenHeight };
    const { html, uri } = source;
    let webViewSource = { html };
    if (uri) {
      webViewSource = { uri, headers: { channel: MobileChannel } };
    }
    return (
      <WebView
        style={isApplyDeviceHeight ? styleWithHeight : style}
        originWhitelist={['*']}
        javaScriptEnabled={javaScriptEnabled}
        domStorageEnabled={domStorageEnabled}
        thirdPartyCookiesEnabled={thirdPartyCookiesEnabled}
        source={webViewSource}
        onMessage={onMessage}
        {...others}
      />
    );
  };

  handleNativeNavigation = node => {
    const { actionHandler } = this.props;
    if (node.properties && node.properties.dataTarget) {
      actionHandler(node.properties.dataTarget);
    }
  };

  renderNativeView = () => {
    const { source, navigation } = this.props;
    return (
      <View>
        <RenderTree
          tree={`<div>${source}</div>`}
          tools={{ navigate: this.handleNativeNavigation }}
          componentMap={{
            ...ComponentMap,
            ...generateComponentMap(navigation),
          }}
        />
      </View>
    );
  };

  render() {
    const { isNativeView } = this.props;
    return isNativeView ? this.renderNativeView() : this.renderWebView();
  }
}

RichText.propTypes = {
  isNativeView: PropTypes.bool,
  source: PropTypes.string,
  javaScriptEnabled: PropTypes.bool,
  domStorageEnabled: PropTypes.bool,
  thirdPartyCookiesEnabled: PropTypes.bool,
  isApplyDeviceHeight: PropTypes.bool,
  actionHandler: PropTypes.func,
  onMessage: PropTypes.func,
  navigation: PropTypes.shape({}).isRequired,
};

RichText.defaultProps = {
  isNativeView: false,
  source: '',
  javaScriptEnabled: false,
  domStorageEnabled: false,
  thirdPartyCookiesEnabled: false,
  isApplyDeviceHeight: false,
  actionHandler: () => {},
  onMessage: () => {},
};

export default RichText;
