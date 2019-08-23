import { formValueSelector } from 'redux-form';
import { createSelector } from 'reselect';

export const getSmsSignUpFields = state => {
  const selector = formValueSelector('checkoutShipping');
  return selector(state, 'smsSignUp');
};

export const getSendOrderUpdate = createSelector(
  getSmsSignUpFields,
  smsSignUpFields => smsSignUpFields && smsSignUpFields.sendOrderUpdate
);

export const getShippingLabels = state => {
  const { lbl_shipping_header: header, lbl_shipping_sectionHeader: sectionHeader } =
    state.Labels.checkout && state.Labels.checkout.shipping;
  return {
    header,
    sectionHeader,
  };
};

export const getSmsSignUpLabels = state => {
  const {
    lbl_smsSignup_smsSignupText: smsSignupText,
    lbl_smsSignup_privacyPolicy: privacyPolicy,
    lbl_smsSignup_orderUpdates: orderUpdates,
  } = state.Labels.global && state.Labels.global.smsSignup;
  return {
    smsSignupText,
    privacyPolicy,
    orderUpdates,
  };
};
