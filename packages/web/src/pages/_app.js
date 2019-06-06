// @flow
import React from 'react';
import App, { Container } from 'next/app';
import type { Node } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import validateAccessibility from '@tcp/core/src/utils/reactAxe';
import { configureStore } from '../reduxStore';
import theme from '../../Styles/themes/primary';
import type { Props } from './_app.type';

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

  static async loadComponentData(Component, { store, isServer }, pageProps: Props) {
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ store, isServer });
    }
    if (isServer && Component.getInitActions) {
      const actions = Component.getInitActions();
      actions.forEach(action => store.dispatch(action));
    }
    return pageProps;
  }

  componentDidMount() {
    console.log(' componentDidMount  +++++++++++++++++++  >>S<<S>S');
    validateAccessibility();
  }

  componentDidUpdate() {
    console.log(' componentDidUpdate  +++++++++++++++++++  >>S<<S>S');
    validateAccessibility();
  }

  render(): Node {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga(TCPWebApp));
