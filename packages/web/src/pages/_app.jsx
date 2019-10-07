import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import setCookie from 'set-cookie-parser';
import GlobalStyle from '@tcp/core/styles/globalStyles';
import getCurrentTheme from '@tcp/core/styles/themes';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import { bootstrapData } from '@tcp/core/src/reduxStore/actions';
import {
  createAPIConfig,
  getAPIConfig,
  isDevelopment,
  fetchStoreIdFromUrlPath,
} from '@tcp/core/src/utils';
import { initErrorReporter } from '@tcp/core/src/utils/errorReporter.util';
import { deriveSEOTags } from '@tcp/core/src/config/SEOTags.config';
import { openOverlayModal } from '@tcp/core/src/components/features/OverlayModal/container/OverlayModal.actions';
import { getUserInfo } from '@tcp/core/src/components/features/account/User/container/User.actions';
import { getCurrentStoreInfo } from '@tcp/core/src/components/features/storeLocator/StoreDetail/container/StoreDetail.actions';
import CheckoutModals from '@tcp/core/src/components/features/CnC/common/organism/CheckoutModals';
import { Header, Footer } from '../components/features/content';
import SEOTags from '../components/common/atoms';
import CheckoutHeader from '../components/features/content/CheckoutHeader';
import Loader from '../components/features/content/Loader';
import { configureStore } from '../reduxStore';
import ReactAxe from '../utils/react-axe';
import CHECKOUT_STAGES from './App.constants';
import createDataLayer from '../analytics/dataLayer';
import RenderPerf from '../components/common/molecules/RenderPerf';
import RouteTracker from '../components/common/atoms/RouteTracker';

// constants
import constants from '../constants';

// Analytics script injection
function AnalyticsScript() {
  return <script src={process.env.ANALYTICS_SCRIPT_URL} />;
}

class TCPWebApp extends App {
  static siteConfigSet = false;

  constructor(props) {
    super(props);
    this.theme = getCurrentTheme();
  }

  static async getInitialProps({ Component, ctx }) {
    const compProps = await TCPWebApp.loadComponentData(Component, ctx, {});
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
    // Get initial props is getting called twice on server
    // This check ensures this block is executed once since Component is not available in first call
    if (Component.displayName && isServer) {
      const { locals } = res;
      const { device = {} } = req;
      const apiConfig = createAPIConfig(locals);

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
      store.dispatch(bootstrapData(payload));
      if (asPath.includes('store') && query && query.storeStr) {
        const storeId = fetchStoreIdFromUrlPath(query.storeStr);
        store.dispatch(getCurrentStoreInfo(storeId));
      }
    }
    return pageProps;
  }

  static async loadComponentData(Component, { store, isServer }, pageProps) {
    const compProps = {};
    if (Component.getInitialProps) {
      // eslint-disable-next-line no-param-reassign
      pageProps = await Component.getInitialProps({ store, isServer }, pageProps);
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
    const componentPageName = Component.pageInfo ? Component.pageInfo.name || '' : '';
    let isNonCheckoutPage = true;
    const { PICKUP, SHIPPING, BILLING, REVIEW, INTERNATIONAL_CHECKOUT } = CHECKOUT_STAGES;
    const checkoutPageURL = [PICKUP, SHIPPING, BILLING, REVIEW, INTERNATIONAL_CHECKOUT];
    for (let i = 0; i < checkoutPageURL.length; i += 1) {
      if (router.asPath.indexOf(checkoutPageURL[i]) > -1) {
        isNonCheckoutPage = false;
      }
    }
    return (
      <Container>
        {/* TODO: Remove, this is for testing only */}
        <RenderPerf.Mark name="app_render_start" />
        <ThemeProvider theme={this.theme}>
          <Provider store={store}>
            <GlobalStyle />
            <Grid wrapperClass={isNonCheckoutPage ? 'non-checkout-pages' : 'checkout-pages'}>
              {Component.pageId ? this.getSEOTags(Component.pageId) : null}
              <Header />
              <CheckoutHeader />
              <Loader />
              <div className="content-wrapper">
                <div id="overlayWrapper">
                  <div id="overlayComponent" />
                  <Component {...pageProps} />
                </div>
              </div>
              <Footer pageName={componentPageName} />
              <CheckoutModals />
            </Grid>
            {/* Inject route tracker if analytics is enabled. Must be within store provider. */}
            {process.env.ANALYTICS && <RouteTracker />}
          </Provider>
        </ThemeProvider>
        {/* Inject analytics script if analytics is enabled. */}
        {process.env.ANALYTICS && <AnalyticsScript />}
        {/* TODO: Remove, this is for testing only */}
        <RenderPerf.Measure name="app_render" start="app_render_start" />
      </Container>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga(TCPWebApp));
