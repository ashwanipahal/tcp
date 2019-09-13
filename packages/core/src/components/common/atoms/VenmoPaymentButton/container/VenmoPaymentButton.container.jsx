import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import selectors from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.selector';
import {
  getVenmoClientToken,
  setVenmoData,
} from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.action';
import logger from '@tcp/core/src/utils/loggerInstance';
import { getCartOrderId } from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import VenmoPaymentButton from '../views';
import { isVenmoNonceNotExpired, VENMO_USER_STATES, modes } from './VenmoPaymentButton.util';

export class VenmoPaymentButtonContainer extends React.Component<Props> {
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

  setVenmoData = data => {
    const { venmoClientTokenData, setVenmoDataAction } = this.props;
    setVenmoDataAction({ venmoClientTokenData, ...data });
  };

  onVenmoPaymentButtonClick = mode => {
    debugger;
    logger.info(mode);
  };

  onVenmoPaymentButtonError = e => {
    debugger;
    logger.error(e);
  };

  render() {
    const { ...otherProps } = this.props;
    return (
      <VenmoPaymentButton
        setVenmoData={this.setVenmoData}
        onVenmoPaymentButtonClick={this.onVenmoPaymentButtonClick}
        onVenmoPaymentButtonError={this.onVenmoPaymentButtonError}
        {...otherProps}
      />
    );
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
  // } = storeOperators.checkoutOperator;
  const mobile = true; //selectors.getIsMobile();
  const venmoData = selectors.getVenmoData(state);
  const venmoClientTokenData = selectors.getVenmoClientTokenData(state);
  const { venmoSecurityToken: authorizationKey, venmoPaymentTokenAvailable } =
    venmoClientTokenData || {};
  const mode = venmoPaymentTokenAvailable === 'TRUE' ? modes.PAYMENT_TOKEN : modes.CLIENT_TOKEN;
  const enabled = true; // This will be handled with the venmo killswitch
  const isNonceNotExpired = isVenmoNonceNotExpired(state);
  return {
    enabled,
    mobile,
    mode,
    authorizationKey,
    isNonceNotExpired,
    venmoData,
    venmoClientTokenData,
    allowNewBrowserTab: true,
    // Dispatchable functions
    // setVenmoData,
  };
};

const mapDispatchToProps = dispatch => ({
  // setVenmoPaymentInProgress: data => dispatch(selectors.setVenmoPaymentInProgress(data)),
  getVenmoPaymentTokenAction: data => dispatch(getVenmoClientToken(data)),
  setVenmoDataAction: data => dispatch(setVenmoData(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VenmoPaymentButtonContainer);
