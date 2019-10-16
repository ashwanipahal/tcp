import { loadComponentLabelsData } from '@tcp/core/src/reduxStore/actions';
import { LABELS } from '@tcp/core/src/reduxStore/constants';
import constants from '../Checkout.constants';

/**
 * @function initCheckoutAction
 * action creator for type: INIT_CHECKOUT
 */
export const initCheckoutAction = router => ({
  type: constants.INIT_CHECKOUT,
  router,
});

export const submitPickupSection = payload => ({
  type: 'CHECKOUT_SUBMIT_PICKUP_DATA',
  payload,
});

export const checkoutSetCartData = payload => ({
  type: 'CHECKOUT_SET_CART_DATA',
  payload,
});

export const updateShipmentMethodSelection = payload => ({
  type: constants.CHECKOUT_UPDATE_SHIPMENT_METHOD_SELECTION,
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

export function getSetCheckoutStage(payload) {
  return {
    payload,
    type: 'CHECKOUT_UIFLAGS_SET_STAGE',
  };
}

export function getSetShippingValuesActn(shipping) {
  return {
    shipping,
    type: 'CHECKOUT_VALUES_SET_SHIPPING',
  };
}

export function getSetBillingValuesActn(billing) {
  return {
    billing,
    type: 'CHECKOUT_VALUES_SET_BILLING',
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

export function fetchShipmentMethods({ ...params } = {}) {
  return {
    type: constants.CHECKOUT_LOAD_SHIPMENT_METHODS,
    ...params,
  };
}

export const emailSignupStatus = payload => {
  return {
    payload,
    type: 'EMAIL_SUBSCRIPTION_STATUS',
  };
};

export const routeToPickupPage = () => {
  return {
    type: constants.ROUTE_TO_PICKUP_PAGE,
  };
};

export const initActions = [loadComponentLabelsData({ category: LABELS.checkout })];

export const updateShippingAddress = payload => {
  return {
    type: constants.UPDATE_SHIPPING_ADDRESS,
    payload,
  };
};
export function getSetIsBillingVisitedActn(isBillingVisited) {
  return {
    isBillingVisited,
    type: constants.CHECKOUT_FLAGS_SET_BILLING_VISITED,
  };
}

export function submitBillingSection(payload) {
  return {
    payload,
    type: constants.SUBMIT_BILLING_SECTION,
  };
}

export const setGiftCardError = payload => ({ type: constants.SET_GIFTCARD_ERROR, payload });

export const addNewShippingAddress = payload => {
  return {
    type: constants.ADD_NEW_SHIPPING_ADDRESS,
    payload,
  };
};

export const setOnFileAddressKey = payload => {
  // when edit on desktop/mobile and add new address on mobile, response address Id needs to be set on onFileAddreskey so that while submitting we get this addressId, not the previous one
  return {
    type: constants.SET_ON_FILE_ADDRESS_KEY,
    payload,
  };
};
export const resetGiftCardError = () => {
  return {
    type: constants.RESET_GIFTCARD_ERROR,
  };
};

export const setShippingLoadingState = isLoading => {
  return {
    type: constants.CHECKOUT_VALUES_SET_SHIPPING_LOADING,
    isLoading,
  };
};

export const setOrderBalanceTotal = payload => {
  return {
    type: constants.SET_ORDER_TOTAL,
    payload,
  };
};

export const setGiftWrap = payload => {
  return {
    type: 'CHECKOUT_VAlUES_SET_GIFT_WRAP',
    payload,
  };
};

export const getSetIsPaypalPaymentSettings = paypalPaymentSettings => {
  return {
    type: constants.CHECKOUT_ORDER_OPTIONS_SET_PAYPAL_PAYMENT,
    paypalPaymentSettings,
  };
};

export const submitReviewSection = payload => {
  return {
    type: constants.SUBMIT_REVIEW_SECTION,
    payload,
  };
};

export const getVenmoClientToken = payload => {
  return {
    type: constants.GET_VENMO_CLIENT_TOKEN,
    payload,
  };
};

export const setShowGiftCardForm = payload => {
  return {
    type: constants.CHECKOUT_FLAGS_SET_BILLING_ADD_GIFT_CARD_SHOW,
    payload,
  };
};

export const getVenmoClientTokenSuccess = payload => {
  return {
    type: constants.GET_VENMO_CLIENT_TOKEN_SUCCESS,
    payload,
  };
};

export const setHideGiftCardForm = payload => {
  return {
    type: constants.CHECKOUT_FLAGS_SET_BILLING_ADD_GIFT_CARD_HIDE,
    payload,
  };
};

export const getVenmoClientTokenError = payload => {
  return {
    type: constants.GET_VENMO_CLIENT_TOKEN_ERROR,
    payload,
  };
};

export const addGiftCardFailure = payload => {
  return {
    type: constants.ADD_GIFT_CARD_FAILED,
    payload,
  };
};

export const setVenmoData = payload => {
  return {
    type: constants.SET_VENMO_DATA,
    payload,
  };
};

export const submitVerifiedAddressData = payload => {
  return {
    type: constants.CHECKOUT_SUBMIT_VERIFIED_SHIPPING_ADDRESS,
    payload,
  };
};

export const addGiftCardSuccess = payload => {
  return {
    type: constants.ADD_GIFT_CARD_SUCCESS,
    payload,
  };
};

export const setVenmoPaymentInProgress = payload => {
  return {
    type: constants.SET_VENMO_PAYMENT_INPROGRESS,
    payload,
  };
};

export const setVenmoPickupMessageState = payload => {
  return {
    type: constants.SET_VENMO_PICKUP_MESSAGE_STATE,
    payload,
  };
};

export const setVenmoShippingMessageState = payload => {
  return {
    type: constants.SET_VENMO_SHIPPING_MESSAGE_STATE,
    payload,
  };
};

/**
 * Method to save Venmo payment option in redux.
 * @param {boolean} payload
 */
export const setVenmoPaymentOptionSave = payload => {
  return {
    type: constants.SET_VENMO_PAYMENT_OPTION_SAVE,
    payload,
  };
};

export const resetAddGiftCard = payload => {
  return {
    type: constants.RESET_ADD_GIFT_CARD,
    payload,
  };
};

export const resetAddGiftCardSuccess = payload => {
  return {
    type: constants.RESET_ADD_GIFT_CARD_SUCCESS,
    payload,
  };
};
/**
 * @function initIntlCheckoutAction
 *  @param { object } payload
 * action creator for type: INIT_INTL_CHECKOUT
 */
export const initIntlCheckoutAction = payload => ({
  type: constants.INIT_INTL_CHECKOUT,
  payload,
});
/**
 * @function getSetIntlUrl
 *  @param { object } internationalUrl
 * action creator for type: CHECKOUT_ORDER_OPTIONS_SET_INTL_URL
 */
export const getSetIntlUrl = internationalUrl => {
  return {
    internationalUrl,
    type: 'CHECKOUT_ORDER_OPTIONS_SET_INTL_URL',
  };
};
/**
 * @function updateCardData
 *  @param { object } payload
 * action creator for type: UPDATE_CARD_DATA
 */
export const updateCardData = payload => {
  return {
    payload,
    type: constants.UPDATE_CARD_DATA,
  };
};
/**
 * @function resetCheckoutReducer
 * action creator for type: RESET_CHECKOUT_REDUCER
 */
export const resetCheckoutReducer = () => {
  return {
    type: constants.RESET_CHECKOUT_REDUCER,
  };
};
