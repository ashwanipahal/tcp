import { connect } from 'react-redux';

import PayPalButton from '../../../../../../common/atoms/PaypalButton';
// import { initalizePayPalButton } from '../../../../Checkout/container/Checkout.saga';

// eslint-disable-next-line no-unused-vars
export const mapStateToProps = state => ({
  // initalizePayPalButton: storeOperators.checkoutOperator.initalizePayPalButton,
  // abandonPaypal: storeOperators.checkoutOperator.abandonPaypalCheckout,
});

export default connect(
  mapStateToProps,
  null
)(PayPalButton);
