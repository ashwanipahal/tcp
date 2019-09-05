import { fromJS } from 'immutable';
import {
  getCouponsLabels,
  getCouponFetchingState,
  getAppliedCouponListState,
  getAvailableCouponListState,
  getAllRewardsCoupons,
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
        bag: {
          bagOverview: {},
        },
      },
    };
    expect(getCouponsLabels(state)).toEqual({
      placeholderText: undefined,
      submitButtonLabel: undefined,
      couponNeedHelpText: undefined,
      couponCodeHeader: undefined,
      APPLIED_REWARDS_HEADING: undefined,
      APPLY_BUTTON_TEXT: undefined,
      APPLY_TO_BAG: undefined,
      AVAILABLE_REWARDS_HEADING: undefined,
      DETAILS_BUTTON_TEXT: undefined,
      EXPIRING_SOON: undefined,
      HELP_APPLYING: undefined,
      LESS_MORE_BUTTON_TEXT: undefined,
      MODAL_LONG_DESCRIPTION: undefined,
      MODAL_SHORT_DESCRIPTION: undefined,
      PLACE_CASH_TEXT: undefined,
      PRINT_ANCHOR_TEXT: undefined,
      PRIVACY_POLICY: undefined,
      REMOVE_BUTTON_TEXT: undefined,
      REWARDS_TEXT: undefined,
      SAVINGS_TEXT: undefined,
      SHOW_MORE_BUTTON_TEXT: undefined,
      TERMS_AND_CONDITIONS: undefined,
      USE_BY_TEXT: undefined,
    });
  });
});
