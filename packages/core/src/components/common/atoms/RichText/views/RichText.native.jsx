import React from 'react';
// eslint-disable-next-line import/named
// @flow
import WebViewStyled from '../RichText.style';

/**
 * @param {object} props : Props for RichText
 * @desc This is a RichText component.
 * 1. Loads static HTML or a URI (with optional headers) in the WebView.
 * Note that static HTML will require setting originWhitelist to ["*"]
 */

const RichText = ({ dataLocator, ...otherProps }: Props) => (
  <WebViewStyled testID={dataLocator} {...otherProps} />
);

RichText.defaultProps = {
  dataLocator: '',
};

export default RichText;
