import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import GlobalStyle from '@tcp/core/styles/globalStyles';
import theme from '@tcp/core/styles/themes/TCP';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import { bootstrapData } from '@tcp/core/src/reduxStore/actions';
import { Header, Footer } from '../components/common/organisms';

import { configureStore } from '../reduxStore';
import ReactAxe from '../utils/react-axe';

class TCPWebApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const compProps = TCPWebApp.loadComponentData(Component, ctx, {});
    const pageProps = TCPWebApp.loadGlobalData(Component, ctx, compProps);

    return {
      pageProps,
    };
  }

  componentDidMount() {
    ReactAxe.runAccessibility();
  }

  componentDidUpdate() {
    ReactAxe.runAccessibility();
  }

  static loadGlobalData(Component, { store }, pageProps) {
    store.dispatch(bootstrapData(Component.pageInfo));
    return pageProps;
  }

  static async loadComponentData(Component, { store, isServer }, pageProps) {
    const compProps = {};
    if (Component.getInitialProps) {
      // eslint-disable-next-line no-param-reassign
      pageProps = await Component.getInitialProps({ store, isServer });
    }
    if (Component.getInitActions) {
      const actions = Component.getInitActions();
      actions.forEach(action => store.dispatch(action));
    }
    return Object.assign(pageProps, compProps);
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <GlobalStyle />
            <Grid>
              <Header />
              <Component {...pageProps} />
              <Footer />
            </Grid>
          </Provider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga(TCPWebApp));
