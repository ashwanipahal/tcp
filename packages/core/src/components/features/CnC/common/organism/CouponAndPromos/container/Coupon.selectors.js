export const getCouponFetchingState = state => {
  return state.CouponsAndPromos.get('isFetching');
};

export const getCouponsLabels = state => {
  const {
    bag: {
      bagOverview: {
        lbl_couponform_placeholder: placeholderText,
        lbl_couponform_submit: submitButtonLabel,
        lbl_couponform_header: couponCodeHeader,
        lbl_couponform_help: couponNeedHelpText,
        lbl_couponlist_AVAILABLE_REWARDS: AVAILABLE_REWARDS_HEADING = 'AVAILABLE REWARDS & OFFERS ',
        lbl_couponlist_APPLIED_REWARDS_HEADING: APPLIED_REWARDS_HEADING = 'Applied REWARDS & OFFERS ',
        lbl_couponlist_HELP_APPLYING: HELP_APPLYING = 'Help applying Place Cash',
        lbl_couponlist_APPLY_BUTTON_TEXT: APPLY_BUTTON_TEXT = 'APPLY',
        lbl_couponlist_REMOVE_BUTTON_TEXT: REMOVE_BUTTON_TEXT = 'REMOVE',
        lbl_couponlist_DETAILS_BUTTON_TEXT: DETAILS_BUTTON_TEXT = 'Details',
        lbl_couponlist_SHOW_MORE_BUTTON_TEXT: SHOW_MORE_BUTTON_TEXT = 'Show more',
        lbl_couponlist_LESS_MORE_BUTTON_TEXT: LESS_MORE_BUTTON_TEXT = 'Less more',
        lbl_couponlist_APPLY_TO_BAG: APPLY_TO_BAG = 'Apply to bag',
        lbl_couponlist_PRINT_ANCHOR_TEXT: PRINT_ANCHOR_TEXT = 'Print',
        lbl_couponlist_USE_BY_TEXT: USE_BY_TEXT = 'Use by',
        lbl_couponlist_MODAL_LONG_DESCRIPTION: MODAL_LONG_DESCRIPTION = 'Lorum ipsum labore et dolore magna aliqua. Sed arcu non odio euismod lacinia. Tortor pretium viverra suspendisse potenti nullam ac tortor. Ris commodo viverra maecenas accumsan lacus vel. Odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullams ut etiam sit amet. Semper quis lectus nulla at volutpat diam ut venenatis. Sagittis orci a scelerisque purus semper eget duis. Tincidunt eget nullam non nisi est sit. Lectus quam id leo in vitae turpis massa sed elementum. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Pharetra sit amet aliquam id diam maecenas ultricies mi eget. Quam nulla porttitor massa id neque.',

        lbl_couponlist_MODAL_SHORT_DESCRIPTION: MODAL_SHORT_DESCRIPTION = 'By participating in the activity, you agree to ',
        lbl_couponlist_TERMS_AND_CONDITIONS: TERMS_AND_CONDITIONS = 'terms and conditions',
        lbl_couponlist_PRIVACY_POLICY: PRIVACY_POLICY = 'privacy policy',
        lbl_couponlist_PLACE_CASH_TEXT: PLACE_CASH_TEXT = 'PLACE CASH',
        lbl_couponlist_REWARDS_TEXT: REWARDS_TEXT = 'REWARDS',
        lbl_couponlist_SAVINGS_TEXT: SAVINGS_TEXT = 'SAVINGS',
        lbl_couponlist_EXPIRING_SOON: EXPIRING_SOON = 'EXPIRING SOON!',
      },
    },
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
  };
};

export const getAppliedCouponListState = state => {
  const list = state.CouponsAndPromos.get('couponsAndOffers');
  return list.filter(i => i.status === 'applied');
};

export const getAvailableCouponListState = state => {
  const list = state.CouponsAndPromos.get('couponsAndOffers');
  return list.filter(i => i.status === 'available');
};

export const getNeedHelpContent = state => {
  return state.CartPageReducer.get('needHelpContent');
};
