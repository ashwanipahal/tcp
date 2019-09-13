import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import selectors from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.selector';
import { getVenmoClientToken } from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.action';
import { getCartOrderId } from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import VenmoPaymentButton from '../views';
import { isVenmoNonceNotExpired, VENMO_USER_STATES } from './VenmoPaymentButton.util';

export class VenmoPaymentButtonContainer extends React.PureComponent<Props> {
  componentWillMount() {
    this.fetchVenmoClientToken();
  }

  fetchVenmoClientToken = () => {
    //const state = this.store.getState();
    const isMobile = true; //this.getIsMobile(state);
    // Todo: Add Kill switch logic
    if (isMobile) {
      let userState = '';
      const orderId = '12345'; //getCartOrderId(state);
      if (true) {
        // Retrieve guest token but change after user TCP authenticates.
        userState = VENMO_USER_STATES.GUEST;
      } else {
        userState = VENMO_USER_STATES.REGISTERED;
      }
      const { getVenmoPaymentTokenAction } = this.props;
      getVenmoPaymentTokenAction({ userState, orderId });
    }
  };

  render() {
    const { ...otherProps } = this.props;
    return <React.Fragment />;
  }
}

VenmoPaymentButton.propTypes = {
  className: PropTypes.string,
};

VenmoPaymentButton.defaultProps = {
  className: '',
};

const mapStateToProps = state => {
  // const {
  //   setVenmoData,
  //   openAuthLoginForCheckoutModal,
  //   removeOOSItems,
  //   handleVenmoPaymentButtonError: onVenmoPaymentButtonError,
  //   handleVenmoPaymentButtonClick: onVenmoPaymentButtonClick,
  // } = storeOperators.checkoutOperator;
  const mobile = selectors.getIsMobile();
  const venmoData = selectors.getVenmoData(state);
  const venmoClientTokenData = selectors.getVenmoClientTokenData(state);
  const { venmoSecurityToken: authorizationKey, venmoPaymentTokenAvailable } =
    venmoClientTokenData || {};
  const mode =
    venmoPaymentTokenAvailable === 'TRUE'
      ? VenmoPaymentButton.modes.PAYMENT_TOKEN
      : VenmoPaymentButton.modes.CLIENT_TOKEN;
  const enabled = true; // This will be handled with the venmo killswitch
  const isNonceNotExpired = isVenmoNonceNotExpired(state);
  return {
    enabled,
    mobile,
    mode,
    authorizationKey,
    isNonceNotExpired,
    venmoData,
    // Dispatchable functions
    // setVenmoData,
  };
};

const mapDispatchToProps = dispatch => ({
  // setVenmoPaymentInProgress: data => dispatch(selectors.setVenmoPaymentInProgress(data)),
  getVenmoPaymentTokenAction: data => dispatch(getVenmoClientToken(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VenmoPaymentButtonContainer);
