import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddedToBagActionsView from '../views/AddedToBagActions.view';
import { getLabelsAddToActions } from '../../AddedToBag/container/AddedToBag.selectors';
import { CHECKOUT_ROUTES } from '../../Checkout/Checkout.constants';
import utility from '../../Checkout/util/utility';
import bagPageActions from '../../BagPage/container/BagPage.actions';
import { getIsInternationalShipping } from '../../../../../reduxStore/selectors/session.selectors';
import checkoutSelectors, { isUsSite } from '../../Checkout/container/Checkout.selector';
import { setVenmoPaymentInProgress } from '../../Checkout/container/Checkout.action';

export class AddedToBagContainer extends React.Component<Props> {
  onClickViewBag = () => {
    utility.routeToPage(CHECKOUT_ROUTES.bagPage);
  };

  /**
   * onCartCheckout method will check for selected checkout method
   * {params} payload - checkout payload for app and web
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
      containerId,
      checkoutServerError,
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
        containerId={containerId}
        checkoutServerError={checkoutServerError}
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
  };
};

const mapStateToProps = state => {
  return {
    labels: getLabelsAddToActions(state),
    isInternationalShipping: getIsInternationalShipping(state),
    isVenmoEnabled: checkoutSelectors.getIsVenmoEnabled(state),
    isUSSite: isUsSite(state),
    checkoutServerError: checkoutSelectors.getCheckoutServerError(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddedToBagContainer);
