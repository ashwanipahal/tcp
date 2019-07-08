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
};

const RichText = (props: Props) => {
  return (
    <WebView
      originWhitelist={['*']}
      javaScriptEnabled={false}
      domStorageEnabled={false}
      thirdPartyCookiesEnabled={false}
      {...props}
    />
  );
};

RichText.defaultProps = {
  source: '',
};

export default RichText;
