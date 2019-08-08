import { fromJS } from 'immutable';
import { getCouponsLabels, getCouponFetchingState } from '../container/Coupon.selectors';

describe('#Coupon selector', () => {
  const couponState = fromJS({
    isFetching: false,
  });

  it('#Coupon should return isFetching state', () => {
    const state = {
      CouponsAndPromos: couponState,
    };
    expect(getCouponFetchingState(state)).toEqual(couponState.get('isFetching'));
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
