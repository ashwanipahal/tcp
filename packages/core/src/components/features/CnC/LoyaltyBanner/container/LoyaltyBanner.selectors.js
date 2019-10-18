import { createSelector } from 'reselect';
import { getCartOrderDetails } from '../../CartItemTile/container/CartItemTile.selectors';

const getThresholdValue = state => {
  return state.session && state.session.siteDetails.PLCC_MARKETING_BAG_TOTAL_CUT_OFF;
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

export const getLoyaltyBannerLabels = state => {
  const {
    global: {
      loyalityBanner: {
        lbl_loyaltyBanner_youCanEarnPoints: youCanEarnPoints,
        lbl_loyaltyBanner_youllEarnPoints: youllEarnPoints,
        lbl_loyaltyBanner_becomeMemberOnThisPurchase: becomeMemberOnThisPurchase,
        lbl_loyaltyBanner_youllGetWithThisPurchase: youllGetWithThisPurchase,
        lbl_loyaltyBanner_youllEarnPointsPlcc: youllEarnPointsPlcc,
        lbl_loyaltyBanner_youllGetARewardPlcc: youllGetARewardPlcc,
        lbl_loyaltyBanner_whenYouCheckOutPlcc: whenYouCheckOutPlcc,
        lbl_loyaltyBanner_thatsSomePointsFromReward: thatsSomePointsFromReward,
        lbl_loyaltyBanner_save30Today: save30Today,
        lbl_loyaltyBanner_earnDoublePoints: earnDoublePoints,
        lbl_loyaltyBanner_currentSubtotal: currentSubtotal,
        lbl_loyaltyBanner_estimatedSubtotal: estimatedSubtotal,
        lbl_loyaltyBanner_applyNow: applyNow,
        lbl_loyaltyBanner_learnMore: learnMore,
        lbl_loyaltyBanner_logIn: logIn,
        lbl_loyaltyBanner_getRewardedShopping: getRewardedShopping,
        lbl_loyaltyBanner_loyaltyPayPoints: loyaltyPayPoints,
        lbl_loyaltyBanner_createAccount: createAccount,
        lbl_loyaltyBanner_earnDoublePointsPDP: earnDoublePointsPDP,
        lbl_loyaltyBanner_getDoublePointsPLCCPDP: getDoublePointsPLCCPDP,
        lbl_loyaltyBanner_myPlaceCreditCard: myPlaceCreditCard,
        lbl_loyaltyBanner_checkoutMyPlaceCreditCard: checkoutMyPlaceCreditCard,
      } = {},
    } = {},
  } = state.Labels;

  return {
    youCanEarnPoints,
    youllEarnPoints,
    becomeMemberOnThisPurchase,
    youllGetWithThisPurchase,
    youllEarnPointsPlcc,
    youllGetARewardPlcc,
    whenYouCheckOutPlcc,
    thatsSomePointsFromReward,
    save30Today,
    earnDoublePoints,
    currentSubtotal,
    estimatedSubtotal,
    applyNow,
    learnMore,
    logIn,
    getRewardedShopping,
    loyaltyPayPoints,
    createAccount,
    earnDoublePointsPDP,
    getDoublePointsPLCCPDP,
    myPlaceCreditCard,
    checkoutMyPlaceCreditCard,
  };
};

export { getThresholdValue, cartOrderDetails };
