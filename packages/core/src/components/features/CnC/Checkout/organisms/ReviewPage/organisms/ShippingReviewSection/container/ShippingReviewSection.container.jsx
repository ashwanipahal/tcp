import { connect } from 'react-redux';
import ShippingReviewSection from '../../../molecules/ShippingReviewSection';
import CHECKOUT_SELECTOR from '../../../../../container/Checkout.selector';

const mapStateToProps = state => {
  const shippingAddress = CHECKOUT_SELECTOR.getShippingDestinationValues(state);
  const shippingMethod = CHECKOUT_SELECTOR.getSelectedShippingMethodDetails(state);

  return {
    shippingAddress,
    shippingMethod,
    labels: CHECKOUT_SELECTOR.getShippingSectionLabels(state),
    // isGiftOptionsEnabled: CHECKOUT_SELECTOR.isGiftOptionsEnabled(state),
    // giftWrappingDisplayName:
    // CHECKOUT_SELECTOR.getSelectedGiftWrapDetails(state).displayName || 'N/A',
  };
};

export default connect(
  mapStateToProps,
  null
)(ShippingReviewSection);
