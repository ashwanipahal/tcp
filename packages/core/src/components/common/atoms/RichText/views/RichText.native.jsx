// @flow
import React from 'react';
import { WebView } from 'react-native';

/**
 * @param {object} props : Props for RichText
 * @desc This is a RichText component.
 * 1. Loads static HTML or a URI (with optional headers) in the WebView.
 * Note that static HTML will require setting originWhitelist to ["*"]
 */

type Props = {
  source?: string,
  javaScriptEnabled?: boolean,
  domStorageEnabled?: boolean,
  thirdPartyCookiesEnabled?: boolean,
};

const RichText = (props: Props) => {
  const { javaScriptEnabled, domStorageEnabled, thirdPartyCookiesEnabled } = props;
  return (
    <WebView
      originWhitelist={['*']}
      javaScriptEnabled={javaScriptEnabled}
      domStorageEnabled={domStorageEnabled}
      thirdPartyCookiesEnabled={thirdPartyCookiesEnabled}
      {...props}
    />
  );
};

RichText.defaultProps = {
  source: '',
  javaScriptEnabled: false,
  domStorageEnabled: false,
  thirdPartyCookiesEnabled: false,
};

export default RichText;
