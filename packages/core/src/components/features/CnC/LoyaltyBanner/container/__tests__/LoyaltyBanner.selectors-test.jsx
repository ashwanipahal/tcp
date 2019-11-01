import { fromJS } from 'immutable';
import { getThresholdValue, cartOrderDetails } from '../LoyaltyBanner.selectors';

describe('#loyaltyBanner Selectors', () => {
  it('#loyaltyBanner should return siteDetails', () => {
    const session = {
      siteDetails: {
        PLCC_MARKETING_BAG_TOTAL_CUT_OFF: 0,
      },
    };
    const state = {
      session,
    };
    expect(getThresholdValue(state)).toEqual(session.siteDetails.PLCC_MARKETING_BAG_TOTAL_CUT_OFF);
  });

  it('#loyaltyBanner should return cartOrderDetails', () => {
    const CartPageReducer = fromJS({
      orderDetails: {
        estimatedRewards: 0,
        subTotalWithDiscounts: 0,
        earnedReward: 0,
        subTotal: 0,
      },
    });
    const cartOrderDetailsObj = fromJS({
      estimatedRewards: 0,
      subTotalWithDiscounts: 0,
      earnedReward: 0,
      subTotal: 0,
    });
    const state = {
      CartPageReducer,
    };
    const estimatedRewards = cartOrderDetailsObj.get('estimatedRewards');
    const subTotal = cartOrderDetailsObj.get('subTotal');
    const earnedReward = cartOrderDetailsObj.get('earnedReward');
    const subTotalWithDiscounts = cartOrderDetailsObj.get('subTotalWithDiscounts');
    expect(cartOrderDetails(state)).toEqual({
      estimatedRewards,
      subTotal,
      earnedReward,
      subTotalWithDiscounts,
    });
  });
});
