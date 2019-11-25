import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BillingPage from '../views';
import { getAddEditAddressLabels } from '../../../../../../common/organisms/AddEditAddress/container/AddEditAddress.selectors';

import { getCVVCodeRichTextSelector } from './BillingPage.selectors';
import CheckoutSelectors from '../../../container/Checkout.selector';
import BagPageSelectors from '../../../../BagPage/container/BagPage.selectors';

import CheckoutActions from '../../../container/Checkout.action';

class BillingPageContainer extends React.Component {
  componentWillUnmount() {
    const { clearCheckoutServerError, checkoutServerError, isPayPalHidden } = this.props;
    if (checkoutServerError && !isPayPalHidden) {
      clearCheckoutServerError({});
    }
  }

  render() {
    return <BillingPage {...this.props} />;
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    updateCardDetail: payload => {
      dispatch(CheckoutActions.updateCardData(payload));
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
  };
};

BillingPageContainer.propTypes = {
  getCVVCodeInfo: PropTypes.func,
  clearCheckoutServerError: PropTypes.func.isRequired,
  checkoutServerError: PropTypes.shape({}).isRequired,
  isPayPalHidden: PropTypes.bool,
};

BillingPageContainer.defaultProps = {
  getCVVCodeInfo: null,
  isPayPalHidden: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingPageContainer);
export { BillingPageContainer as BillingPageContainerVanilla };
