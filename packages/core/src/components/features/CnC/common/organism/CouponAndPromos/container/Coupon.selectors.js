import { createSelector } from 'reselect';
import { COUPON_REDEMPTION_TYPE } from '../../../../../../../services/abstractors/CnC/CartItemTile';
import BagPageSelector from '../../../../BagPage/container/BagPage.selectors';
import { getLabelValue } from '../../../../../../../utils';

export const getCouponFetchingState = state => {
  return state.CouponsAndPromos && state.CouponsAndPromos.get('isFetching');
};

export const getCouponsLabels = state => {
  const {
    checkout: {
      bagPage: {
        lbl_couponform_placeholder: placeholderText,
        lbl_couponform_submit: submitButtonLabel,
        lbl_couponform_header: couponCodeHeader,
        lbl_couponform_help: couponNeedHelpText,
        lbl_couponlist_available: AVAILABLE_REWARDS_HEADING,
        lbl_couponlist_applied: APPLIED_REWARDS_HEADING,
        lbl_couponlist_helpAppling: HELP_APPLYING,
        lbl_couponlist_applyBtn: APPLY_BUTTON_TEXT,
        lbl_couponlist_removeBtn: REMOVE_BUTTON_TEXT,
        lbl_couponlist_detailBtn: DETAILS_BUTTON_TEXT,
        lbl_couponlist_showMoreTxt: SHOW_MORE_BUTTON_TEXT,
        lbl_couponlist_lessMoreTxt: LESS_MORE_BUTTON_TEXT,
        lbl_couponlist_applyTobag: APPLY_TO_BAG,
        lbl_couponlist_printTxt: PRINT_ANCHOR_TEXT,
        lbl_couponlist_useBy: USE_BY_TEXT,
        lbl_couponlist_modalLongDesc: MODAL_LONG_DESCRIPTION,
        lbl_couponlist_modalShortDesc: MODAL_SHORT_DESCRIPTION,
        lbl_couponlist_tAndC: TERMS_AND_CONDITIONS,
        lbl_couponlist_pPolicy: PRIVACY_POLICY,
        lbl_couponlist_placeCash: PLACE_CASH_TEXT,
        lbl_couponlist_rewards: REWARDS_TEXT,
        lbl_couponlist_savings: SAVINGS_TEXT,
        lbl_couponlist_expiring: EXPIRING_SOON,
        lbl_coupon_couponValid: COUPON_VALIDITY = 'Validity',
        lbl_coupon_seeRedeemDates: SEE_REDEEM_DATES = 'See Redeem Dates',
        lbl_PLCCModal_applyNowLink: applyNowLink,
      } = {},
    } = {},
  } = state.Labels;

  return {
    placeholderText,
    submitButtonLabel,
    couponNeedHelpText,
    couponCodeHeader,
    AVAILABLE_REWARDS_HEADING,
    APPLIED_REWARDS_HEADING,
    HELP_APPLYING,
    APPLY_BUTTON_TEXT,
    REMOVE_BUTTON_TEXT,
    DETAILS_BUTTON_TEXT,
    SHOW_MORE_BUTTON_TEXT,
    LESS_MORE_BUTTON_TEXT,
    APPLY_TO_BAG,
    PRINT_ANCHOR_TEXT,
    USE_BY_TEXT,
    MODAL_LONG_DESCRIPTION,
    MODAL_SHORT_DESCRIPTION,
    TERMS_AND_CONDITIONS,
    PRIVACY_POLICY,
    PLACE_CASH_TEXT,
    REWARDS_TEXT,
    SAVINGS_TEXT,
    EXPIRING_SOON,
    COUPON_VALIDITY,
    SEE_REDEEM_DATES,
    applyNowLink,
    couponCollapsibleHeader: getLabelValue(
      state.Labels,
      'lbl_coupon_collapsible_header',
      'bagPage',
      'checkout'
    ),
  };
};

export const getAppliedCouponListState = state => {
  const list = state.CouponsAndPromos && state.CouponsAndPromos.get('couponsAndOffers');
  return list && list.filter(i => i.status === 'applied');
};

export const isCouponApplied = createSelector(
  getAppliedCouponListState,
  appliedCouponList => {
    return appliedCouponList && appliedCouponList.size > 0;
  }
);

export const getAvailableCouponListState = state => {
  const list = state.CouponsAndPromos && state.CouponsAndPromos.get('couponsAndOffers');
  return list && list.filter(i => i.status === 'available');
};

export const getAllRewardsCoupons = state => {
  const list = state.CouponsAndPromos && state.CouponsAndPromos.get('couponsAndOffers');
  return list && list.filter(i => i.redemptionType === COUPON_REDEMPTION_TYPE.LOYALTY);
};

export const getAllCoupons = state => {
  return state.CouponsAndPromos && state.CouponsAndPromos.get('couponsAndOffers');
};

export const getNeedHelpContent = state => {
  const needHelpContent = state.CartPageReducer.get('moduleXContent').find(
    moduleX => moduleX.name === BagPageSelector.getNeedHelpContentId(state)
  );
  return needHelpContent && needHelpContent.richText;
};
