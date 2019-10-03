import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoyaltyBannerView from '../views/LoyaltyBannerView';
import LoyaltyBannerLabels from '../LoyaltyBanner.labels';
import { getThresholdValue, cartOrderDetails } from './LoyaltyBanner.selectors';
import { isGuest } from '../../Checkout/container/Checkout.selector';

export const LoyaltyBannerContainer = ({ orderDetails, thresholdValue, isGuestCheck }) => {
  const { estimatedRewards, subTotal, cartTotalAfterPLCCDiscount, earnedReward } = orderDetails;
  return (
    <LoyaltyBannerView
      labels={LoyaltyBannerLabels}
      estimatedRewardsVal={estimatedRewards}
      currentSubtotal={subTotal}
      estimatedSubtotal={cartTotalAfterPLCCDiscount}
      thresholdValue={thresholdValue}
      isGuest={isGuestCheck}
      earnedReward={earnedReward}
    />
  );
};

LoyaltyBannerContainer.propTypes = {
  labels: PropTypes.shape({}),
  orderDetails: PropTypes.shape({}),
  thresholdValue: PropTypes.number,
  isGuestCheck: PropTypes.bool,
};

LoyaltyBannerContainer.defaultProps = {
  labels: {},
  orderDetails: {},
  thresholdValue: null,
  isGuestCheck: false,
};

/* istanbul ignore next */
export function mapStateToProps(state) {
  return {
    orderDetails: cartOrderDetails(state),
    thresholdValue: getThresholdValue(state),
    isGuestCheck: isGuest(state),
  };
}

export default connect(mapStateToProps)(LoyaltyBannerContainer);
