import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencySymbol } from '@tcp/core/src/components/features/CnC/common/organism/OrderLedger/container/orderLedger.selector';
import { isUsOnly } from '@tcp/core/src/utils';
import LoyaltyBannerView from '../views/LoyaltyBannerView';
import {
  getThresholdValue,
  cartOrderDetails,
  getLoyaltyBannerLabels,
  confirmationDetails,
} from './LoyaltyBanner.selectors';

import { isGuest } from '../../Checkout/container/Checkout.selector';
import { isPlccUser } from '../../../account/User/container/User.selectors';
import { setCheckoutModalMountedState } from '../../../account/LoginPage/container/LoginPage.actions';

export const LoyaltyBannerContainer = ({
  labels,
  orderDetails,
  thresholdValue,
  isGuestCheck,
  isPlcc,
  currencySymbol,
  pageCategory,
  openLoginModal,
}) => {
  const {
    estimatedRewards,
    subTotal,
    subTotalWithDiscounts,
    earnedReward,
    pointsToNextReward,
  } = orderDetails;
  return isUsOnly() ? (
    <LoyaltyBannerView
      labels={labels}
      estimatedRewardsVal={estimatedRewards}
      currentSubtotal={subTotal}
      estimatedSubtotal={subTotalWithDiscounts}
      thresholdValue={thresholdValue}
      isGuest={isGuestCheck}
      earnedReward={earnedReward}
      isPlcc={isPlcc}
      pointsToNextReward={pointsToNextReward}
      getCurrencySymbol={currencySymbol}
      pageCategory={pageCategory}
      openLoginModal={openLoginModal}
    />
  ) : null;
};

LoyaltyBannerContainer.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  orderDetails: PropTypes.shape({}).isRequired,
  openLoginModal: PropTypes.func.isRequired,
  thresholdValue: PropTypes.number,
  isGuestCheck: PropTypes.bool,
  isPlcc: PropTypes.bool,
  currencySymbol: PropTypes.string,
  pageCategory: PropTypes.string,
};

LoyaltyBannerContainer.defaultProps = {
  thresholdValue: null,
  isGuestCheck: false,
  isPlcc: false,
  currencySymbol: '',
  pageCategory: '',
};

export const mapDispatchToProps = dispatch => ({
  openLoginModal: componentType =>
    dispatch(setCheckoutModalMountedState({ state: true, componentType })),
});

/* istanbul ignore next */
export const mapStateToProps = (state, ownProps) => ({
  labels: getLoyaltyBannerLabels(state),
  orderDetails:
    ownProps.pageCategory === 'confirmation' ? confirmationDetails(state) : cartOrderDetails(state),
  thresholdValue: getThresholdValue(state),
  isGuestCheck: isGuest(state),
  isPlcc: isPlccUser(state),
  currencySymbol: getCurrencySymbol(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoyaltyBannerContainer);
