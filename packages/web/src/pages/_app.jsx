import React from 'react';
import App, { Container } from 'next/app';
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import setCookie from 'set-cookie-parser';
import GlobalStyle from '@tcp/core/styles/globalStyles';
import getCurrentTheme from '@tcp/core/styles/themes';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import { bootstrapData } from '@tcp/core/src/reduxStore/actions';
import { createAPIConfig, getAPIConfig, isDevelopment } from '@tcp/core/src/utils';
import { initErrorReporter } from '@tcp/core/src/utils/errorReporter.util';
import { deriveSEOTags } from '@tcp/core/src/config/SEOTags.config';
import { openOverlayModal } from '@tcp/core/src/components/features/OverlayModal/container/OverlayModal.actions';
import { getUserInfo } from '@tcp/core/src/components/features/account/User/container/User.actions';
import { Header, Footer } from '../components/features/content';
import SEOTags from '../components/common/atoms';
import CheckoutHeader from '../components/features/content/CheckoutHeader';
import Loader from '../components/features/content/Loader';
import { configureStore } from '../reduxStore';
import ReactAxe from '../utils/react-axe';
import CHECKOUT_STAGES from './App.constants';
import ServerOnly from '../components/common/atoms/ServerOnly';
import Perf from '../components/common/atoms/Perf';

// constants
import constants from '../constants';

// Script injection component
// This is lazy-loaded so we inject it after SSR
const Script = dynamic(() => import('../components/common/atoms/Script'), { ssr: false });

// Analytics script injection
function AnalyticsScript() {
  return <Script src={process.env.ANALYTICS_SCRIPT_URL} />;
}
class TCPWebApp extends App {
  constructor(props) {
    super(props);
    this.theme = getCurrentTheme();
  }

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
    const { envId, raygunApiKey, channelId } = getAPIConfig();
    initErrorReporter({
      isServer: false,
      envId,
      raygunApiKey,
      channelId,
      isDevelopment: isDevelopment(),
    });
  }

  componentDidUpdate() {
    ReactAxe.runAccessibility();
  }

  static loadGlobalData(Component, { store, res, isServer, req }, pageProps) {
    // getInitialProps of _App is called on every internal page navigation in spa.
    // This check is to avoid unnecessary api call in those cases
    if (isServer) {
      const { locals } = res;
      const { device = {} } = req;
      const apiConfig = createAPIConfig(locals);

      // optimizely headers
      const optimizelyHeadersObject = {};
      const setCookieHeaderList = setCookie.parse(res).map(({ name, value }) => {
        let itemValue;
        try {
          itemValue = JSON.parse(value);
        } catch (err) {
          itemValue = {};
        }
        return {
          [name]: itemValue,
        };
      });

      const optimizelyHeader = setCookieHeaderList && setCookieHeaderList[0];
      if (optimizelyHeader) {
        optimizelyHeader[constants.OPTIMIZELY_DECISION_LABEL].forEach(item => {
          let optimizelyHeaderValue;
          try {
            optimizelyHeaderValue = JSON.parse(
              res.getHeader(`${constants.OPTIMIZELY_HEADER_PREFIX}${item}`)
            );
          } catch (err) {
            optimizelyHeaderValue = {};
          }
          optimizelyHeadersObject[item] = optimizelyHeaderValue;
        });
      }

      const payload = {
        ...Component.pageInfo,
        apiConfig,
        deviceType: device.type,
        optimizelyHeadersObject,
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

  getSEOTags = pageId => {
    const seoConfig = deriveSEOTags(pageId);
    return <SEOTags seoConfig={seoConfig} />;
  };

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
    return (
      <Container>
        <ServerOnly>
          <Perf.mark name="App render start" />
        </ServerOnly>
        <ThemeProvider theme={this.theme}>
          <Provider store={store}>
            <GlobalStyle />
            <Grid wrapperClass={isNonCheckoutPage ? 'non-checkout-pages' : 'checkout-pages'}>
              {this.getSEOTags(Component.pageId)}
              <Header />
              <CheckoutHeader />
              <Loader />
              <div id="overlayWrapper">
                <div id="overlayComponent" />
                <Component {...pageProps} />
                <Footer />
              </div>
            </Grid>
          </Provider>
        </ThemeProvider>
        {/* Inject analytics script if enabled */}
        {process.env.ANALYTICS && <AnalyticsScript />}
        {/* Render performance marker scripts if enabled */}
        {process.env.PERF_TIMING && (
          <ServerOnly>
            <Perf.measure name="App render" />
          </ServerOnly>
        )}
      </Container>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga(TCPWebApp));
