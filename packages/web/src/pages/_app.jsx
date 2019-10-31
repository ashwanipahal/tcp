import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import setCookie from 'set-cookie-parser';
import GlobalStyle from '@tcp/core/styles/globalStyles';
import getCurrentTheme from '@tcp/core/styles/themes';
import { BackToTop } from '@tcp/core/src/components/common/atoms';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import { bootstrapData } from '@tcp/core/src/reduxStore/actions';
import {
  createAPIConfig,
  getAPIConfig,
  isDevelopment,
  fetchStoreIdFromUrlPath,
  isGymboree,
} from '@tcp/core/src/utils';
import { initErrorReporter } from '@tcp/core/src/utils/errorReporter.util';
import { deriveSEOTags } from '@tcp/core/src/config/SEOTags.config';
import { openOverlayModal } from '@tcp/core/src/components/features/account/OverlayModal/container/OverlayModal.actions';
import { getUserInfo } from '@tcp/core/src/components/features/account/User/container/User.actions';
import { getCurrentStoreInfo } from '@tcp/core/src/components/features/storeLocator/StoreDetail/container/StoreDetail.actions';
import CheckoutModals from '@tcp/core/src/components/features/CnC/common/organism/CheckoutModals';
import { CHECKOUT_ROUTES } from '@tcp/core/src/components/features/CnC/Checkout/Checkout.constants';
import { Header, Footer } from '../components/features/content';
import SEOTags from '../components/common/atoms';
import CheckoutHeader from '../components/features/content/CheckoutHeader';
import Loader from '../components/features/content/Loader';
import { configureStore } from '../reduxStore';
import ReactAxe from '../utils/react-axe';
import createDataLayer from '../analytics/dataLayer';
import RouteTracker from '../components/common/atoms/RouteTracker';
import UserTimingRouteHandler from '../components/common/atoms/UserTimingRouteHandler';

// constants
import constants from '../constants';

// Analytics script injection
function AnalyticsScript() {
  // TODO: Need proper handling for this perf mark
  const handleLoad = () => performance && performance.mark('analytics_script_loaded');
  return <script src={process.env.ANALYTICS_SCRIPT_URL} onLoad={handleLoad} />;
}

class TCPWebApp extends App {
  static siteConfigSet = false;

  constructor(props) {
    super(props);
    this.theme = getCurrentTheme();
  }

  static async getInitialProps({ Component, ctx }) {
    let globalProps;
    try {
      globalProps = await TCPWebApp.loadGlobalData(Component, ctx, {});
    } catch (e) {
      globalProps = {};
    }
    const pageProps = TCPWebApp.loadComponentData(Component, ctx, globalProps);
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
      // eslint-disable-next-line no-unused-expressions
      'standalone' in window.navigator &&
        document.location.replace(
          `${
            isGymboree() ? 'gym' : 'tcp'
          }://change-password/?logonPasswordOld=${logonPasswordOld}&em=${em}`
        );
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
    const { envId, raygunApiKey, channelId, isErrorReportingBrowserActive } = getAPIConfig();
    if (isErrorReportingBrowserActive) {
      initErrorReporter({
        isServer: false,
        envId,
        raygunApiKey,
        channelId,
        isDevelopment: isDevelopment(),
      });
    }

    /**
     * This is where we assign window._dataLayer for analytics logic
     */
    if (process.env.ANALYTICS) {
      // eslint-disable-next-line
      global._dataLayer = createDataLayer(this.props.store);
    }
  }

  componentDidUpdate() {
    ReactAxe.runAccessibility();
  }

  /**
   * This function parses cookie response
   */
  static parseCookieResponse = ({ name, value }) => {
    let itemValue;
    try {
      itemValue = JSON.parse(value);
    } catch (err) {
      itemValue = {};
    }
    return {
      [name]: itemValue,
    };
  };

