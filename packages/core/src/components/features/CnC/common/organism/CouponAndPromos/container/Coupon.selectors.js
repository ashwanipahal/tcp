export const getCouponFetchingState = state => {
  return state.CouponsAndPromos.get('isFetching');
};

export const getCouponsLabels = state => {
  const {
    bag: {
      bagOverview: {
        lbl_couponform_placeholder: placeholderText,
        lbl_couponform_submit: submitButtonLabel,
      },
    },
  } = state.Labels;

  return {
    placeholderText,
    submitButtonLabel,
  };
};
