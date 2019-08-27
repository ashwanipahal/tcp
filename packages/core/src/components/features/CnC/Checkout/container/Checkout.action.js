import constants from '../Checkout.constants';

export const initCheckoutAction = () => ({
  type: constants.INIT_CHECKOUT,
});

export const submitPickupSection = payload => ({
  type: 'CHECKOUT_SUBMIT_PICKUP_DATA',
  payload,
});

export const checkoutSetCartData = payload => ({
  type: 'CHECKOUT_SET_CART_DATA',
  payload,
});

export function getSetGiftWrapOptionsActn(giftWrapOptions) {
  return {
    giftWrapOptions,
    type: 'CHECKOUT_ORDER_OPTIONS_SET_GIFT_WRAP',
  };
}

export function getSetPickupValuesActn(pickup) {
  return {
    pickUpContact: pickup,
    type: 'CHECKOUT_VALUES_SET_PICKUP',
  };
}

export function getSetPickupAltValuesActn(pickup) {
  return {
    pickUpAlternative: pickup,
    type: 'CHECKOUT_VALUES_SET_PICKUP_ALT',
  };
}

export function getSetShippingValuesActn(shipping) {
  return {
    shipping,
    type: 'CHECKOUT_VALUES_SET_SHIPPING',
  };
}

export function getSetCurrentOrderIdActn(orderId) {
  return {
    orderId,
    type: 'CART_SUMMARY_SET_ORDER_ID',
  };
}

export function getSetEstimatedAirMilesActn(estimatedAirMiles) {
  return {
    estimatedAirMiles,
    type: 'CART_SUMMARY_SET_ESTIMATED_AIRMILES',
  };
}
export function setShippingTotal(shippingTotal) {
  return {
    shippingTotal,
    type: 'CART_SUMMARY_SET_SHIPPINGTOTAL',
  };
}

export function getSetGiftWrappingTotalActn(giftWrappingTotal) {
  return {
    giftWrappingTotal,
    type: 'CART_SUMMARY_SET_GIFTWRAP_TOTAL',
  };
}

export function getSetGiftCardTotalActn(giftCardsTotal) {
  return {
    giftCardsTotal,
    type: 'CART_SUMMARY_SET_GIFTCARD_TOTAL',
  };
}

export function setTaxesTotal(taxesTotal) {
  return {
    taxesTotal,
    type: 'CART_SUMMARY_SET_TAXESTOTAL',
  };
}

export function setSavingsTotal(savingsTotal) {
  return {
    savingsTotal,
    type: 'CART_SUMMARY_SET_SAVINGSTOTAL',
  };
}

export function getSetCouponsTotalActn(couponsTotal) {
  return {
    couponsTotal,
    type: 'CART_SUMMARY_SET_COUPONSTOTAL',
  };
}

export function getSetItemsTotalAction(itemsTotal) {
  return {
    itemsTotal,
    type: 'CART_SUMMARY_SET_ITEMS_TOTAL',
  };
}

export function getSetSubTotal(subTotal) {
  return {
    subTotal,
    type: 'CART_SUMMARY_SET_SUBTOTAL',
  };
}

export function getSetSubTotalWithDiscountsActn(subTotalWithDiscounts) {
  return {
    subTotalWithDiscounts,
    type: 'CART_SUMMARY_SET_SUBTOTAL_WITH_DISCOUNTS',
  };
}

export function getSetGrandTotal(grandTotal) {
  return {
    grandTotal,
    type: 'CART_SUMMARY_SET_GRANDTOTAL',
  };
}

export function getSetRewardsToBeEarnedActn(rewardsToBeEarned) {
  return {
    rewardsToBeEarned,
    type: 'CART_SUMMARY_SET_REWARDS_TO_BE_EARNED',
  };
}

export function getSetPointsAndRewardsActn(getRewardPoints) {
  return {
    getRewardPoints,
    type: 'CART_SUMMARY_SET_POINTS_AND_REWARDS',
  };
}

export function setCartTotalAfterPLCCDiscount(payload) {
  return {
    type: 'CART_SUMMARY_SET_CART_TOTALS_AFTER_PLCC_DISCOUNT',
    payload,
  };
}

export function getSetGiftCardValuesActn(giftCards) {
  return {
    giftCards,
    type: 'CHECKOUT_VALUES_SET_GIFTCARDS',
  };
}

export function getSetCartActn(newItem) {
  return {
    newItem,
    type: 'CART_ITEMS_SET_CART',
  };
}

export function getSetCartStoreActn(newStore) {
  return {
    newStore,
    type: 'CART_STORES_SET_STORE',
  };
}

export function getSetIsPayPalEnabledActn(isPayPalEnabled) {
  return {
    isPayPalEnabled,
    type: 'CART_OPERATION_SET_IS_PAYPAL_ENABLED',
  };
}

export function getSetAirmilesPromoIdActn(promoId) {
  return {
    promoId,
    type: 'USER_PERSONALDATA_SET_AIRMILES_PROMO',
  };
}

export function getSetAirmilesAccountActn(accountNumber) {
  return {
    accountNumber,
    type: 'USER_PERSONALDATA_SET_AIRMILES_ACCOUNT',
  };
}

export function setItemsCount(itemsCount) {
  return {
    itemsCount,
    type: 'CART_SUMMARY_SET_ITEMCOUNT',
  };
}

export function setIsLoadingShippingMethods(isLoading) {
  return {
    isLoading,
    type: constants.CHECKOUT_FLAGS_SET_LOAD_METHODS,
  };
}

export function setShippingOptions(shippingMethods) {
  return {
    shippingMethods,
    type: constants.CHECKOUT_ORDER_OPTIONS_SET_SHIPPING,
  };
}

export function submitShippingSection(payload) {
  return {
    type: constants.SUBMIT_SHIPPING_SECTION,
    payload,
  };
}

export function setAddressError(addressError) {
  return {
    addressError,
    type: constants.CHECKOUT_FLAGS_SET_ADDRESS_ERROR,
  };
}

export function setSmsNumberForUpdates(phoneNumber) {
  return {
    phoneNumber,
    type: constants.CHECKOUT_VALUES_SET_SMS_UPDATES,
  };
}

export function onEditModeChangeAction(isEditingSubform) {
  return {
    isEditingSubform,
    type: 'CHECKOUT_FLAGS_SET_EDITING_SUBFORM',
  };
}

export function fetchShipmentMethods() {
  return {
    type: constants.CHECKOUT_LOAD_SHIPMENT_METHODS,
  };
}

export const emailSignupStatus = payload => {
  return {
    payload,
    type: 'EMAIL_SUBSCRIPTION_STATUS',
  };
};
