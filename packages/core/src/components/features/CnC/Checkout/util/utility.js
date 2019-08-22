/* eslint-disable no-else-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable complexity */

import {
  getSetCurrentOrderIdActn,
  getSetCartActn,
  getSetEstimatedAirMilesActn,
  getSetGiftWrappingTotalActn,
  getSetGiftCardTotalActn,
  setShippingTotal,
  getSetCartStoreActn,
  setTaxesTotal,
  getSetCouponsTotalActn,
  setSavingsTotal,
  getSetItemsTotalAction,
  setItemsCount,
  getSetSubTotal,
  getSetSubTotalWithDiscountsActn,
  getSetGrandTotal,
  getSetRewardsToBeEarnedActn,
  getSetIsPayPalEnabledActn,
  setCartTotalAfterPLCCDiscount,
  getSetPointsAndRewardsActn,
  getSetGiftCardValuesActn,
  getSetAirmilesPromoIdActn,
  getSetAirmilesAccountActn,
} from '../container/Checkout.action';

const getOrderPointsRecalcFlag = (recalcRewards, recalcOrderPointsInterval) => {
  console.log('getOrderPointsRecalcFlag');
  // let recalcVal = recalcRewards;
  // if(recalcOrderPointsInterval && !recalcRewards) {
  //   const orderPointsTimeStamp = getLocalStorage('orderPointsTimeStamp') || null;
  //   const currentTime = ((new Date()).getTime());
  //   if(!orderPointsTimeStamp || (orderPointsTimeStamp && ((currentTime - orderPointsTimeStamp) > recalcOrderPointsInterval))) {
  //     recalcVal = true;
  //   }
  // }
  return false;
};

const updateCartInfo = (store, cartInfo, isUpdateCartItems) => {
  const getRewardPoints = {
    estimatedRewards: cartInfo.estimatedRewards,
    earnedReward: cartInfo.earnedReward,
    pointsToNextReward: cartInfo.pointsToNextReward,
  };
  const actions = [
    getSetCurrentOrderIdActn(cartInfo.orderId),
    getSetEstimatedAirMilesActn(cartInfo.estimatedAirMiles),
    setShippingTotal(cartInfo.shippingTotal),
    getSetGiftWrappingTotalActn(cartInfo.giftWrappingTotal),
    getSetGiftCardTotalActn(cartInfo.giftCardsTotal),
    setTaxesTotal(cartInfo.totalTax),
    setSavingsTotal(cartInfo.savingsTotal),
    getSetCouponsTotalActn(cartInfo.couponsTotal),
    getSetItemsTotalAction(cartInfo.orderTotalAfterDiscount),
    cartInfo.totalItems !== null && setItemsCount(cartInfo.totalItems),
    getSetSubTotal(cartInfo.subTotal),
    getSetSubTotalWithDiscountsActn(cartInfo.subTotalWithDiscounts),
    getSetGrandTotal(cartInfo.grandTotal),
    getSetGiftCardValuesActn(cartInfo.appliedGiftCards),
    getSetRewardsToBeEarnedActn(cartInfo.rewardsToBeEarned),
    getSetPointsAndRewardsActn(getRewardPoints),
    setCartTotalAfterPLCCDiscount(cartInfo.cartTotalAfterPLCCDiscount),
  ];

  if (isUpdateCartItems) {
    actions.push(getSetCartActn(cartInfo.orderItems));
    actions.push(getSetCartStoreActn(cartInfo.stores));
  }

  if (cartInfo.uiFlags) {
    actions.push(getSetIsPayPalEnabledActn(cartInfo.uiFlags.isPaypalEnabled));
  }

  if (cartInfo.airmiles) {
    actions.push(getSetAirmilesPromoIdActn(cartInfo.airmiles.promoId));
    actions.push(getSetAirmilesAccountActn(cartInfo.airmiles.accountNumber));
  }

  /* Sometimes this function is used in another function to do bulk dispaches.
   * In this case we can just export all these actions so we can dispatch in one bulk.
   */
  return actions;
};

export default {
  getOrderPointsRecalcFlag,
  updateCartInfo,
};
