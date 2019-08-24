import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import GlobalStyle from '@tcp/core/styles/globalStyles';
import getCurrentTheme from '@tcp/core/styles/themes';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import { bootstrapData } from '@tcp/core/src/reduxStore/actions';
import { createAPIConfig } from '@tcp/core/src/utils';
import { openOverlayModal } from '@tcp/core/src/components/features/OverlayModal/container/OverlayModal.actions';
import { getUserInfo } from '@tcp/core/src/components/features/account/User/container/User.actions';
import { Header, Footer } from '../components/features/content';
import CheckoutHeader from '../components/features/content/CheckoutHeader';
import Loader from '../components/features/content/Loader';
import { configureStore } from '../reduxStore';
import ReactAxe from '../utils/react-axe';
import CHECKOUT_STAGES from './App.constants';

class TCPWebApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const compProps = TCPWebApp.loadComponentData(Component, ctx, {});
    const pageProps = TCPWebApp.loadGlobalData(Component, ctx, compProps);

    return {
      pageProps,
    };
  }

  // this function will check if ResetPassword overlay needs to be displayed on page load
  // it will check for em and logonPasswordOld
  checkForResetPassword = () => {
    const { router, store } = this.props;
    const { em, logonPasswordOld } = (router && router.query) || {};
    if (em && logonPasswordOld) {
      store.dispatch(
        openOverlayModal({
          component: 'login',
          componentProps: {
            queryParams: {
              em,
              logonPasswordOld,
            },
            currentForm: 'resetPassword',
          },
        })
      );
    } else {
      store.dispatch(getUserInfo());
    }
  };

  componentDidMount() {
    ReactAxe.runAccessibility();
    this.checkForResetPassword();
  }

  componentDidUpdate() {
    ReactAxe.runAccessibility();
  }

  static loadGlobalData(
    Component,
    {
      store,
      res,
      isServer,
      req: { device = {} },
    },
    pageProps
  ) {
    // getInitialProps of _App is called on every internal page navigation in spa.
    // This check is to avoid unnecessary api call in those cases
    if (isServer) {
      const { locals } = res;
      const apiConfig = createAPIConfig(locals);
      const payload = {
        ...Component.pageInfo,
        apiConfig,
        deviceType: device.type,
      };
      store.dispatch(bootstrapData(payload));
    }
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
    const { Component, pageProps, store, router } = this.props;
    let isNonCheckoutPage = true;
    const { PICKUP, SHIPPING, BILLING, REVIEW } = CHECKOUT_STAGES;
    const checkoutPageURL = [PICKUP, SHIPPING, BILLING, REVIEW];
    for (let i = 0; i < checkoutPageURL.length; i += 1) {
      if (router.asPath.indexOf(checkoutPageURL[i]) > -1) {
        isNonCheckoutPage = false;
      }
    }
    const theme = getCurrentTheme();
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <GlobalStyle />
            <Grid>
              {isNonCheckoutPage && <Header />}
              {!isNonCheckoutPage && <CheckoutHeader />}
              <Loader />
              <div id="overlayWrapper">
                <div id="overlayComponent" />
                <Component {...pageProps} router />
                {isNonCheckoutPage && <Footer />}
              </div>
            </Grid>
          </Provider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga(TCPWebApp));
