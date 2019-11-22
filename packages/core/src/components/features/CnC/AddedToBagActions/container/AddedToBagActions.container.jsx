import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setClickAnalyticsData } from '@tcp/core/src/analytics/actions';
import AddedToBagActionsView from '../views/AddedToBagActions.view';
import { getLabelsAddToActions } from '../../AddedToBag/container/AddedToBag.selectors';
import { CHECKOUT_ROUTES } from '../../Checkout/Checkout.constants';
import utility from '../../Checkout/util/utility';
import bagPageActions from '../../BagPage/container/BagPage.actions';
import { getIsInternationalShipping } from '../../../../../reduxStore/selectors/session.selectors';
import checkoutSelectors, { isUsSite } from '../../Checkout/container/Checkout.selector';
import CHECKOUT_ACTIONS, {
  setVenmoPaymentInProgress,
} from '../../Checkout/container/Checkout.action';
import BagPageSelectors from '../../BagPage/container/BagPage.selectors';
import { getCartOrderId } from '../../CartItemTile/container/CartItemTile.selectors';

export class AddedToBagContainer extends React.Component<Props> {
  onClickViewBag = () => {
    utility.routeToPage(CHECKOUT_ROUTES.bagPage);
  };

  /**
   * @description - onCartCheckout method will check for selected checkout method
   * @param {object} payload - checkout payload for app and web
   */
  onCartCheckout = payload => {
    const { handleCartCheckout, setVenmoInProgress } = this.props;
    if (payload && !payload.isVenmoProgress) {
      setVenmoInProgress(false);
    }
    handleCartCheckout(payload);
  };

  render() {
    const {
      labels,
      showAddTobag,
      isEditingItem,
      isInternationalShipping,
      isVenmoEnabled,
      navigation,
      showVenmo,
      isNoNEmptyBag,
      fromAddedToBagModal,
      inheritedStyles,
      isBagPageStickyHeader,
      closeModal,
      isUSSite,
      getPayPalSettings,
      containerId,
      hideHeader,
      checkoutServerError,
      isPayPalWebViewEnable,
      venmoError,
      orderId,
      isPayPalHidden,
      payPalTop,
      paypalButtonHeight,
      isAddedToBag,
      isBagPage,
      isMiniBag,
      setClickAnalyticsDataCheckout,
      cartOrderItems,
      clearCheckoutServerError,
      setIsPaypalBtnHidden,
      bagLoading,
    } = this.props;
    return (
      <AddedToBagActionsView
        labels={labels}
        onClickViewBag={this.onClickViewBag}
        showAddTobag={showAddTobag}
        handleCartCheckout={this.onCartCheckout}
        isEditingItem={isEditingItem}
        isInternationalShipping={isInternationalShipping}
        isVenmoEnabled={isVenmoEnabled}
        navigation={navigation}
        showVenmo={showVenmo}
        isNoNEmptyBag={isNoNEmptyBag}
        fromAddedToBagModal={fromAddedToBagModal}
        isBagPageStickyHeader={isBagPageStickyHeader}
        closeModal={closeModal}
        isUSSite={isUSSite}
        inheritedStyles={inheritedStyles}
        getPayPalSettings={getPayPalSettings}
        containerId={containerId}
        hideHeader={hideHeader}
        checkoutServerError={checkoutServerError}
        isPayPalWebViewEnable={isPayPalWebViewEnable}
        venmoError={venmoError}
        orderId={orderId}
        isPayPalHidden={isPayPalHidden}
        payPalTop={payPalTop}
        paypalButtonHeight={paypalButtonHeight}
        isAddedToBag={isAddedToBag}
        isBagPage={isBagPage}
        isMiniBag={isMiniBag}
        setClickAnalyticsDataCheckout={setClickAnalyticsDataCheckout}
        cartOrderItems={cartOrderItems}
        clearCheckoutServerError={clearCheckoutServerError}
        setIsPaypalBtnHidden={setIsPaypalBtnHidden}
        bagLoading={bagLoading}
      />
    );
  }
}

AddedToBagContainer.propTypes = {
  labels: PropTypes.shape.isRequired,
  handleCartCheckout: PropTypes.func.isRequired,
  isInternationalShipping: PropTypes.bool.isRequired,
  isNoNEmptyBag: PropTypes.number.isRequired,
  isBagPageStickyHeader: PropTypes.bool,
  containerId: PropTypes.string,
  setClickAnalyticsDataCheckout: PropTypes.func.isRequired,
  cartOrderItems: PropTypes.shape([]).isRequired,
  bagLoading: PropTypes.bool.isRequired,
};

AddedToBagContainer.defaultProps = {
  isBagPageStickyHeader: false,
  containerId: null,
};

const mapDispatchToProps = dispatch => {
  return {
    handleCartCheckout: payload => {
      dispatch(bagPageActions.startCheckout(payload));
    },
    setVenmoInProgress: data => dispatch(setVenmoPaymentInProgress(data)),
    setClickAnalyticsDataCheckout: payload => {
      dispatch(setClickAnalyticsData(payload));
    },
    clearCheckoutServerError: data => dispatch(CHECKOUT_ACTIONS.setServerErrorCheckout(data)),
    setIsPaypalBtnHidden: payload => {
      dispatch(bagPageActions.setIsPaypalBtnHidden(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    labels: getLabelsAddToActions(state),
    isInternationalShipping: getIsInternationalShipping(state),
    isVenmoEnabled: checkoutSelectors.getIsVenmoEnabled(state),
    getPayPalSettings: checkoutSelectors.getPayPalSettings(state),
    isUSSite: isUsSite(state),
    checkoutServerError: checkoutSelectors.getCheckoutServerError(state),
    isPayPalWebViewEnable: BagPageSelectors.getPayPalWebViewStatus(state),
    orderId: getCartOrderId(state),
    venmoError: checkoutSelectors.getVenmoError(state),
    isPayPalHidden: BagPageSelectors.getIsPayPalHidden(state),
    cartOrderItems: BagPageSelectors.getOrderItems(state),
    bagLoading: BagPageSelectors.isBagLoading(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddedToBagContainer);
