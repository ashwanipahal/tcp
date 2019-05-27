import React from 'react'
import App, { Container } from 'next/app'
import {Provider} from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from 'next-redux-saga';
import { configureStore } from '../reduxStore';

class TCPWebApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps={};
    
    pageProps = TCPWebApp.loadComponentData(Component, ctx, pageProps);
    pageProps = TCPWebApp.loadGlobalData(ctx, pageProps);

    return {
      pageProps
    };
  }

  static loadGlobalData(ctx, pageProps) {
    return pageProps;
  }

  static async loadComponentData(Component, {store, isServer}, pageProps) {
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({store, isServer})
    }
    if (isServer && Component.getInitActions) {
      const actions = Component.getInitActions();
      actions.forEach(action => store.dispatch(action))
    }
    return pageProps;
  }

  render () {
    const { Component, pageProps, store  } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(configureStore)(withReduxSaga(TCPWebApp))
