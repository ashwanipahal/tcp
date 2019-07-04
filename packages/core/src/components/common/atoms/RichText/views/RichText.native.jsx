import React from 'react';
// eslint-disable-next-line import/named
import WebViewStyled from '../RichText.style';

// @flow
// eslint-disable-next-line flowtype/no-types-missing-file-annotation
// type Props = {
//   testID?: string
// };

/**
 * @param {object} props : Props for RichText
 * @desc This is a RichText component.
 * 1. Loads static HTML or a URI (with optional headers) in the WebView.
 * Note that static HTML will require setting originWhitelist to ["*"]
 */

const RichText = (props: Props) => <WebViewStyled {...props} />;

export default RichText;