  static loadGlobalData(Component, { store, res, isServer, req, asPath, query }, pageProps) {
    // getInitialProps of _App is called on every internal page navigation in spa.
    // This check is to avoid unnecessary api call in those cases
    let payload = { siteConfig: false };
    const initialProps = pageProps;
    // Get initial props is getting called twice on server
    // This check ensures this block is executed once since Component is not available in first call
    if (isServer) {
      const { locals } = res;
      const { device = {} } = req;
      const apiConfig = createAPIConfig(locals);
      apiConfig.isPreviewEnv = res.getHeaders()[constants.PREVIEW_HEADER_KEY];

      // optimizely headers
      const optimizelyHeadersObject = {};
      const setCookieHeaderList = setCookie.parse(res).map(TCPWebApp.parseCookieResponse);

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

      payload = {
        siteConfig: true,
        apiConfig,
        deviceType: device.type,
        optimizelyHeadersObject,
      };

      // Get initial props is getting called twice on server
      // This check ensures this block is executed once since Component is not available in first call
      if (Component.pageInfo) {
        payload = {
          ...Component.pageInfo,
          ...payload,
        };
      }
      initialProps.pageData = payload.pageData;
      store.dispatch(bootstrapData(payload));
      if (asPath.includes('store') && query && query.storeStr) {
        const storeId = fetchStoreIdFromUrlPath(query.storeStr);
        store.dispatch(getCurrentStoreInfo(storeId));
      }
    }
    return initialProps;
  }

  static async loadComponentData(Component, { store, isServer, query = '' }, pageProps) {
    let compProps = {};
    if (Component.getInitialProps) {
      try {
        compProps = await Component.getInitialProps({ store, isServer, query }, pageProps);
      } catch (e) {
        compProps = {};
      }
    }
    if (Component.getInitActions) {
      const actions = Component.getInitActions();
      actions.forEach(action => store.dispatch(action));
    }
    return Object.assign({}, pageProps, compProps);
  }

  getSEOTags = (pageId, store, router) => {
    // Just a sample - any store specific data should be set in this
    if (pageId) {
      const seoConfig = deriveSEOTags(pageId, store, router);
      return <SEOTags seoConfig={seoConfig} />;
    }
    return null;
  };

  // eslint-disable-next-line complexity
  render() {
    const { Component, pageProps, store, router } = this.props;
    const componentPageName = Component.pageInfo ? Component.pageInfo.name || '' : '';
    let isNonCheckoutPage = true;
    const {
      pickupPage,
      shippingPage,
      billingPage,
      reviewPage,
      internationalCheckout,
    } = CHECKOUT_ROUTES;
    const checkoutPageURL = [
      pickupPage.asPath,
      shippingPage.asPath,
      billingPage.asPath,
      reviewPage.asPath,
      internationalCheckout.asPath,
    ];
    for (let i = 0; i < checkoutPageURL.length; i += 1) {
      if (router.asPath.indexOf(checkoutPageURL[i]) > -1) {
        isNonCheckoutPage = false;
      }
    }

    return (
      <Container>
        <ThemeProvider theme={this.theme}>
          <Provider store={store}>
            <GlobalStyle />
            <Grid wrapperClass={isNonCheckoutPage ? 'non-checkout-pages' : 'checkout-pages'}>
              {Component.pageInfo && Component.pageInfo.pageId
                ? this.getSEOTags(Component.pageInfo.pageId, store, router)
                : null}
              <Header />
              <CheckoutHeader />
              <Loader />
              <div className="content-wrapper">
                <div id="overlayWrapper">
                  <div id="overlayComponent" />
                  <Component {...pageProps} />
                </div>
              </div>
              <BackToTop />
              <Footer pageName={componentPageName} />
              <CheckoutModals />
            </Grid>
            {/* Inject route tracker if analytics is enabled. Must be within store provider. */}
            {process.env.ANALYTICS && <RouteTracker />}
          </Provider>
        </ThemeProvider>
        {/* Inject UX timer reporting if enabled. */}
        {process.env.PERF_TIMING && <UserTimingRouteHandler />}
        {/* Inject analytics script if analytics is enabled. */}
        {process.env.ANALYTICS && <AnalyticsScript />}
      </Container>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga(TCPWebApp));
