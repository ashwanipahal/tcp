import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ShippingReviewSection from '../../../molecules/ShippingReviewSection';
import CHECKOUT_SELECTOR from '../../../../../container/Checkout.selector';

export const ShippingReviewContainer = ({ shippingAddress, shippingMethod, onEdit, labels }) => {
  return (
    <ShippingReviewSection
      shippingAddress={shippingAddress}
      shippingMethod={shippingMethod}
      onEdit={onEdit}
      labels={labels}
    />
  );
};

ShippingReviewContainer.propTypes = {
  shippingAddress: PropTypes.shape({}).isRequired,
  shippingMethod: PropTypes.shape({}).isRequired,
  onEdit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}),
};

ShippingReviewContainer.defaultProps = {
  labels: {},
};

const mapStateToProps = state => {
  return {
    shippingAddress: CHECKOUT_SELECTOR.getShippingDestinationValues(state),
    shippingMethod: CHECKOUT_SELECTOR.getSelectedShippingMethodDetails(state),
    labels: CHECKOUT_SELECTOR.getShippingSectionLabels(state),
    // isGiftOptionsEnabled: CHECKOUT_SELECTOR.isGiftOptionsEnabled(state),
    // giftWrappingDisplayName:
    // CHECKOUT_SELECTOR.getSelectedGiftWrapDetails(state).displayName || 'N/A',
  };
};

export default connect(mapStateToProps)(ShippingReviewContainer);
