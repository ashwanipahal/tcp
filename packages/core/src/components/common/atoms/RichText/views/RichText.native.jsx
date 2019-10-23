import React from 'react';
import { WebView } from 'react-native-webview';
import { Dimensions } from 'react-native';
import { PropTypes } from 'prop-types';

/**
 * @param {object} props : Props for RichText
 * @desc This is a RichText component.
 * 1. Loads static HTML or a URI (with optional headers) in the WebView.
 * Note that static HTML will require setting originWhitelist to ["*"]
 */

// type Props = {
//   source?: string,
//   javaScriptEnabled?: boolean,
//   domStorageEnabled?: boolean,
//   thirdPartyCookiesEnabled?: boolean,
//   isApplyDeviceHeight?: boolean,
// };

class RichText extends React.PureComponent {
  render() {
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
  }
}

RichText.propTypes = {
  source: PropTypes.string,
  javaScriptEnabled: PropTypes.bool,
  domStorageEnabled: PropTypes.bool,
  thirdPartyCookiesEnabled: PropTypes.bool,
  isApplyDeviceHeight: PropTypes.bool,
};

RichText.defaultProps = {
  source: '',
  javaScriptEnabled: false,
  domStorageEnabled: false,
  thirdPartyCookiesEnabled: false,
  isApplyDeviceHeight: false,
};

export default RichText;
