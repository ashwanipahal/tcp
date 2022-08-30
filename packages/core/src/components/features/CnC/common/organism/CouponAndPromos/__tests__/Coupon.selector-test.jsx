import { fromJS } from 'immutable';
import {
  getCouponsLabels,
  getCouponFetchingState,
  getAppliedCouponListState,
  getAvailableCouponListState,
  getAllRewardsCoupons,
  isCouponApplied,
} from '../container/Coupon.selectors';
import { COUPON_REDEMPTION_TYPE } from '../../../../../../../services/abstractors/CnC/CartItemTile';

describe('#Coupon selector', () => {
  const couponState = fromJS({
    isFetching: false,
    couponList: [],
    couponsAndOffers: [
      {
        id: 'Y00105578',
        status: 'applied',
        isExpiring: true,
        title: '$20 OFF On $30',
        detailsOpen: false,
        expirationDate: '8/10/19',
        effectiveDate: '8/6/19',
        details: null,
        legalText: '$20 OFF On $90',
        isStarted: true,
        error: '',
        promotionType: 'public',
        expirationDateTimeStamp: '2019-08-10T18:29:00.001Z',
        redemptionType: COUPON_REDEMPTION_TYPE.LOYALTY,
      },
      {
        id: 'Y00105579',
        status: 'available',
        isExpiring: false,
        title: '$10 off $50 Gymboree only',
        detailsOpen: false,
        expirationDate: '12/31/99',
        effectiveDate: '7/31/19',
        details: null,
        legalText: '$10 off $50 Gymboree ONLY',
        isStarted: true,
        error: '',
        promotionType: 'public',
        expirationDateTimeStamp: '9999-12-31T18:29:5.999Z',
        redemptionType: COUPON_REDEMPTION_TYPE.LOYALTY,
      },
      {
        id: 'Y00105580',
        status: 'available',
        isExpiring: false,
        title: '$10off$50 TCP ONLY',
        detailsOpen: false,
        expirationDate: '12/31/99',
        effectiveDate: '8/31/19',
        details: null,
        legalText: '$10off$50 TCP ONLY',
        isStarted: true,
        error: '',
        promotionType: 'public',
        expirationDateTimeStamp: '9999-12-31T18:29:9.999Z',
      },
      {
        id: 'Y00105567',
        status: 'available',
        isExpiring: false,
        title: '20% OFF ON 30$ Purchase',
        detailsOpen: false,
        expirationDate: '12/31/99',
        effectiveDate: '8/6/19',
        details: null,
        legalText: '20% OFF ON 30$ Purchase',
        isStarted: true,
        error: '',
        promotionType: 'public',
        expirationDateTimeStamp: '9999-12-31T18:29:19.999Z',
      },
    ],
    cacheUntil: 1565250266716,
  });

  it('#Coupon should return isFetching state', () => {
    const state = {
      CouponsAndPromos: couponState,
    };
    expect(getCouponFetchingState(state)).toEqual(couponState.get('isFetching'));
  });

  it('#Coupon should return couponsAndOffers applied state', () => {
    const state = {
      CouponsAndPromos: couponState,
    };
    expect(getAppliedCouponListState(state)).toEqual(
      couponState.get('couponsAndOffers').filter(i => i.status === 'applied')
    );
  });
  it('#isCouponApplied should return true if coupons are applied', () => {
    const state = {
      CouponsAndPromos: couponState,
    };
    expect(isCouponApplied(state)).toEqual(false);
  });

  it('#Coupon should return couponsAndOffers available state', () => {
    const state = {
      CouponsAndPromos: couponState,
    };
    expect(getAvailableCouponListState(state)).toEqual(
      couponState.get('couponsAndOffers').filter(i => i.status === 'available')
    );
  });

  it('#getAllRewardsCoupons should return couponsAndOffers rewards coupon', () => {
    const state = {
      CouponsAndPromos: couponState,
    };
    expect(getAllRewardsCoupons(state)).toEqual(
      couponState
        .get('couponsAndOffers')
        .filter(i => i.redemptionType === COUPON_REDEMPTION_TYPE.LOYALTY)
    );
  });

  it('#Coupon should return labels state', () => {
    const state = {
      Labels: {
        checkout: {
          bagPage: {
            lbl_couponform_placeholder: '',
            lbl_couponform_submit: 'Submit',
            lbl_couponform_header: 'Header',
            lbl_couponform_help: 'help',
            lbl_couponlist_available: 'Available',
            lbl_couponlist_applied: 'Applied',
            lbl_couponlist_helpAppling: 'apply',
            lbl_couponlist_applyBtn: 'Apply Button',
            lbl_couponlist_removeBtn: 'Remove',
            lbl_couponlist_detailBtn: 'Detail',
            lbl_couponlist_showMoreTxt: 'Show',
            lbl_couponlist_lessMoreTxt: 'Less',
            lbl_couponlist_applyTobag: 'add',
            lbl_couponlist_printTxt: 'print',
            lbl_couponlist_useBy: 'use',
            lbl_couponlist_modalLongDesc: 'desc',
            lbl_couponlist_modalShortDesc: 'desc',
            lbl_couponlist_tAndC: 'tnc',
            lbl_couponlist_pPolicy: 'policy',
            lbl_couponlist_placeCash: 'place',
            lbl_couponlist_rewards: 'rewards',
            lbl_couponlist_savings: 'saving',
            lbl_couponlist_expiring: 'expire',
            lbl_coupon_collapsible_header: 'REWARDS & OFFERS',
          },
        },
      },
    };
    expect(getCouponsLabels(state)).toEqual({
      placeholderText: '',
      submitButtonLabel: 'Submit',
      couponNeedHelpText: 'help',
      couponCodeHeader: 'Header',
      APPLIED_REWARDS_HEADING: 'Applied',
      APPLY_BUTTON_TEXT: 'Apply Button',
      APPLY_TO_BAG: 'add',
      AVAILABLE_REWARDS_HEADING: 'Available',
      DETAILS_BUTTON_TEXT: 'Detail',
      EXPIRING_SOON: 'expire',
      HELP_APPLYING: 'apply',
      LESS_MORE_BUTTON_TEXT: 'Less',
      MODAL_LONG_DESCRIPTION: 'desc',
      MODAL_SHORT_DESCRIPTION: 'desc',
      PLACE_CASH_TEXT: 'place',
      PRINT_ANCHOR_TEXT: 'print',
      PRIVACY_POLICY: 'policy',
      REMOVE_BUTTON_TEXT: 'Remove',
      REWARDS_TEXT: 'rewards',
      SAVINGS_TEXT: 'saving',
      SHOW_MORE_BUTTON_TEXT: 'Show',
      TERMS_AND_CONDITIONS: 'tnc',
      USE_BY_TEXT: 'use',
      COUPON_VALIDITY: 'Validity',
      SEE_REDEEM_DATES: 'See Redeem Dates',
      couponCollapsibleHeader: 'REWARDS & OFFERS',
    });
  });
});
