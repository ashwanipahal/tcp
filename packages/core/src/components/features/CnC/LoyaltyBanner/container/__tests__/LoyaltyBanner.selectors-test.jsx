import { fromJS } from 'immutable';
import { getThresholdValue, cartOrderDetails } from '../LoyaltyBanner.selectors';

describe('#loyaltyBanner Selectors', () => {
  it('#loyaltyBanner should return siteDetails', () => {
    const session = fromJS({
      siteDetails: {
        PLCC_MARKETING_BAG_TOTAL_CUT_OFF: 0,
      },
    });
    const state = {
      session,
    };
    expect(getThresholdValue(state)).toEqual(
      session.getIn(['siteDetails', 'PLCC_MARKETING_BAG_TOTAL_CUT_OFF'])
    );
  });

  it('#loyaltyBanner should return cartOrderDetails', () => {
    const CartPageReducer = fromJS({
      orderDetails: {
        estimatedRewards: 0,
        subTotalWithDiscounts: 0,
        earnedReward: 0,
        cartTotalAfterPLCCDiscount: 0,
      },
    });
    const cartOrderDetailsObj = fromJS({
      estimatedRewards: 0,
      subTotalWithDiscounts: 0,
      earnedReward: 0,
      cartTotalAfterPLCCDiscount: 0,
    });
    const state = {
      CartPageReducer,
    };
    const estimatedRewards = cartOrderDetailsObj.get('estimatedRewards');
    const subTotal = cartOrderDetailsObj.get('subTotalWithDiscounts');
    const earnedReward = cartOrderDetailsObj.get('earnedReward');
    const cartTotalAfterPLCCDiscount = cartOrderDetailsObj.get('cartTotalAfterPLCCDiscount');
    expect(cartOrderDetails(state)).toEqual({
      estimatedRewards,
      subTotal,
      earnedReward,
      cartTotalAfterPLCCDiscount,
    });
  });
});
