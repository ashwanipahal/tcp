import React from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

const patchPostMessageJsCode = `(${String(() => {
  const originalPostMessage = window.ReactNativeWebView.postMessage;
  const patchedPostMessage = (message, targetOrigin, transfer) => {
    originalPostMessage(message, targetOrigin, transfer);
  };
  patchedPostMessage.toString = () => {
    return String(Object.hasOwnProperty).replace('hasOwnProperty', 'ReactNativeWebView');
  };
  window.ReactNativeWebView.postMessage = patchedPostMessage;
})})();`;

const generateTheWebViewContent = siteKey => {
  return `<!DOCTYPE html>
          <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1" >
                <script src="https://recaptcha.google.com/recaptcha/api.js"></script>
                <script type="text/javascript"> var onloadCallback = function() { };
                  var onDataCallback = function(response) { console.log(response); window.ReactNativeWebView.postMessage(response);  };
                  var onDataExpiredCallback = function(error) {  window.ReactNativeWebView.postMessage("expired"); };
                  var onDataErrorCallback = function(error) {  window.ReactNativeWebView.postMessage("error"); }
                </script>
            </head>
            <body style="padding: 0; margin: 0;">
                <div style="text-align: left">
                  <div class="g-recaptcha" style="display: inline-block; margin:35px 55px 0 55px; transform:scale(0.8);transform-origin:0 0"
                      data-sitekey="
                      ${siteKey}
                      "data-callback="onDataCallback"
                      data-expired-callback="onDataExpiredCallback"
                      data-error-callback="onDataErrorCallback"></div>
                </div>
            </body>
          </html>`;
};

const color = { backgroundColor: 'transparent' };
const Recaptcha = ({ onMessage, siteKey, url }) => (
  <WebView
    originWhitelist={['*']}
    mixedContentMode="always"
    onMessage={onMessage}
    javaScriptEnabled
    injectedJavaScript={patchPostMessageJsCode}
    automaticallyAdjustContentInsets
    style={color}
    source={{
      html: generateTheWebViewContent(siteKey),
      baseUrl: `${url}`,
    }}
  />
);

Recaptcha.propTypes = {
  onMessage: PropTypes.func,
  siteKey: PropTypes.string,
  style: PropTypes.shape({}),
  url: PropTypes.string,
};

Recaptcha.defaultProps = {
  onMessage: () => {},
  url: 'https://test4.childrensplace.com',
  style: {},
  siteKey: '6LdYiRsTAAAAAHF4Yntsq8mPdWgHaTTFHsk8rax8',
};

export default Recaptcha;
