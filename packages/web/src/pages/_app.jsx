import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import theme from '@tcp/core/styles/themes/TCP';
import commonStyles from '@tcp/core/styles/globalStyles/commonStyles';
import commonFonts from '@tcp/core/styles/globalStyles/fonts';
import { configureStore } from '../reduxStore';

const GlobalStyle = createGlobalStyle`
  ${commonFonts}
  ${commonStyles}
`;

class TCPWebApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    pageProps = TCPWebApp.loadComponentData(Component, ctx, pageProps);
    pageProps = TCPWebApp.loadGlobalData(ctx, pageProps);

    return {
      pageProps,
    };
  }

  static loadGlobalData(ctx, pageProps) {
    return pageProps;
  }

  static async loadComponentData(Component, { store, isServer }, pageProps) {
    if (Component.getInitialProps) {
      // eslint-disable-next-line no-param-reassign
      pageProps = await Component.getInitialProps({ store, isServer });
    }
    if (isServer && Component.getInitActions) {
      const actions = Component.getInitActions();
      actions.forEach(action => store.dispatch(action));
    }
    return pageProps;
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <GlobalStyle />
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga(TCPWebApp));
