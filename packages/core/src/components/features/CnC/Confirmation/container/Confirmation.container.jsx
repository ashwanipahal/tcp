/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import ConfirmationView from '../views';
// import selectors from './Confirmation.selectors';
// import { isGuest, isUsSite } from '../../Checkout/container/Checkout.selector';

/**
 * @function ConfirmationContainer
 * @description container component to render confirmation component.
 */
const ConfirmationContainer = () => {
  return <ConfirmationView />;
};

// export const mapStateToProps = state => {
//   return {
//     isGuest: isGuest(state),
//     isOrderPending: selectors.getOrderConfirmation(state),
//     emailAddress: selectors.getOrderEmailAddress(state),
//     encryptedEmailAddress: selectors.getEncryptedEmailAddress(state),
//     orderDetails: selectors.getOrderDetails(state),
//     orderShippingDetails: selectors.getOrderShippingDetails(state),
//     personalizedCoupons: selectors.getPersonalizedCoupons(state),
//     isRewardsEnabled: isUsSite(state),
//     estimatedRewards: selectors.getEstimatedRewards(state),
//     pointsToNextReward: selectors.getPointsToNextReward(state),
//     earnedReward: selectors.getEarnedReward(state),
//     isSmsMarketingEnabled: isUsSite(state),
//     isCanadaSite: selectors.isCanadaSite(state),
//     isUsSite: isUsSite(state),
//     isBrierleyEnabled: selectors.getBrierleySwitch(state),
//     rewardsBanner: {
//       contentSlotName: 'checkout_confirmation_MPR_promo'
//     },

//     banner: {
//       contentSlotName: 'checkout_confirmation_banner'
//     },
//     isAirmilesEnabled: selectors.isCanadaSite(state),
//     airmiles: selectors.getAirmiles(state),
//     hideConfirmationEspot: selectors.shouldHideConfirmationEspot(state),

//     orderNumbersByFullfillmentCenter: selectors.getOrderNumbersByFullfillmentCenter(state),
//   }
// }

export default ConfirmationContainer;
