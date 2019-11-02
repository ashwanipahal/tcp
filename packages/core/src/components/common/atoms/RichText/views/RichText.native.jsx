import React, { PureComponent } from 'react';
import { WebView, Dimensions, View, Text } from 'react-native';
import { RenderTree, ComponentMap } from '@fabulas/astly';
import { PropTypes } from 'prop-types';

/**
 * @param {object} props : Props for RichText
 * @desc This is a RichText component.
 * 1. Loads static HTML or a URI (with optional headers) in the WebView.
 * Note that static HTML will require setting originWhitelist to ["*"]
 */

class RichText extends PureComponent {
  renderText = ({ style, children }) => <Text style={{ ...style }}>{children}</Text>;

  renderView = ({ children }) => <View>{children}</View>;

  renderWebView = () => {
    const {
      javaScriptEnabled,
      domStorageEnabled,
      thirdPartyCookiesEnabled,
      isApplyDeviceHeight,
    } = this.props;
    const screenHeight = Math.round(Dimensions.get('window').height);
    const style = { backgroundColor: 'transparent' };
    const styleWithHeight = { backgroundColor: 'transparent', height: screenHeight };

    return (
      <WebView
        style={isApplyDeviceHeight ? styleWithHeight : style}
        originWhitelist={['*']}
        javaScriptEnabled={javaScriptEnabled}
        domStorageEnabled={domStorageEnabled}
        thirdPartyCookiesEnabled={thirdPartyCookiesEnabled}
        {...this.props}
      />
    );
  };

  renderNativeView = () => {
    const { source, navigate } = this.props;
    return (
      <View>
        <RenderTree
          tree={`<div>${source}</div>`}
          tools={{ navigate }}
          componentMap={{
            ...ComponentMap,
            br: () => <Text> </Text>,
            p: props => this.renderText(props),
            b: props => this.renderText(props),
            div: props => this.renderView(props),
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
  navigate: PropTypes.func,
};

RichText.defaultProps = {
  isNativeView: false,
  source: '',
  javaScriptEnabled: false,
  domStorageEnabled: false,
  thirdPartyCookiesEnabled: false,
  isApplyDeviceHeight: false,
  navigate: () => {},
};

export default RichText;
