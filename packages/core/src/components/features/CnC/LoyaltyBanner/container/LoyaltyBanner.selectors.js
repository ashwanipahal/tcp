import { createSelector } from 'reselect';
import { getCartOrderDetails } from '../../CartItemTile/container/CartItemTile.selectors';

const getThresholdValue = state => {
  return state.session && state.session.getIn(['siteDetails', 'PLCC_MARKETING_BAG_TOTAL_CUT_OFF']);
};

const cartOrderDetails = createSelector(
  getCartOrderDetails,
  cartOrderDetailsObj => {
    const estimatedRewards = cartOrderDetailsObj.get('estimatedRewards');
    const subTotal = cartOrderDetailsObj.get('subTotalWithDiscounts');
    const cartTotalAfterPLCCDiscount = cartOrderDetailsObj.get('cartTotalAfterPLCCDiscount');
    const earnedReward = cartOrderDetailsObj.get('earnedReward');
    const pointsToNextReward = cartOrderDetailsObj.get('pointsToNextReward');
    return {
      estimatedRewards,
      subTotal,
      cartTotalAfterPLCCDiscount,
      earnedReward,
      pointsToNextReward,
    };
  }
);

export { getThresholdValue, cartOrderDetails };
