import { formValueSelector } from 'redux-form';
import { createSelector } from 'reselect';

export const getAlternateFormFields = state => {
  const selector = formValueSelector('checkoutPickup');
  return selector(state, 'pickUpAlternate');
};

export const getPickUpContactFormLabels = state => {
  const {
    lbl_pickup_title: title,
    lbl_pickup_firstName: firstName,
    lbl_pickup_govIdText: govIdText,
    lbl_pickup_lastName: lastName,
    lbl_pickup_email: email,
    lbl_pickup_mobile: mobile,
    lbl_pickup_SMSHeading: SMSHeading,
    lbl_pickup_SMSLongText: SMSLongText,
    lbl_pickup_SMSPrivatePolicy: SMSPrivatePolicy,
    lbl_pickup_alternativeHeading: alternativeHeading,
    lbl_pickup_alternativeSubHeading: alternativeSubHeading,
    lbl_pickup_alternativeFirstName: alternativeFirstName,
    lbl_pickup_alternativeGovIdText: alternativeGovIdText,
    lbl_pickup_alternativeLastName: alternativeLastName,
    lbl_pickup_alternativeEmail: alternativeEmail,
    lbl_pickup_emailSignupHeading: emailSignupHeading,
    lbl_pickup_emailSignupSubHeading: emailSignupSubHeading,
    lbl_pickup_emailSignupSubSubHeading: emailSignupSubSubHeading,
    lbl_pickup_emailSignupContact: emailSignupContact,
  } = state.Labels.global && state.Labels.checkout.pickup;
  return {
    title,
    firstName,
    govIdText,
    lastName,
    email,
    mobile,
    SMSHeading,
    SMSLongText,
    SMSPrivatePolicy,
    alternativeHeading,
    alternativeSubHeading,
    alternativeFirstName,
    alternativeGovIdText,
    alternativeLastName,
    alternativeEmail,
    emailSignupHeading,
    emailSignupSubHeading,
    emailSignupSubSubHeading,
    emailSignupContact,
  };
};

export const getAlternateFormUpdate = createSelector(
  getAlternateFormFields,
  smsSignUpFields => smsSignUpFields && smsSignUpFields.hasAlternatePickup
);
