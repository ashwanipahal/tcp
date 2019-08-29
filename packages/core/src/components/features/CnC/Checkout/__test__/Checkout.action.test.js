import {
  initCheckoutAction,
  submitPickupSection,
  checkoutSetCartData,
  getSetGiftWrapOptionsActn,
  getSetPickupValuesActn,
  getSetPickupAltValuesActn,
  getSetShippingValuesActn,
  getSetCurrentOrderIdActn,
  getSetEstimatedAirMilesActn,
  setShippingTotal,
  getSetGiftWrappingTotalActn,
  getSetGiftCardTotalActn,
  setTaxesTotal,
  setSavingsTotal,
  getSetCouponsTotalActn,
  getSetItemsTotalAction,
  getSetSubTotal,
  getSetSubTotalWithDiscountsActn,
  getSetGrandTotal,
  getSetRewardsToBeEarnedActn,
  getSetPointsAndRewardsActn,
  setCartTotalAfterPLCCDiscount,
  getSetGiftCardValuesActn,
  getSetCartActn,
  getSetCartStoreActn,
  getSetIsPayPalEnabledActn,
  getSetAirmilesPromoIdActn,
  getSetAirmilesAccountActn,
  setItemsCount,
  setIsLoadingShippingMethods,
  setShippingOptions,
  submitShippingSection,
  setAddressError,
  setSmsNumberForUpdates,
  onEditModeChangeAction,
} from '../container/Checkout.action';

