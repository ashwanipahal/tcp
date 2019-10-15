import React from 'react';
import { connect } from 'react-redux';
import { isGuest as isGuestUser } from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.selector';
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
import { getUserLoggedInState } from '../../../account/User/container/User.selectors';
import {
  setVenmoPaymentInProgress,
  setVenmoPickupMessageState,
  setVenmoShippingMessageState,
} from '../../Checkout/container/Checkout.action';
import {
  toastMessageInfo,
  toastMessagePosition,
} from '../../../../common/atoms/Toast/container/Toast.actions.native';
import utils, { isClient } from '../../../../../utils';
import { getSaveForLaterSwitch } from '../../SaveForLater/container/SaveForLater.selectors';
import {
  getGrandTotal,
  getGiftCardsTotal,
} from '../../common/organism/OrderLedger/container/orderLedger.selector';

export class BagPageContainer extends React.Component<Props> {
  componentDidMount() {
    const { needHelpContentId, fetchNeedHelpContent } = this.props;
    fetchNeedHelpContent([needHelpContentId]);
    const { setVenmoPickupState, setVenmoShippingState } = this.props;
    setVenmoPickupState(false);
    setVenmoShippingState(false);
  }

  componentDidUpdate() {
    if (isClient()) {
      const { router } = this.props;
      const isSfl = utils.getObjectValue(router, undefined, 'query', 'isSfl');
      if (isSfl) {
        document.querySelector('.save-for-later-section-heading').scrollIntoView(true);
      }
    }
  }

  closeModal = () => {};

  componentWillMount = () => {
    const { initialActions, fetchSflData } = this.props;
    initialActions();
    fetchSflData();
  };

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
      currencySymbol,
      startPaypalNativeCheckoutAction,
      isPayPalWebViewEnable,
    } = this.props;

    const showAddTobag = false;
    return (
      <BagPage
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
        currencySymbol={currencySymbol}
        startPaypalNativeCheckoutAction={startPaypalNativeCheckoutAction}
        isPayPalWebViewEnable={isPayPalWebViewEnable}
      />
    );
  }
}

BagPageContainer.getInitActions = () => BAG_PAGE_ACTIONS.initActions;

export const mapDispatchToProps = dispatch => {
  return {
    initialActions: () => {
      dispatch(BAG_PAGE_ACTIONS.getCartData());
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
    startPaypalNativeCheckoutAction: () => {
      dispatch(BAG_PAGE_ACTIONS.startPaypalNativeCheckout());
    },
  };
};

const mapStateToProps = state => {
  const { size = false } = getCartOrderList(state) || {};
  return {
    labels: { ...BagPageSelector.getBagPageLabels(state), ...getLabelsCartItemTile(state) },
    totalCount: BagPageSelector.getTotalItems(state),
    productsTypes: BagPageSelector.getProductsTypes(state),
    orderItemsCount: size,
    needHelpContentId: BagPageSelector.getNeedHelpContentId(state),
    showConfirmationModal: BagPageSelector.getConfirmationModalFlag(state),
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BagPageContainer);
