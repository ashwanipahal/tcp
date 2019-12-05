import React from 'react';
import { connect } from 'react-redux';
import { isGuest as isGuestUser } from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.selector';
import {
  setClickAnalyticsData,
  trackPageView,
  resetClickAnalyticsData,
  updatePageData,
} from '@tcp/core/src/analytics/actions';
import { getIsPayPalEnabled } from '@tcp/core/src/reduxStore/selectors/session.selectors';
import BagPageSelector from './BagPage.selectors';
import BagPage from '../views/BagPage.view';
import BAG_PAGE_ACTIONS from './BagPage.actions';
import {
  getCartOrderList,
  getIsCartItemsUpdating,
  getLabelsCartItemTile,
  getIsCartItemsSFL,
  getIsSflItemRemoved,
  getCartItemsSflError,
} from '../../CartItemTile/container/CartItemTile.selectors';
import {
  getUserLoggedInState,
  getIsRegisteredUserCallDone,
} from '../../../account/User/container/User.selectors';
import {
  setVenmoPaymentInProgress,
  setVenmoPickupMessageState,
  setVenmoShippingMessageState,
} from '../../Checkout/container/Checkout.action';
import checkoutSelectors from '../../Checkout/container/Checkout.selector';
import {
  toastMessageInfo,
  toastMessagePosition,
} from '../../../../common/atoms/Toast/container/Toast.actions.native';
import utils, { isClient, scrollToParticularElement, isMobileApp } from '../../../../../utils';
import { getSaveForLaterSwitch } from '../../SaveForLater/container/SaveForLater.selectors';
import {
  getGrandTotal,
  getGiftCardsTotal,
} from '../../common/organism/OrderLedger/container/orderLedger.selector';
import { getIsPickupModalOpen } from '../../../../common/organisms/PickupStoreModal/container/PickUpStoreModal.selectors';
import PlaceCashSelector from '../../PlaceCashBanner/container/PlaceCashBanner.selectors';
import BAGPAGE_CONSTANTS from '../BagPage.constants';
import BagPageUtils from '../views/Bagpage.utils';

export class BagPageContainer extends React.Component<Props> {
  componentDidMount() {
    const { needHelpContentId, fetchNeedHelpContent, placeCashBagContentId } = this.props;
    fetchNeedHelpContent([needHelpContentId, placeCashBagContentId]);
    const { setVenmoPickupState, setVenmoShippingState, setVenmoInProgress } = this.props;
    setVenmoPickupState(false);
    setVenmoShippingState(false);
    setVenmoInProgress(false); // Setting venmo progress as false. User can select normal checkout on cart page.
    this.fetchInitialActions();
  }

  componentDidUpdate(prevProps) {
    if (isClient()) {
      const {
        isRegisteredUserCallDone: prevIsRegisteredUserCallDone,
        router: prevRouter,
      } = prevProps;
      const { router, isRegisteredUserCallDone, bagPageIsRouting } = this.props;
      if (prevIsRegisteredUserCallDone !== isRegisteredUserCallDone && !bagPageIsRouting) {
        this.fetchInitialActions();
      }

      const isSfl = utils.getObjectValue(router, undefined, 'query', 'isSfl');
      const prevIsSfl = utils.getObjectValue(prevRouter, undefined, 'query', 'isSfl');

      if (isSfl !== prevIsSfl && isSfl) {
        const headingElem = document.querySelector('.save-for-later-section-heading');
        setTimeout(() => {
          scrollToParticularElement(headingElem);
        }, 100);
      }
    }
    const { cartOrderItems: prevCartOrderItems } = prevProps;
    const { cartOrderItems } = this.props;
    this.startBagAnalytics(cartOrderItems, prevCartOrderItems);
  }

  componentWillUnmount() {
    const { resetBagLoadedState } = this.props;
    resetBagLoadedState();
  }

  closeModal = () => {};

