import { getFormSyncErrors, formValueSelector } from 'redux-form';

const getPickUpContactFormLabels = state => {
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
    lbl_pickup_pickup_contact: pickupContactText,
    lbl_pickup_btn_cancel: btnCancel,
    lbl_pickup_btn_update: btnUpdate,
    lbl_pickup_btnSaveUpdate: btnSaveUpdate,
    lbl_pickup_titleEditPickUp: titleEditPickup,
    lbl_pickup_anchor_edit: anchorEdit,
    lbl_pickup_buttonText: pickupText,
    lbl_pickup_billingText: billingText,
    lbl_pickup_reviewText: reviewText,
    lbl_pickup_nextText: nextText,
    lbl_pickup_returnTo: returnTo,
    lbl_pickup_venmo_banner: venmoBannerText,
    lbl_pickup_nextToBilling: nextToBilling,
  } = state.Labels.global && state.Labels.checkout.pickup;
  const { lbl_shipping_header: shippingText } =
    state.Labels.checkout && state.Labels.checkout.shipping;
  return {
    title: title.toUpperCase(),
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
    pickupContactText,
    btnCancel,
    btnUpdate,
    btnSaveUpdate,
    titleEditPickup,
    anchorEdit,
    pickupText,
    billingText,
    nextText,
    returnTo,
    shippingText,
    venmoBannerText,
    reviewText,
    nextToBilling,
  };
};

const getSyncError = state => {
  return {
    syncError: getFormSyncErrors('checkoutShipping')(state),
  };
};

const getGiftServicesFormData = state => {
  const selector = formValueSelector('GiftServices');
  return {
    catEntryId: selector(state, 'optionId'),
    hasGiftWrapping: selector(state, 'hasGiftWrapping'),
    GiftMsg: selector(state, 'message'),
    brand: selector(state, 'brand'),
  };
};

const getPaypalPaymentSettings = state => {
  return state.Checkout.getIn(['options', 'paypalPaymentSettings']);
};

const getExpressReviewShippingSectionId = state => {
  const selector = formValueSelector('expressReviewPage');
  return selector(state, 'expressReviewShippingSection');
};

export {
  getPickUpContactFormLabels,
  getGiftServicesFormData,
  getSyncError,
  getPaypalPaymentSettings,
  getExpressReviewShippingSectionId,
};
