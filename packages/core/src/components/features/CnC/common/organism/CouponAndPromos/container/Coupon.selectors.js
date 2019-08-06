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
      },
    },
  } = state.Labels;

  return {
    placeholderText,
    submitButtonLabel,
    couponNeedHelpText,
    couponCodeHeader,
  };
};