describe('#chekcoutActions', () => {
  it('initCheckoutAction', () => {
    expect(initCheckoutAction()).toEqual({ type: 'INIT_CHECKOUT' });
  });
  it('submitPickupSection', () => {
    expect(submitPickupSection()).toEqual({
      payload: undefined,
      type: 'CHECKOUT_SUBMIT_PICKUP_DATA',
    });
  });
  it('checkoutSetCartData', () => {
    expect(checkoutSetCartData()).toEqual({ payload: undefined, type: 'CHECKOUT_SET_CART_DATA' });
  });
  it('getSetGiftWrapOptionsActn', () => {
    expect(getSetGiftWrapOptionsActn()).toEqual({
      giftWrapOptions: undefined,
      type: 'CHECKOUT_ORDER_OPTIONS_SET_GIFT_WRAP',
    });
  });
  it('getSetPickupValuesActn', () => {
    expect(getSetPickupValuesActn()).toEqual({
      pickUpContact: undefined,
      type: 'CHECKOUT_VALUES_SET_PICKUP',
    });
  });
  it('getSetPickupAltValuesActn', () => {
    expect(getSetPickupAltValuesActn()).toEqual({
      pickUpAlternative: undefined,
      type: 'CHECKOUT_VALUES_SET_PICKUP_ALT',
    });
  });
  it('getSetShippingValuesActn', () => {
    expect(getSetShippingValuesActn()).toEqual({
      shipping: undefined,
      type: 'CHECKOUT_VALUES_SET_SHIPPING',
    });
  });
  it('getSetCurrentOrderIdActn', () => {
    expect(getSetCurrentOrderIdActn()).toEqual({
      orderId: undefined,
      type: 'CART_SUMMARY_SET_ORDER_ID',
    });
  });
  it('getSetEstimatedAirMilesActn', () => {
    expect(getSetEstimatedAirMilesActn()).toEqual({
      estimatedAirMiles: undefined,
      type: 'CART_SUMMARY_SET_ESTIMATED_AIRMILES',
    });
  });
  it('setShippingTotal', () => {
    expect(setShippingTotal()).toEqual({
      shippingTotal: undefined,
      type: 'CART_SUMMARY_SET_SHIPPINGTOTAL',
    });
  });
  it('getSetGiftWrappingTotalActn', () => {
    expect(getSetGiftWrappingTotalActn()).toEqual({
      giftWrappingTotal: undefined,
      type: 'CART_SUMMARY_SET_GIFTWRAP_TOTAL',
    });
  });
  it('getSetGiftCardTotalActn', () => {
    expect(getSetGiftCardTotalActn()).toEqual({
      giftCardsTotal: undefined,
      type: 'CART_SUMMARY_SET_GIFTCARD_TOTAL',
    });
  });
  it('setTaxesTotal', () => {
    expect(setTaxesTotal()).toEqual({ taxesTotal: undefined, type: 'CART_SUMMARY_SET_TAXESTOTAL' });
  });
  it('setSavingsTotal', () => {
    expect(setSavingsTotal()).toEqual({
      savingsTotal: undefined,
      type: 'CART_SUMMARY_SET_SAVINGSTOTAL',
    });
  });
  it('getSetCouponsTotalActn', () => {
    expect(getSetCouponsTotalActn()).toEqual({
      couponsTotal: undefined,
      type: 'CART_SUMMARY_SET_COUPONSTOTAL',
    });
  });
  it('getSetItemsTotalAction', () => {
    expect(getSetItemsTotalAction()).toEqual({
      itemsTotal: undefined,
      type: 'CART_SUMMARY_SET_ITEMS_TOTAL',
    });
  });
  it('getSetSubTotal', () => {
    expect(getSetSubTotal()).toEqual({ subTotal: undefined, type: 'CART_SUMMARY_SET_SUBTOTAL' });
  });
  it('getSetSubTotalWithDiscountsActn', () => {
    expect(getSetSubTotalWithDiscountsActn()).toEqual({
      subTotalWithDiscounts: undefined,
      type: 'CART_SUMMARY_SET_SUBTOTAL_WITH_DISCOUNTS',
    });
  });
  it('getSetGrandTotal', () => {
    expect(getSetGrandTotal()).toEqual({
      grandTotal: undefined,
      type: 'CART_SUMMARY_SET_GRANDTOTAL',
    });
  });
  it('getSetRewardsToBeEarnedActn', () => {
    expect(getSetRewardsToBeEarnedActn()).toEqual({
      rewardsToBeEarned: undefined,
      type: 'CART_SUMMARY_SET_REWARDS_TO_BE_EARNED',
    });
  });
  it('getSetPointsAndRewardsActn', () => {
    expect(getSetPointsAndRewardsActn()).toEqual({
      getRewardPoints: undefined,
      type: 'CART_SUMMARY_SET_POINTS_AND_REWARDS',
    });
  });
  it('setCartTotalAfterPLCCDiscount', () => {
    expect(setCartTotalAfterPLCCDiscount()).toEqual({
      payload: undefined,
      type: 'CART_SUMMARY_SET_CART_TOTALS_AFTER_PLCC_DISCOUNT',
    });
  });
  it('getSetGiftCardValuesActn', () => {
    expect(getSetGiftCardValuesActn()).toEqual({
      giftCards: undefined,
      type: 'CHECKOUT_VALUES_SET_GIFTCARDS',
    });
  });
  it('getSetCartActn', () => {
    expect(getSetCartActn()).toEqual({ newItem: undefined, type: 'CART_ITEMS_SET_CART' });
  });
  it('getSetCartStoreActn', () => {
    expect(getSetCartStoreActn()).toEqual({ newStore: undefined, type: 'CART_STORES_SET_STORE' });
  });
  it('getSetIsPayPalEnabledActn', () => {
    expect(getSetIsPayPalEnabledActn()).toEqual({
      isPayPalEnabled: undefined,
      type: 'CART_OPERATION_SET_IS_PAYPAL_ENABLED',
    });
  });
  it('getSetAirmilesPromoIdActn', () => {
    expect(getSetAirmilesPromoIdActn()).toEqual({
      promoId: undefined,
      type: 'USER_PERSONALDATA_SET_AIRMILES_PROMO',
    });
  });
  it('getSetAirmilesAccountActn', () => {
    expect(getSetAirmilesAccountActn()).toEqual({
      accountNumber: undefined,
      type: 'USER_PERSONALDATA_SET_AIRMILES_ACCOUNT',
    });
  });
  it('setItemsCount', () => {
    expect(setItemsCount()).toEqual({ itemsCount: undefined, type: 'CART_SUMMARY_SET_ITEMCOUNT' });
  });
  it('setIsLoadingShippingMethods', () => {
    expect(setIsLoadingShippingMethods()).toEqual({
      isLoading: undefined,
      type: 'CHECKOUT_FLAGS_SET_LOAD_METHODS',
    });
  });
  it('setShippingOptions', () => {
    expect(setShippingOptions()).toEqual({
      shippingMethods: undefined,
      type: 'CHECKOUT_ORDER_OPTIONS_SET_SHIPPING',
    });
  });
  it('submitShippingSection', () => {
    expect(submitShippingSection()).toEqual({
      payload: undefined,
      type: 'SUBMIT_SHIPPING_SECTION',
    });
  });
  it('setAddressError', () => {
    expect(setAddressError()).toEqual({
      addressError: undefined,
      type: 'CHECKOUT_FLAGS_SET_ADDRESS_ERROR',
    });
  });
  it('setSmsNumberForUpdates', () => {
    expect(setSmsNumberForUpdates()).toEqual({
      phoneNumber: undefined,
      type: 'CHECKOUT_VALUES_SET_SMS_UPDATES',
    });
  });
  it('onEditModeChangeAction', () => {
    expect(onEditModeChangeAction()).toEqual({
      isEditingSubform: undefined,
      type: 'CHECKOUT_FLAGS_SET_EDITING_SUBFORM',
    });
  });
});
