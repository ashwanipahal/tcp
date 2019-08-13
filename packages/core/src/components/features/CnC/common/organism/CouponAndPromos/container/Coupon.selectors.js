import BagPageSelector from '../../../../BagPage/container/BagPage.selectors';

export const getCouponFetchingState = state => {
  return state.CouponsAndPromos && state.CouponsAndPromos.get('isFetching');
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
        lbl_couponlist_APPLIED_REWARDS_HEADING: APPLIED_REWARDS_HEADING = 'APPLIED REWARDS & OFFERS ',
        lbl_couponlist_HELP_APPLYING: HELP_APPLYING = 'Help applying Place Cash',
        lbl_couponlist_APPLY_BUTTON_TEXT: APPLY_BUTTON_TEXT = 'APPLY',
        lbl_couponlist_REMOVE_BUTTON_TEXT: REMOVE_BUTTON_TEXT = 'REMOVE',
        lbl_couponlist_DETAILS_BUTTON_TEXT: DETAILS_BUTTON_TEXT = 'Details',
        lbl_couponlist_SHOW_MORE_BUTTON_TEXT: SHOW_MORE_BUTTON_TEXT = 'Show more',
        lbl_couponlist_LESS_MORE_BUTTON_TEXT: LESS_MORE_BUTTON_TEXT = 'Less more',
        lbl_couponlist_APPLY_TO_BAG: APPLY_TO_BAG = 'Apply to bag',
        lbl_couponlist_PRINT_ANCHOR_TEXT: PRINT_ANCHOR_TEXT = 'Print',
        lbl_couponlist_USE_BY_TEXT: USE_BY_TEXT = 'Use by',
        lbl_couponlist_MODAL_LONG_DESCRIPTION: MODAL_LONG_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla urna nunc, interdum ac neque non, blandit accumsan justo. Phasellus aliquam urna ut nisl faucibus, quis pellentesque nulla vulputate. Phasellus bibendum lobortis orci, condimentum convallis sapien cursus non. Nunc eu bibendum sem. Quisque metus nisl, consectetur quis elit ut, maximus sollicitudin elit. Maecenas congue tempor ante, quis finibus neque bibendum vel.',

        lbl_couponlist_MODAL_SHORT_DESCRIPTION: MODAL_SHORT_DESCRIPTION = 'By participating in the activity, you agree to ',
        lbl_couponlist_TERMS_AND_CONDITIONS: TERMS_AND_CONDITIONS = 'Terms & Conditions',
        lbl_couponlist_PRIVACY_POLICY: PRIVACY_POLICY = 'Privacy Policy',
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
  const list = state.CouponsAndPromos && state.CouponsAndPromos.get('couponsAndOffers');
  return list && list.filter(i => i.status === 'applied');
};

export const getAvailableCouponListState = state => {
  const list = state.CouponsAndPromos && state.CouponsAndPromos.get('couponsAndOffers');
  return list && list.filter(i => i.status === 'available');
};

export const getNeedHelpContent = state => {
  const needHelpContent = state.CartPageReducer.get('moduleXContent').find(
    moduleX => moduleX.name === BagPageSelector.getNeedHelpContentId(state)
  );
  return needHelpContent && needHelpContent.richText;
};
