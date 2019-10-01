import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import selectors, {
  isGuest as isGuestUser,
} from '../../../../features/CnC/Checkout/container/Checkout.selector';
import {
  getVenmoClientToken,
  setVenmoData,
  setVenmoPaymentInProgress,
} from '../../../../features/CnC/Checkout/container/Checkout.action';
import { getCartOrderId } from '../../../../features/CnC/CartItemTile/container/CartItemTile.selectors';
import logger from '../../../../../utils/loggerInstance';
import VenmoPaymentButton from '../views';
import { modes } from './VenmoPaymentButton.util';

export class VenmoPaymentButtonContainer extends React.PureComponent<Props> {
  /**
   * This method is used for set venmo data in the checkout redux store.
   * @param {object} data - venmo reducer data to store
   */
  setVenmoData = data => {
    const { setVenmoDataAction } = this.props;
    setVenmoDataAction({
      ...data,
    });
  };

  /**
   * This method is called once venmo token and authorization is successfull and user has to procced to next steps of checkout/review
   * @param {string} mode - guest or registered user mode
   */
  onVenmoPaymentButtonClick = mode => {
    const { onSuccess } = this.props;
    onSuccess();
    logger.info(mode);
  };

  /**
   * This method is called once we get error or user interupted the venmo authorization flow.
   */
  onVenmoPaymentButtonError = e => {
    const { setVenmoProgress } = this.props;
    setVenmoProgress(false); // Cancelling venmo progress on error
    logger.error(e);
  };

  render() {
    const { setVenmoProgress, ...otherProps } = this.props;
    return (
      <VenmoPaymentButton
        setVenmoData={this.setVenmoData}
        onVenmoPaymentButtonClick={this.onVenmoPaymentButtonClick}
        onVenmoPaymentButtonError={this.onVenmoPaymentButtonError}
        setVenmoPaymentInProgress={setVenmoProgress}
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
  const enabled = selectors.getIsVenmoEnabled(state);
  // const isOOSItemsCount = BagSelectors.getOOSCount(state);
  // const unAvailableItemsCount = BagSelectors.getUnavailableCount(state);
  const isRemoveOOSItems = false;
  return {
    enabled,
    mode,
    authorizationKey,
    isNonceNotExpired: selectors.isVenmoNonceNotExpired(state),
    venmoData: selectors.getVenmoData(),
    venmoClientTokenData,
    allowNewBrowserTab: true,
    isGuest: isGuestUser(state),
    orderId: getCartOrderId(state),
    isRemoveOOSItems,
  };
};

export const mapDispatchToProps = dispatch => ({
  setVenmoProgress: data => dispatch(setVenmoPaymentInProgress(data)),
  getVenmoPaymentTokenAction: data => dispatch(getVenmoClientToken(data)),
  setVenmoDataAction: data => dispatch(setVenmoData(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VenmoPaymentButtonContainer);
