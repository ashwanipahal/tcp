import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GuestBillingPage from '../views';
import CONSTANTS from '../../../Checkout.constants';

import { getCardType, getSyncError, getPaymentMethodId } from './GuestBillingForm.selectors';

const GuestBillingContainer = ({
  cardType,
  syncErrors,
  cvvCodeRichText,
  labels,
  paymentMethodId,
  shippingAddress,
}) => {
  return (
    <GuestBillingPage
      cardType={cardType}
      syncErrorsObj={syncErrors}
      cvvCodeRichText={cvvCodeRichText}
      labels={labels}
      paymentMethodId={paymentMethodId}
      initialValues={{ paymentMethodId: CONSTANTS.PAYMENT_METHOD_CREDIT_CARD }}
      shippingAddress={shippingAddress}
    />
  );
};

export const mapStateToProps = state => {
  return {
    cardType: getCardType(state),
    syncErrors: getSyncError(state),
    paymentMethodId: getPaymentMethodId(state),
  };
};

GuestBillingContainer.propTypes = {
  cardType: PropTypes.string,
  syncErrors: PropTypes.shape({}),
  cvvCodeRichText: PropTypes.string,
  labels: PropTypes.shape({}),
  paymentMethodId: PropTypes.string,
  shippingAddress: PropTypes.shape({}),
};

GuestBillingContainer.defaultProps = {
  cardType: null,
  syncErrors: null,
  cvvCodeRichText: '',
  labels: {},
  paymentMethodId: null,
  shippingAddress: null,
};

export default connect(mapStateToProps)(GuestBillingContainer);
export { GuestBillingContainer as GuestBillingContainerVanilla };
