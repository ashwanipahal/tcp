import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BillingSection from '../views';
import giftCardSelectors from '../../../../GiftCardsSection/container/GiftCards.selectors';
import checkoutSelectors, {
  isGuest as isGuestUser,
} from '../../../../../container/Checkout.selector';
import billingSectionSelectors from './BillingSection.selectors';
import {
  modes,
  constants as VenmoConstants,
} from '../../../../../../../../common/atoms/VenmoPaymentButton/container/VenmoPaymentButton.util';
import { setVenmoPaymentOptionSave } from '../../../../../container/Checkout.action';
import { getCVVCodeRichTextSelector } from '../../../../BillingPage/container/BillingPage.selectors';

/**
 * @class BillingSectionContainer
 * @extends {PureComponent}
 */
class BillingSectionContainer extends PureComponent {
  static propTypes = {
    appliedGiftCards: PropTypes.shape([]),
    address: PropTypes.shape({}),
    card: PropTypes.shape({}),
    labels: PropTypes.shape({}),
    saveVenmoPaymentOption: PropTypes.func,
    cvvCodeInfoContentId: PropTypes.string,
    getCVVCodeInfo: PropTypes.func,
  };

  static defaultProps = {
    appliedGiftCards: null,
    address: null,
    card: null,
    labels: {},
    saveVenmoPaymentOption: () => {},
    cvvCodeInfoContentId: () => {},
    getCVVCodeInfo: null,
  };

  /**
   * @function render
   * @description Render the Billing Section component and pass the redux state as props into it.
   * @returns {JSX}
   * @memberof BillingSectionContainer
   */
  render() {
    const { saveVenmoPaymentOption } = this.props;
    return <BillingSection saveVenmoPaymentOption={saveVenmoPaymentOption} {...this.props} />;
  }
}

/**
 * @function mapStateToProps
 * @param {Object} state
 * @description Used for connect HOC to maps the state to props and pass to the connected component
 * @returns {Object}
 */
/* istanbul ignore next */
export const mapStateToProps = state => {
  const { address } = checkoutSelectors.getBillingValues(state);
  const {
    getVenmoClientTokenData,
    getIsVenmoEnabled,
    isVenmoNonceNotExpired,
    isVenmoPaymentInProgress,
    getIsBillingVisited,
    getIsPaymentDisabled,
    getVenmoUserName,
  } = checkoutSelectors;
  const venmoClientTokenData = getVenmoClientTokenData(state);
  const { venmoPaymentTokenAvailable } = venmoClientTokenData || {};
  const mode = venmoPaymentTokenAvailable === 'TRUE' ? modes.PAYMENT_TOKEN : modes.CLIENT_TOKEN;
  const enabled = getIsVenmoEnabled(state);
  const isNonceNotExpired = isVenmoNonceNotExpired(state);
  const venmoPaymentInProgress = isVenmoPaymentInProgress(state);
  const isGuest = isGuestUser(state);
  const userName = getVenmoUserName(state);
  const venmoPayment = {
    ccBrand: VenmoConstants.VENMO,
    ccType: VenmoConstants.VENMO,
    userName,
    venmoSaveToAccountDisplayed: !isGuest && mode === modes.CLIENT_TOKEN,
    isVenmoPaymentSelected: enabled && venmoPaymentInProgress && isNonceNotExpired,
  };
  return {
    appliedGiftCards: giftCardSelectors.getAppliedGiftCards(state),
    card: billingSectionSelectors.getBillingCardDetails(state),
    labels: billingSectionSelectors.getReviewPageLabels(state),
    address,
    isGuest,
    venmoPayment,
    cvvCodeRichText: getCVVCodeRichTextSelector(state),
    isBillingVisited: getIsBillingVisited(state),
    isPaymentDisabled: getIsPaymentDisabled(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    saveVenmoPaymentOption: payload => {
      dispatch(setVenmoPaymentOptionSave(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingSectionContainer);
export { BillingSectionContainer as BillingPageContainerVanilla };
