import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoyaltyBannerView from '../views/LoyaltyBannerView';
import LoyaltyBannerLabels from '../LoyaltyBanner.labels';
import { getThresholdValue, cartOrderDetails } from './LoyaltyBanner.selectors';
import { isGuest } from '../../Checkout/container/Checkout.selector';
import { isPlccUser } from '../../../account/User/container/User.selectors';

export const LoyaltyBannerContainer = ({ orderDetails, thresholdValue, isGuestCheck, isPlcc }) => {
  const {
    estimatedRewards,
    subTotal,
    cartTotalAfterPLCCDiscount,
    earnedReward,
    pointsToNextReward,
  } = orderDetails;
  return (
    <LoyaltyBannerView
      labels={LoyaltyBannerLabels}
      estimatedRewardsVal={estimatedRewards}
      currentSubtotal={subTotal}
      estimatedSubtotal={cartTotalAfterPLCCDiscount}
      thresholdValue={thresholdValue}
      isGuest={isGuestCheck}
      earnedReward={earnedReward}
      isPlcc={isPlcc}
      pointsToNextReward={pointsToNextReward}
    />
  );
};

LoyaltyBannerContainer.propTypes = {
  labels: PropTypes.shape({}),
  orderDetails: PropTypes.shape({}),
  thresholdValue: PropTypes.number,
  isGuestCheck: PropTypes.bool,
  isPlcc: PropTypes.string,
};

LoyaltyBannerContainer.defaultProps = {
  labels: {},
  orderDetails: {},
  thresholdValue: null,
  isGuestCheck: false,
  isPlcc: '',
};

/* istanbul ignore next */
export function mapStateToProps(state) {
  return {
    orderDetails: cartOrderDetails(state),
    thresholdValue: getThresholdValue(state),
    isGuestCheck: isGuest(state),
    isPlcc: isPlccUser(state),
  };
}

export default connect(mapStateToProps)(LoyaltyBannerContainer);
