import React from 'react';
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components';
// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

// External Style Sheet
const CSSOverride = () => {
  return <link href={process.env.RWD_WEB_CSS_OVERRIDE_URL} rel="stylesheet" />;
};

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="viewport"
            content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"
          />
          <link href="/static/app.css" rel="stylesheet" />
          {process.env.RWD_WEB_CSS_OVERRIDE_URL && <CSSOverride />}
        </Head>
        <body
          /* eslint-disable-next-line react-native/no-inline-styles */
          style={{
            position: 'relative',
            minHeight: '100%',
          }}
        >
          <Main />
          <NextScript />
          <div className="dark-overlay" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