  startBagAnalytics = (cartOrderItems, prevCartOrderItems) => {
    const { setClickAnalyticsDataBag, trackPageViewBag, router, updateBagPageData } = this.props;
    const events = ['scView', 'scOpen', 'event80'];
    let fromMiniBag = false;
    if (!isMobileApp()) {
      fromMiniBag = utils.getObjectValue(router, false, 'query', 'fromMiniBag');
    }
    if (cartOrderItems !== prevCartOrderItems && events.length > 0) {
      const productsData = BagPageUtils.formatBagProductsData(cartOrderItems);
      const { SHOPPING_BAG, HEADER_CART } = BAGPAGE_CONSTANTS;
      updateBagPageData({
        pageName: SHOPPING_BAG,
        pageSection: SHOPPING_BAG,
        pageSubSection: SHOPPING_BAG,
        pageType: SHOPPING_BAG,
        pageShortName: SHOPPING_BAG,
        pageNavigationText: fromMiniBag ? HEADER_CART : '',
      });
      setClickAnalyticsDataBag({
        customEvents: events,
        products: productsData,
      });
      trackPageViewBag({
        currentScreen: 'bagPage',
        pageData: {
          pageName: BAGPAGE_CONSTANTS.SHOPPING_BAG,
          pageSection: BAGPAGE_CONSTANTS.SHOPPING_BAG,
          pageSubSection: BAGPAGE_CONSTANTS.SHOPPING_BAG,
          pageType: BAGPAGE_CONSTANTS.SHOPPING_BAG,
          pageShortName: BAGPAGE_CONSTANTS.SHOPPING_BAG,
          pageNavigationText: fromMiniBag ? 'header-cart' : '',
        },
      });
    }
  };

  fetchInitialActions() {
    const { isRegisteredUserCallDone, initialActions, fetchSflData } = this.props;
    if (isRegisteredUserCallDone) {
      initialActions();
      fetchSflData();
    }
  }

  render() {
    const {
      labels,
      totalCount,
      orderItemsCount,
      navigation,
      isUserLoggedIn,
      handleCartCheckout,
      showConfirmationModal,
      closeCheckoutConfirmationModal,
      removeUnqualifiedItemsAndCheckout,
      isGuest,
      sflItems,
      fetchLabels,
      setVenmoInProgress,
      isCartItemsUpdating,
      toastMessage,
      isCartItemSFL,
      isSflItemRemoved,
      isShowSaveForLaterSwitch,
      orderBalanceTotal,
      bagStickyHeaderInterval,
      toastMessagePositionInfo,
      cartItemSflError,
      isPayPalWebViewEnable,
      isPickupModalOpen,
      isMobile,
      bagPageServerError,
      isBagPage,
      setClickAnalyticsDataBag,
      cartOrderItems,
      isVenmoEnabled,
      isPayPalEnabled,
      isCartLoaded,
      trackPageViewBag,
      router,
      bagLoading,
    } = this.props;

    const showAddTobag = false;
    let fromMiniBag = false;
    if (!isMobileApp()) {
      fromMiniBag = utils.getObjectValue(router, false, 'query', 'fromMiniBag');
    }
    return (
      <BagPage
        isMobile={isMobile}
        labels={labels}
        totalCount={totalCount}
        orderItemsCount={orderItemsCount}
        showAddTobag={showAddTobag}
        navigation={navigation}
        isUserLoggedIn={isUserLoggedIn}
        isGuest={isGuest}
        showConfirmationModal={showConfirmationModal}
        closeCheckoutConfirmationModal={closeCheckoutConfirmationModal}
        removeUnqualifiedItemsAndCheckout={removeUnqualifiedItemsAndCheckout}
        handleCartCheckout={handleCartCheckout}
        sflItems={sflItems}
        fetchLabels={fetchLabels}
        setVenmoPaymentInProgress={setVenmoInProgress}
        isCartItemsUpdating={isCartItemsUpdating}
        toastMessage={toastMessage}
        isCartItemSFL={isCartItemSFL}
        isSflItemRemoved={isSflItemRemoved}
        isShowSaveForLaterSwitch={isShowSaveForLaterSwitch}
        orderBalanceTotal={orderBalanceTotal}
        bagStickyHeaderInterval={bagStickyHeaderInterval}
        toastMessagePositionInfo={toastMessagePositionInfo}
        cartItemSflError={cartItemSflError}
        isPayPalWebViewEnable={isPayPalWebViewEnable}
        isPickupModalOpen={isPickupModalOpen}
        bagPageServerError={bagPageServerError}
        isBagPage={isBagPage}
        cartOrderItems={cartOrderItems}
        setClickAnalyticsDataBag={setClickAnalyticsDataBag}
        isCartLoaded={isCartLoaded}
        trackPageViewBag={trackPageViewBag}
        fromMiniBag={fromMiniBag}
        bagLoading={bagLoading}
        isVenmoEnabled={isVenmoEnabled}
        isPayPalEnabled={isPayPalEnabled}
      />
    );
  }
}

BagPageContainer.getInitActions = () => BAG_PAGE_ACTIONS.initActions;

BagPageContainer.pageInfo = {
  pageId: 'Bag',
};

