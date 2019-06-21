import React from 'react';
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components';
// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

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
        <Head />
        <body className="custom_class">
          <Main />
          <NextScript />
          <script
            type="text/javascript"
            src="//assets.adobedtm.com/429637684b76cf4b92fab22c24d35f7d9e89348a/satelliteLib-aba365057b3fb6edb76f4760f09ade697e571f92.js"
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
