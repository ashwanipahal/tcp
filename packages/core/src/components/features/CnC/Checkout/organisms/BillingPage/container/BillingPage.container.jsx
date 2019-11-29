import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BillingPage from '../views';
import { getAddEditAddressLabels } from '../../../../../../common/organisms/AddEditAddress/container/AddEditAddress.selectors';
import { getAddressListState } from '../../../../../account/AddressBook/container/AddressBook.selectors';
import { getCardListFetchingState } from '../../../../../account/Payment/container/Payment.selectors';
import { getCVVCodeRichTextSelector } from './BillingPage.selectors';
import CheckoutSelectors from '../../../container/Checkout.selector';
import BagPageSelectors from '../../../../BagPage/container/BagPage.selectors';
import CheckoutActions from '../../../container/Checkout.action';
import { toastMessageInfo } from '../../../../../../common/atoms/Toast/container/Toast.actions.native';

class BillingPageContainer extends React.Component {
  componentWillUnmount() {
    const { clearCheckoutServerError, checkoutServerError, isPayPalHidden } = this.props;
    if (checkoutServerError && !isPayPalHidden) {
      clearCheckoutServerError({});
    }
  }

  /**
   * @description - Error notification for venmo authorization
   */
  onVenmoError = payload => {
    const { toastMessage } = this.props;
    if (payload && payload.venmoErrorMessage) {
      toastMessage(payload.venmoErrorMessage);
    }
  };

  render() {
    return <BillingPage onVenmoError={this.onVenmoError} {...this.props} />;
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    updateCardDetail: payload => {
      dispatch(CheckoutActions.updateCardData(payload));
    },
    toastMessage: payload => {
      dispatch(toastMessageInfo(payload));
    },
  };
};

export const mapStateToProps = state => {
  const { getIsVenmoEnabled, getBillingLabels } = CheckoutSelectors;
  return {
    cvvCodeRichText: getCVVCodeRichTextSelector(state),
    labels: getBillingLabels(state),
    addressLabels: getAddEditAddressLabels(state),
    isVenmoEnabled: getIsVenmoEnabled(state), // Venmo Kill Switch, if Venmo enabled then true, else false.
    venmoError: CheckoutSelectors.getVenmoError(state),
    isPayPalHidden: BagPageSelectors.getIsPayPalHidden(state),
    shippingAddress: CheckoutSelectors.getShippingAddress(state),
    billingData: CheckoutSelectors.getBillingValues(state),
    userAddresses: getAddressListState(state),
    creditFieldLabels: CheckoutSelectors.getCreditFieldLabels(state),
    isFetching: getCardListFetchingState(state),
    bagLoading: BagPageSelectors.isBagLoading(state),
  };
};

BillingPageContainer.propTypes = {
  getCVVCodeInfo: PropTypes.func,
  clearCheckoutServerError: PropTypes.func.isRequired,
  checkoutServerError: PropTypes.shape({}).isRequired,
  isPayPalHidden: PropTypes.bool,
  toastMessage: PropTypes.func,
};

BillingPageContainer.defaultProps = {
  getCVVCodeInfo: null,
  isPayPalHidden: false,
  toastMessage: () => { }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingPageContainer);
export { BillingPageContainer as BillingPageContainerVanilla };
