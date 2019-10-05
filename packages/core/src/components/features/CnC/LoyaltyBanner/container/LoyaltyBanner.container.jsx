import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoyaltyBannerView from '../views/LoyaltyBannerView';
import {
  getThresholdValue,
  cartOrderDetails,
  getLoyaltyBannerLabels,
} from './LoyaltyBanner.selectors';
import { isGuest } from '../../Checkout/container/Checkout.selector';
import { isPlccUser } from '../../../account/User/container/User.selectors';

export const LoyaltyBannerContainer = ({
  labels,
  orderDetails,
  thresholdValue,
  isGuestCheck,
  isPlcc,
}) => {
  const {
    estimatedRewards,
    subTotal,
    cartTotalAfterPLCCDiscount,
    earnedReward,
    pointsToNextReward,
  } = orderDetails;
  return (
    <LoyaltyBannerView
      labels={labels}
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
  labels: PropTypes.shape.isRequired,
  orderDetails: PropTypes.shape.isRequired,
  thresholdValue: PropTypes.number,
  isGuestCheck: PropTypes.bool,
  isPlcc: PropTypes.bool,
};

LoyaltyBannerContainer.defaultProps = {
  thresholdValue: null,
  isGuestCheck: false,
  isPlcc: false,
};

/* istanbul ignore next */
export function mapStateToProps(state) {
  return {
    labels: getLoyaltyBannerLabels(state),
    orderDetails: cartOrderDetails(state),
    thresholdValue: getThresholdValue(state),
    isGuestCheck: isGuest(state),
    isPlcc: isPlccUser(state),
  };
}

export default connect(mapStateToProps)(LoyaltyBannerContainer);
