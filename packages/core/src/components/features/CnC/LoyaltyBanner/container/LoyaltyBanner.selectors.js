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
        lbl_loyaltyBanner_currentSubtotal: currentSubtotal,
        lbl_loyaltyBanner_estimatedSubtotal: estimatedSubtotal,
        lbl_loyaltyBanner_applyNow: applyNow,
        lbl_loyaltyBanner_learnMore: learnMore,
        lbl_loyaltyBanner_logIn: logIn,

        lbl_loyaltyBanner_sectionSymbol: sectionSymbol,
        lbl_loyaltyBanner_asteriskSymbol: asteriskSymbol,

        lbl_banner_added2bag_guest_points_label1: added2bagGuestPointsHeading,
        lbl_banner_added2bag_guest_points_label2: added2bagGuestPointsSubHeading,
        lbl_banner_added2bag_guest_rewards_label1: added2bagGuestRewardsHeading,
        lbl_banner_added2bag_guest_rewards_label2: added2bagGuestRewardsSubHeading,
        lbl_banner_added2bag_mpr_points_label1: added2bagMprPointsHeading,
        lbl_banner_added2bag_mpr_points_label2: added2bagMprPointsSubHeading,
        lbl_banner_added2bag_mpr_points_label3: added2bagMprPointsDescription,
        lbl_banner_added2bag_mpr_rewards_label1: added2bagMprRewardsHeading,
        lbl_banner_added2bag_mpr_rewards_label2: added2bagMprRewardsDescription,
        lbl_banner_added2bag_plcc_points_label1: added2bagPlccPointsHeading,
        lbl_banner_added2bag_plcc_points_label2: added2bagPlccPointsDescription,
        lbl_banner_added2bag_plcc_rewards_label1: added2bagPlccRewardsHeading,
        lbl_banner_added2bag_plcc_rewards_label2: added2bagPlccRewardsDescription,

        lbl_banner_bag_guest_points_label1: bagGuestPointsHeading,
        lbl_banner_bag_guest_points_label2: bagGuestPointsSubHeading,
        lbl_banner_bag_guest_points_label3: bagGuestPointsDescription,
        lbl_banner_bag_guest_rewards_label1: bagGuestRewardsHeading,
        lbl_banner_bag_guest_rewards_label2: bagGuestRewardsSubHeading,
        lbl_banner_bag_guest_rewards_label3: bagGuestRewardsDescription,
        lbl_banner_bag_mpr_points_label1: bagMprPointsHeading,
        lbl_banner_bag_mpr_points_label2: bagMprPointsSubHeading,
        lbl_banner_bag_mpr_points_label3: bagMprPointsDescription,
        lbl_banner_bag_mpr_rewards_label1: bagMprRewardsHeading,
        lbl_banner_bag_mpr_rewards_label2: bagMprRewardsSubHeading,
        lbl_banner_bag_mpr_rewards_label3: bagMprRewardsDescription,
        lbl_banner_bag_plcc_points_label1: bagPlccPointsHeading,
        lbl_banner_bag_plcc_points_label2: bagPlccPointsDescription,
        lbl_banner_bag_plcc_points_label3: bagPlccPointsRemaining,
        lbl_banner_bag_plcc_rewards_label1: bagPlccRewardsHeading,
        lbl_banner_bag_plcc_rewards_label2: bagPlccRewardsSubHeading,

        lbl_banner_review_guest_points_label1: reviewGuestPointsHeading,
        lbl_banner_review_guest_points_label2: reviewGuestPointsSubHeading,
        lbl_banner_review_guest_rewards_label1: reviewGuestRewardsHeading,
        lbl_banner_review_guest_rewards_label2: reviewGuestRewardsSubHeading,
        lbl_banner_review_mpr_points_label1: reviewMprPointsHeading,
        lbl_banner_review_mpr_rewards_label1: reviewMprRewardsHeading,
        lbl_banner_review_plcc_points_label1: reviewPlccPointsHeading,
        lbl_banner_review_plcc_points_label2: reviewPlccPointsDescription,
        lbl_banner_review_plcc_points_label3: reviewPlccPointsRemaining,
        lbl_banner_review_plcc_rewards_label1: reviewPlccRewardsHeading,
        lbl_banner_review_plcc_rewards_label2: reviewPlccRewardsDescription,

        lbl_banner_confirmation_guest_points_label1: confirmationGuestPointsHeading,
        lbl_banner_confirmation_guest_rewards_label1: confirmationGuestRewardsHeading,
        lbl_banner_confirmation_guest_rewards_label2: confirmationGuestRewardsSubHeading,
        lbl_banner_confirmation_mpr_points_label1: confirmationMprPointsHeading,
        lbl_banner_confirmation_mpr_points_label2: confirmationMprPointsRemaining,
        lbl_banner_confirmation_mpr_rewards_label1: confirmationMprRewardsHeading,
        lbl_banner_confirmation_plcc_points_label1: confirmationPlccPointsHeading,
        lbl_banner_confirmation_plcc_points_label2: confirmationPlccPointsRemaining,
        lbl_banner_confirmation_plcc_rewards_label1: confirmationPlccRewardsHeading,
      } = {},
    } = {},
  } = state.Labels;

  return {
    currentSubtotal,
    estimatedSubtotal,
    applyNow,
    learnMore,
    logIn,

    sectionSymbol,
    asteriskSymbol,

    added2bagGuestPointsHeading,
    added2bagGuestPointsSubHeading,
    added2bagGuestRewardsHeading,
    added2bagGuestRewardsSubHeading,
    added2bagMprPointsHeading,
    added2bagMprPointsSubHeading,
    added2bagMprPointsDescription,
    added2bagMprRewardsHeading,
    added2bagMprRewardsDescription,
    added2bagPlccPointsHeading,
    added2bagPlccPointsDescription,
    added2bagPlccRewardsHeading,
    added2bagPlccRewardsDescription,

    bagGuestPointsHeading,
    bagGuestPointsSubHeading,
    bagGuestPointsDescription,
    bagGuestRewardsHeading,
    bagGuestRewardsSubHeading,
    bagGuestRewardsDescription,
    bagMprPointsHeading,
    bagMprPointsSubHeading,
    bagMprPointsDescription,
    bagMprRewardsHeading,
    bagMprRewardsSubHeading,
    bagMprRewardsDescription,
    bagPlccPointsHeading,
    bagPlccPointsDescription,
    bagPlccPointsRemaining,
    bagPlccRewardsHeading,
    bagPlccRewardsSubHeading,

    reviewGuestPointsHeading,
    reviewGuestPointsSubHeading,
    reviewGuestRewardsHeading,
    reviewGuestRewardsSubHeading,
    reviewMprPointsHeading,
    reviewMprRewardsHeading,
    reviewPlccPointsHeading,
    reviewPlccPointsDescription,
    reviewPlccPointsRemaining,
    reviewPlccRewardsHeading,
    reviewPlccRewardsDescription,

    confirmationGuestPointsHeading,
    confirmationGuestRewardsHeading,
    confirmationGuestRewardsSubHeading,
    confirmationMprPointsHeading,
    confirmationMprPointsRemaining,
    confirmationMprRewardsHeading,
    confirmationPlccPointsHeading,
    confirmationPlccPointsRemaining,
    confirmationPlccRewardsHeading,
  };
};

export { getThresholdValue, cartOrderDetails };