BagPageContainer.getInitialProps = (reduxProps, pageProps) => {
  const DEFAULT_ACTIVE_COMPONENT = 'shopping bag';
  const loadedComponent = utils.getObjectValue(reduxProps, DEFAULT_ACTIVE_COMPONENT, 'query', 'id');
  return {
    ...pageProps,
    ...{
      pageData: {
        pageName: BAGPAGE_CONSTANTS.SHOPPING_BAG,
        pageSection: loadedComponent,
        pageSubSection: BAGPAGE_CONSTANTS.SHOPPING_BAG,
        pageType: BAGPAGE_CONSTANTS.SHOPPING_BAG,
        pageShortName: BAGPAGE_CONSTANTS.SHOPPING_BAG,
        loadAnalyticsOnload: false,
      },
    },
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    initialActions: () => {
      dispatch(
        BAG_PAGE_ACTIONS.getCartData({
          isCartPage: true,
          translation: true,
          excludeCartItems: false,
        })
      );
    },
    fetchNeedHelpContent: contentIds => {
      dispatch(BAG_PAGE_ACTIONS.fetchModuleX(contentIds));
    },
    fetchSflData: () => {
      dispatch(BAG_PAGE_ACTIONS.getSflData());
    },
    fetchLabels: () => {
      dispatch(BAG_PAGE_ACTIONS.initActions[0]);
    },
    setVenmoInProgress: data => dispatch(setVenmoPaymentInProgress(data)),
    setVenmoPickupState: data => dispatch(setVenmoPickupMessageState(data)),
    setVenmoShippingState: data => dispatch(setVenmoShippingMessageState(data)),
    toastMessage: palyoad => {
      dispatch(toastMessageInfo(palyoad));
    },
    toastMessagePositionInfo: palyoad => {
      dispatch(toastMessagePosition(palyoad));
    },
    setClickAnalyticsDataBag: payload => {
      dispatch(setClickAnalyticsData(payload));
    },
    trackPageViewBag: payload => {
      dispatch(trackPageView(payload));
      setTimeout(() => {
        dispatch(resetClickAnalyticsData());
      }, 200);
    },
    updateBagPageData: payload => {
      dispatch(updatePageData(payload));
    },
    resetBagLoadedState: () => {
      dispatch(BAG_PAGE_ACTIONS.resetBagLoadedState());
    },
  };
};

export const mapStateToProps = state => {
  const { size = false } = getCartOrderList(state) || {};
  return {
    isMobile: checkoutSelectors.getIsMobile(),
    labels: { ...BagPageSelector.getBagPageLabels(state), ...getLabelsCartItemTile(state) },
    totalCount: BagPageSelector.getTotalItems(state),
    productsTypes: BagPageSelector.getProductsTypes(state),
    orderItemsCount: size,
    needHelpContentId: BagPageSelector.getNeedHelpContentId(state),
    placeCashBagContentId: PlaceCashSelector.getPlaceDetailsContentId(
      state,
      PlaceCashSelector.getPlaceCashDetailBannerLabel(state)
    ),
    showConfirmationModal: BagPageSelector.getConfirmationModalFlag(state),
    isVenmoEnabled: checkoutSelectors.getIsVenmoEnabled(state),
    isPayPalEnabled: getIsPayPalEnabled(state),
    isUserLoggedIn: getUserLoggedInState(state),
    isGuest: isGuestUser(state),
    sflItems: BagPageSelector.getsflItemsList(state),
    isCartItemsUpdating: getIsCartItemsUpdating(state),
    isCartItemSFL: getIsCartItemsSFL(state),
    isSflItemRemoved: getIsSflItemRemoved(state),
    isShowSaveForLaterSwitch: getSaveForLaterSwitch(state),
    orderBalanceTotal: getGrandTotal(state) - getGiftCardsTotal(state),
    bagStickyHeaderInterval: BagPageSelector.getBagStickyHeaderInterval(state),
    cartItemSflError: getCartItemsSflError(state),
    isPayPalWebViewEnable: BagPageSelector.getPayPalWebViewStatus(state),
    currencySymbol: BagPageSelector.getCurrentCurrency(state) || '$',
    isRegisteredUserCallDone: getIsRegisteredUserCallDone(state),
    isPickupModalOpen: getIsPickupModalOpen(state),
    bagPageServerError: checkoutSelectors.getCheckoutServerError(state),
    cartOrderItems: BagPageSelector.getOrderItems(state),
    isCartLoaded: BagPageSelector.getCartLoadedState(state),
    bagPageIsRouting: BagPageSelector.isBagRouting(state),
    bagLoading: BagPageSelector.isBagLoading(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BagPageContainer);
