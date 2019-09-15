import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import selectors from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.selector';
import {
  getVenmoClientToken,
  setVenmoData,
  setVenmoPaymentInProgress,
} from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.action';
import { getCartOrderId } from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import logger from '@tcp/core/src/utils/loggerInstance';
import VenmoPaymentButton from '../views';
import { isVenmoNonceNotExpired, VENMO_USER_STATES, modes } from './VenmoPaymentButton.util';

export class VenmoPaymentButtonContainer extends React.Component<Props> {
  componentWillMount() {
    this.fetchVenmoClientToken();
  }

  fetchVenmoClientToken = () => {
    const { isMobile, isGuest, orderId } = this.props;
    // Todo: Add Kill switch logic
    if (isMobile) {
      let userState = '';
      if (isGuest) {
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
    logger.info(mode);
  };

  onVenmoPaymentButtonError = e => {
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
  const venmoClientTokenData = selectors.getVenmoClientTokenData(state);
  const { venmoSecurityToken: authorizationKey, venmoPaymentTokenAvailable } =
    venmoClientTokenData || {};
  const mode = venmoPaymentTokenAvailable === 'TRUE' ? modes.PAYMENT_TOKEN : modes.CLIENT_TOKEN;
  return {
    enabled: true, // Todo: This will be handled with the venmo killswitch
    isMobile: selectors.getIsMobile(),
    mode,
    authorizationKey,
    isNonceNotExpired: isVenmoNonceNotExpired(state),
    venmoData: selectors.getVenmoData(state),
    venmoClientTokenData,
    allowNewBrowserTab: true,
    isGuest: selectors.isGuest(state),
    orderId: getCartOrderId(state),
  };
};

const mapDispatchToProps = dispatch => ({
  setVenmoPaymentInProgress: data => dispatch(setVenmoPaymentInProgress(data)),
  getVenmoPaymentTokenAction: data => dispatch(getVenmoClientToken(data)),
  setVenmoDataAction: data => dispatch(setVenmoData(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VenmoPaymentButtonContainer);
