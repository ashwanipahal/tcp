import React, { PureComponent } from 'react';
import { WebView, Dimensions, View, Text } from 'react-native';
import { RenderTree, ComponentMap } from '@fabulas/astly';
import Image from '@tcp/core/src/components/common/atoms/Image';
import { PropTypes } from 'prop-types';

/**
 * @param {object} props : Props for RichText
 * @desc This is a RichText component.
 * 1. Loads static HTML or a URI (with optional headers) in the WebView.
 * Note that static HTML will require setting originWhitelist to ["*"]
 */

class RichText extends PureComponent {
  renderImage = ({ style, source, ...otherProps }) => {
    return <Image url={source} {...otherProps} />;
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

  handleNativeNavigation = node => {
    const { actionHandler } = this.props;
    if (node.properties && node.properties.dataTarget) {
      actionHandler(node.properties.dataTarget);
    }
  };

  renderNativeView = () => {
    const { source } = this.props;
    return (
      <View>
        <RenderTree
          tree={`<div>${source}</div>`}
          tools={{ navigate: this.handleNativeNavigation }}
          componentMap={{
            ...ComponentMap,
            br: () => <Text> </Text>,
            p: props => this.renderText(props),
            b: props => this.renderText(props),
            img: props => this.renderImage(props),
            h3: props => this.renderText(props),
            ul: props => this.renderText(props),
            a: props => this.renderAnchor(props),
            li: props => this.renderText(props),
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
