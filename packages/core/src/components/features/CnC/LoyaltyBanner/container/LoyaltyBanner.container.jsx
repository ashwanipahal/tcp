import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencySymbol } from '@tcp/core/src/components/features/CnC/common/organism/OrderLedger/container/orderLedger.selector';
import LoyaltyBannerView from '../views/LoyaltyBannerView';
import {
  getThresholdValue,
  cartOrderDetails,
  getLoyaltyBannerLabels,
} from './LoyaltyBanner.selectors';

import { isGuest } from '../../Checkout/container/Checkout.selector';
import { isPlccUser } from '../../../account/User/container/User.selectors';
// import labels from '../LoyaltyBanner.labels';

export const LoyaltyBannerContainer = ({
  labels,
  orderDetails,
  thresholdValue,
  isGuestCheck,
  isPlcc,
  currencySymbol,
  isProductDetailView,
  isReviewPage,
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
      getCurrencySymbol={currencySymbol}
      isProductDetailView={isProductDetailView}
      isReviewPage={isReviewPage}
    />
  );
};

LoyaltyBannerContainer.propTypes = {
  labels: PropTypes.shape.isRequired,
  orderDetails: PropTypes.shape.isRequired,
  thresholdValue: PropTypes.number,
  isGuestCheck: PropTypes.bool,
  isPlcc: PropTypes.bool,
  currencySymbol: PropTypes.string,
  isProductDetailView: PropTypes.bool,
  isReviewPage: PropTypes.bool,
};

LoyaltyBannerContainer.defaultProps = {
  thresholdValue: null,
  isGuestCheck: false,
  isPlcc: false,
  currencySymbol: '',
  isProductDetailView: '',
  isReviewPage: false,
};

/* istanbul ignore next */
export function mapStateToProps(state) {
  return {
    labels: getLoyaltyBannerLabels(state),
    orderDetails: cartOrderDetails(state),
    thresholdValue: getThresholdValue(state),
    isGuestCheck: isGuest(state),
    isPlcc: isPlccUser(state),
    currencySymbol: getCurrencySymbol(state),
  };
}

export default connect(mapStateToProps)(LoyaltyBannerContainer);
