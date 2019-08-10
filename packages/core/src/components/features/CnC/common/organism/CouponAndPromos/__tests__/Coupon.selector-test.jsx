import { fromJS } from 'immutable';
import {
  getCouponsLabels,
  getCouponFetchingState,
  getAppliedCouponListState,
  getAvailableCouponListState,
} from '../container/Coupon.selectors';

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
      APPLIED_REWARDS_HEADING: 'Applied REWARDS & OFFERS ',
      APPLY_BUTTON_TEXT: 'APPLY',
      APPLY_TO_BAG: 'Apply to bag',
      AVAILABLE_REWARDS_HEADING: 'AVAILABLE REWARDS & OFFERS ',
      DETAILS_BUTTON_TEXT: 'Details',
      EXPIRING_SOON: 'EXPIRING SOON!',
      HELP_APPLYING: 'Help applying Place Cash',
      LESS_MORE_BUTTON_TEXT: 'Less more',
      MODAL_LONG_DESCRIPTION:
        'Lorum ipsum labore et dolore magna aliqua. Sed arcu non odio euismod lacinia. Tortor pretium viverra suspendisse potenti nullam ac tortor. Ris commodo viverra maecenas accumsan lacus vel. Odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullams ut etiam sit amet. Semper quis lectus nulla at volutpat diam ut venenatis. Sagittis orci a scelerisque purus semper eget duis. Tincidunt eget nullam non nisi est sit. Lectus quam id leo in vitae turpis massa sed elementum. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Pharetra sit amet aliquam id diam maecenas ultricies mi eget. Quam nulla porttitor massa id neque.',
      MODAL_SHORT_DESCRIPTION: 'By participating in the activity, you agree to ',
      PLACE_CASH_TEXT: 'PLACE CASH',
      PRINT_ANCHOR_TEXT: 'Print',
      PRIVACY_POLICY: 'privacy policy',
      REMOVE_BUTTON_TEXT: 'REMOVE',
      REWARDS_TEXT: 'REWARDS',
      SAVINGS_TEXT: 'SAVINGS',
      SHOW_MORE_BUTTON_TEXT: 'Show more',
      TERMS_AND_CONDITIONS: 'terms and conditions',
      USE_BY_TEXT: 'Use by',
    });
  });
});
