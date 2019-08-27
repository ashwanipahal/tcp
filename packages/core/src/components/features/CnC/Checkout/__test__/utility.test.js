import Utility from '../util/utility';
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
import { fromJS } from '../../../../../../../../node_modules/immutable';

const { getOrderPointsRecalcFlag, updateCartInfo, isOrderHasPickup } = Utility;

describe('utility', () => {
  it('getOrderPointsRecalcFlag', () => {
    expect(getOrderPointsRecalcFlag()).toBe(false);
  });
  it('updateCartInfo', () => {
    const cartInfo = {
      estimatedRewards: 60,
      earnedReward: 20,
      pointsToNextReward: 20,
      orderId: '123434',
      estimatedAirMiles: 34,
      shippingTotal: 405,
      giftWrappingTotal: 210,
      giftCardsTotal: 540,
      totalTax: 560,
      savingsTotal: 120,
      couponsTotal: 340,
      orderTotalAfterDiscount: 450,
      totalItems: 5,
      subTotal: 560,
      subTotalWithDiscounts: 560,
      grandTotal: 450,
      appliedGiftCards: [],
      rewardsToBeEarned: 34,
      cartTotalAfterPLCCDiscount: 560,
      orderItems: [],
      stores: [],
      uiFlags: {
        isPaypalEnabled: true,
      },
      airmiles: {
        promoId: 1234,
        accountNumber: 45678,
      },
    };
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
      getSetCartActn(cartInfo.orderItems),
      getSetCartStoreActn(cartInfo.stores),
      getSetIsPayPalEnabledActn(cartInfo.uiFlags.isPaypalEnabled),
      getSetAirmilesPromoIdActn(cartInfo.airmiles.promoId),
      getSetAirmilesAccountActn(cartInfo.airmiles.accountNumber),
    ];
    const isUpdateCartItems = true;
    expect(updateCartInfo(cartInfo, isUpdateCartItems)).toEqual(actions);
  });
  it('isOrderHasPickup', () => {
    const cartItems = fromJS({
      miscInfo: {
        store: [{}, {}],
      },
    });
    expect(isOrderHasPickup(cartItems)).toBe(0);
  });
});
