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
import { bootstrapData, SetTcpSegmentMethodCall } from '@tcp/core/src/reduxStore/actions';
import {
  createAPIConfig,
  getAPIConfig,
  isDevelopment,
  fetchStoreIdFromUrlPath,
  isGymboree,
} from '@tcp/core/src/utils';
import { initErrorReporter } from '@tcp/core/src/utils/errorReporter.util';
import { deriveSEOTags } from '@tcp/core/src/config/SEOTags.config';
import Loader from '@tcp/core/src/components/common/molecules/Loader';
import { openOverlayModal } from '@tcp/core/src/components/features/account/OverlayModal/container/OverlayModal.actions';
import { getUserInfo } from '@tcp/core/src/components/features/account/User/container/User.actions';
import { getCurrentStoreInfo } from '@tcp/core/src/components/features/storeLocator/StoreDetail/container/StoreDetail.actions';
import CheckoutModals from '@tcp/core/src/components/features/CnC/common/organism/CheckoutModals';
import ApplyNow from '@tcp/core/src/components/common/molecules/ApplyNowPLCCModal';
import { CHECKOUT_ROUTES } from '@tcp/core/src/components/features/CnC/Checkout/Checkout.constants';
import logger from '@tcp/core/src/utils/loggerInstance';
import { getUserLoggedInState } from '@tcp/core/src/components/features/account/User/container/User.selectors';
import { HotfixBrowserContext } from '@tcp/core/src/components/common/context/HotfixContext';
import { Header, Footer } from '../components/features/content';
import SEOTags from '../components/common/atoms';
import CheckoutHeader from '../components/features/content/CheckoutHeader';
import { configureStore } from '../reduxStore';
import ReactAxe from '../utils/react-axe';
import RouteTracker from '../components/common/atoms/RouteTracker';
import UserTimingRouteHandler from '../components/common/atoms/UserTimingRouteHandler';
import AddedToBagContainer from '../../../core/src/components/features/CnC/AddedToBag';

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
    const pageProps = await TCPWebApp.loadComponentData(Component, ctx, globalProps);
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

  // this function will check if user not login overlay needs to be displayed on page load
  // it will check for login user
  checkForlogin = () => {
    const { router, store } = this.props;
    const { target } = (router && router.query) || {};
    if (target === 'login') {
      const isUserLoggedIn = getUserLoggedInState(store.getState());
      if (isUserLoggedIn !== true) {
        store.dispatch(
          openOverlayModal({
            component: 'login',
            componentProps: 'login',
          })
        );
      }
    }
  };

  componentDidMount() {
    const { store } = this.props;
    ReactAxe.runAccessibility();
    this.checkForResetPassword();
    this.checkForlogin();
    const { envId, raygunApiKey, channelId, isErrorReportingBrowserActive } = getAPIConfig();
    window.testApp = payload => {
      store.dispatch(SetTcpSegmentMethodCall(payload));
    };

    try {
      if (isErrorReportingBrowserActive) {
        // eslint-disable-next-line global-require
        const rg4js = require('raygun4js');
        initErrorReporter({
          isServer: false,
          envId,
          raygunApiKey,
          channelId,
          isDevelopment: isDevelopment(),
          rg4js,
        });
      }
    } catch (e) {
      logger.info('Error occurred in Raygun initialization', e);
    }

    const isUserLoggedIn = getUserLoggedInState(store.getState());
    const isLocationEnabledForGuest =
      store.getState().session.siteDetails.IS_LOCATION_ENABLED_FOR_GUEST === 'TRUE';
    const isLocationEnabledForLoggedInUser =
      store.getState().session.siteDetails.IS_LOCATION_ENABLED_FOR_LOGGED_IN_USER === 'TRUE';

    if (
      (isLocationEnabledForGuest && navigator.geolocation) ||
      (isLocationEnabledForLoggedInUser && isUserLoggedIn && navigator.geolocation)
    ) {
      navigator.geolocation.getCurrentPosition();
    }
  }

  componentDidUpdate() {
    ReactAxe.runAccessibility();
    this.checkForlogin();
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
      const { device = {}, originalUrl } = req;
      const apiConfig = createAPIConfig(locals);
      // preview check from akamai header
      apiConfig.isPreviewEnv = res.getHeaders()[constants.PREVIEW_RES_HEADER_KEY];
      // preview date if any from the query param
      apiConfig.previewDate = req.query.preview_date;
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
        originalUrl,
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

  static async loadComponentData(Component, { store, isServer, req = {}, query = '' }, pageProps) {
    let compProps = {};
    if (Component.getInitialProps) {
      try {
        compProps = await Component.getInitialProps({ store, isServer, query, req }, pageProps);
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
      return seoConfig ? <SEOTags seoConfig={seoConfig} /> : null;
    }
    return null;
  };

  checkLoadAnalyticsOnload = pageProps => {
    const isLoadAnalyticsOnload =
      pageProps && pageProps.pageData && pageProps.pageData.loadAnalyticsOnload;
    if (typeof isLoadAnalyticsOnload === 'undefined') {
      return true;
    }
    return isLoadAnalyticsOnload;
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
    const isCheckAnalyticsOnload = this.checkLoadAnalyticsOnload(pageProps);
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
              {/* Provider for global hotfixes object */}
              <HotfixBrowserContext.Provider value={global.TCP_HOTFIX_BROWSER || {}}>
                <div className="content-wrapper">
                  <div id="overlayWrapper">
                    <div id="overlayComponent" />
                    <Component {...pageProps} pageName={componentPageName} />
                  </div>
                </div>
              </HotfixBrowserContext.Provider>
              <BackToTop />
              <Footer pageName={componentPageName} />
              <CheckoutModals />
              <AddedToBagContainer />
              <ApplyNow />
            </Grid>
            {/* Inject route tracker if analytics is enabled. Must be within store provider. */}
            {process.env.ANALYTICS && isCheckAnalyticsOnload && <RouteTracker />}
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
