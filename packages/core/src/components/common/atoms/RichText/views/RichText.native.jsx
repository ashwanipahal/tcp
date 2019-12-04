import React, { PureComponent } from 'react';
import { WebView } from 'react-native-webview';
import { Dimensions, View } from 'react-native';
import { RenderTree } from '@fabulas/astly';
import { PropTypes } from 'prop-types';

/**
 * @param {object} props : Props for RichText
 * @desc This is a RichText component.
 * 1. Loads static HTML or a URI (with optional headers) in the WebView.
 * Note that static HTML will require setting originWhitelist to ["*"]
 */

class RichText extends PureComponent {
  /*
  commenting this now as now RenderTree is able to handle these
  renderImage = ({ style, source, ...otherProps }) => {
    const url = typeof source === 'object' ? source.uri : source;
    return <Image url={url} {...otherProps} />;
  };

  renderText = ({ style, children }) => <Text style={{ ...style }}>{children}</Text>;

  renderAnchor = ({ style, children }) => {
    const { actionHandler } = this.props;
    const actionProps = children[0].props;
    return (
      <Text
        style={{ ...style }}
        onPress={() =>
          actionHandler(actionProps.href, actionProps.target, actionProps['data-target'])
        }
      >
        {children}
      </Text>
    );
  };
  */

  renderWebView = () => {
    const {
      javaScriptEnabled,
      domStorageEnabled,
      thirdPartyCookiesEnabled,
      isApplyDeviceHeight,
      source,
      ...others
    } = this.props;
    const screenHeight = Math.round(Dimensions.get('window').height);
    const style = { backgroundColor: 'transparent' };
    const styleWithHeight = { backgroundColor: 'transparent', height: screenHeight };
    const { html } = source;
    return (
      <WebView
        style={isApplyDeviceHeight ? styleWithHeight : style}
        originWhitelist={['*']}
        javaScriptEnabled={javaScriptEnabled}
        domStorageEnabled={domStorageEnabled}
        thirdPartyCookiesEnabled={thirdPartyCookiesEnabled}
        source={{
          html: `<html><head><meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'> </head><body>${html}</body></html>`,
        }}
        {...others}
      />
    );
  };

  handleNativeNavigation = node => {
    const { actionHandler } = this.props;
    if (node.properties) {
      const { href, target, dataTarget } = node.properties;
      actionHandler(href, target, dataTarget);
    }
  };

  renderNativeView = () => {
    const { source } = this.props;
    return (
      <View>
        <RenderTree
          tree={`<div>${source}</div>`}
          tools={{ navigate: this.handleNativeNavigation }}
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
};

RichText.defaultProps = {
  isNativeView: false,
  source: '',
  javaScriptEnabled: false,
  domStorageEnabled: false,
  thirdPartyCookiesEnabled: false,
  isApplyDeviceHeight: false,
  actionHandler: () => {},
};

export default RichText;
