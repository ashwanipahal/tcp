import React from 'react';
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components';

import { FULLY_VISIBLE, NAVIGATION_START } from '@tcp/core/src/constants/rum.constants';

// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

// For SSR perf timing
import RenderPerf from '../components/common/molecules/RenderPerf';

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
      <Html lang="en">
        <Head>
          <meta name="viewport" content="user-scalable=no, initial-scale=1" />
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
          {/* Performance measure for SSR app render time */}
          <RenderPerf.Measure name={FULLY_VISIBLE} />
          {/* Set this in SSR for initial page view */}
          <RenderPerf.Mark name={NAVIGATION_START} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
