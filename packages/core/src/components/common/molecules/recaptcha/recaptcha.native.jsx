import React from 'react';
import { WebView } from 'react-native';
import PropTypes from 'prop-types';

const patchPostMessageJsCode = `(${String(() => {
  const originalPostMessage = window.postMessage;
  const patchedPostMessage = (message, targetOrigin, transfer) => {
    originalPostMessage(message, targetOrigin, transfer);
  };
  patchedPostMessage.toString = () => {
    return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
  };
  window.postMessage = patchedPostMessage;
})})();`;

const generateTheWebViewContent = siteKey => {
  return `<!DOCTYPE html>
          <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://recaptcha.google.com/recaptcha/api.js"></script>
                <script type="text/javascript"> var onloadCallback = function() { };
                  var onDataCallback = function(response) { console.log(response); window.postMessage(response);  };
                  var onDataExpiredCallback = function(error) {  window.postMessage("expired"); };
                  var onDataErrorCallback = function(error) {  window.postMessage("error"); }
                </script>
            </head>
            <body style="padding: 0; margin: 0;">
                <div style="text-align: left;">
                  <div class="g-recaptcha" style="display: inline-block;"
                      data-sitekey="
                      ${siteKey}
                      "data-callback="onDataCallback"
                      data-expired-callback="onDataExpiredCallback"
                      data-error-callback="onDataErrorCallback"></div>
                </div>
            </body>
          </html>`;
};

const Recaptcha = ({ onMessage, siteKey, style, url }) => (
  <WebView
    originWhitelist={['*']}
    mixedContentMode="always"
    onMessage={onMessage}
    javaScriptEnabled
    injectedJavaScript={patchPostMessageJsCode}
    automaticallyAdjustContentInsets
    style={style}
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
  url: 'https://www.childrensplace.com',
  style: {},
  siteKey: '6LdYiRsTAAAAAHF4Yntsq8mPdWgHaTTFHsk8rax8',
};

export default Recaptcha;
