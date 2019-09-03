/* eslint-disable extra-rules/no-commented-out-code */

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

import CheckoutConstants from '../Checkout.constants';

const getOrderPointsRecalcFlag = (/* recalcRewards, recalcOrderPointsInterval */) => {
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

const updateCartInfo = (cartInfo, isUpdateCartItems) => {
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

const hasPOBox = (addressLine1 = '', addressLine2 = '') => {
  // some delimiter that will not allow them to match only if concatenated
  const value = `${addressLine1}#${addressLine2}`;
  // REVIEW: got the regex from: https://gist.github.com/gregferrell/7494667
  // seems to cover most use cases; not in the mood to write it from scratch
  return (
    value.search(
      /\bbox(?:\b$|([\s|-]+)?[0-9]+)|(p[-.\s]*o[-.\s]*|(post office|post)\s)b(\.|ox|in)?\b|(^p[.]?(o|b)[.]?$)/gim
    ) >= 0
  );
};

const isOrderHasShipping = cartItems => {
  return cartItems && cartItems.filter(item => !item.getIn(['miscInfo', 'store'])).size;
};

const isOrderHasPickup = cartItems => {
  return cartItems && cartItems.filter(item => !!item.getIn(['miscInfo', 'store'])).size;
};

const getAvailableStages = cartItems => {
  const result = [CheckoutConstants.CHECKOUT_STAGES.BILLING, CheckoutConstants.CHECKOUT_STAGES.REVIEW];
  if (isOrderHasShipping(cartItems)) {
    result.unshift(CheckoutConstants.CHECKOUT_STAGES.SHIPPING);
  }
  if (isOrderHasPickup(cartItems)) {
    result.unshift(CheckoutConstants.CHECKOUT_STAGES.PICKUP);
  }
  return result;
};



export default {
  getOrderPointsRecalcFlag,
  updateCartInfo,
  hasPOBox,
  isOrderHasPickup,
  getAvailableStages,
};
