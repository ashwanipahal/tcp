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
        lbl_loyaltyBanner_oneDollarSpent: oneDollarSpent,
        lbl_loyaltyBanner_guestReviewYouCanEarn: guestReviewYouCanEarn,
        lbl_loyaltyBanner_guestReviewBecomeMember: guestReviewBecomeMember,
        lbl_loyaltyBanner_mprReviewYoullEarn: mprReviewYoullEarn,
        lbl_loyaltyBanner_mprReviewYoullGet: mprReviewYoullGet,
        lbl_loyaltyBanner_plccReviewYoullEarn: plccReviewYoullEarn,
        lbl_loyaltyBanner_plccReviewYoullGet: plccReviewYoullGet,
        lbl_loyaltyBanner_plccReviewWhenYouCheck: plccReviewWhenYouCheck,
        lbl_loyaltyBanner_plccReviewThatsSomePoints: plccReviewThatsSomePoints,
        lbl_loyaltyBanner_sectionSymbol: sectionSymbol,
        lbl_loyaltyBanner_asteriskSymbol: asteriskSymbol,
        lbl_loyaltyBanner_guestConfirmationSignUp: guestConfirmationSignUp,
        lbl_loyaltyBanner_guestConfirmationBecomeMember: guestConfirmationBecomeMember,
        lbl_loyaltyBanner_guestConfirmationCreateMyPlaceRewards: guestConfirmationCreateMyPlaceRewards,
        lbl_loyaltyBanner_guestConfirmationLogIn: guestConfirmationLogIn,
        lbl_loyaltyBanner_mprConfirmationYouEarnedPoints: mprConfirmationYouEarnedPoints,
        lbl_loyaltyBanner_mprConfirmationThatsSomePoints: mprConfirmationThatsSomePoints,
        lbl_loyaltyBanner_mprConfirmationYouEarnedReward: mprConfirmationYouEarnedReward,
        lbl_loyaltyBanner_plccConfirmationYouEarnedPoints: plccConfirmationYouEarnedPoints,
        lbl_loyaltyBanner_plccConfirmationYoureSomePoints: plccConfirmationYoureSomePoints,
        lbl_loyaltyBanner_plccConfirmationYouEarnedReward: plccConfirmationYouEarnedReward,
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
    oneDollarSpent,
    guestReviewYouCanEarn,
    guestReviewBecomeMember,
    mprReviewYoullEarn,
    mprReviewYoullGet,
    plccReviewYoullEarn,
    plccReviewYoullGet,
    plccReviewWhenYouCheck,
    plccReviewThatsSomePoints,
    sectionSymbol,
    asteriskSymbol,
    guestConfirmationSignUp,
    guestConfirmationBecomeMember,
    guestConfirmationCreateMyPlaceRewards,
    guestConfirmationLogIn,
    mprConfirmationYouEarnedPoints,
    mprConfirmationThatsSomePoints,
    mprConfirmationYouEarnedReward,
    plccConfirmationYouEarnedPoints,
    plccConfirmationYoureSomePoints,
    plccConfirmationYouEarnedReward,
  };
};

export { getThresholdValue, cartOrderDetails };
