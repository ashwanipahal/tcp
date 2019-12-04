import React from 'react';
import { FormSection } from 'redux-form';
import { SmsSignUpForm, PickUpAlternateForm } from '../styles/PickupPage.style.native';
import SMSFormFields from '../../../../../../common/molecules/SMSFormFields';
import PickUpAlternateFormPart from '../../../molecules/PickUpAlternateFormPart';

/**
 * @description - This method is to return the label text based on venmo or normal checkout
 * @param {object} props - method props from view class
 */
const getNextCTAText = props => {
  const {
    isVenmoPaymentInProgress,
    orderHasShipping,
    pickUpLabels,
    isVenmoPickupDisplayed,
  } = props;
  let nextButtonText;
  if (isVenmoPaymentInProgress && !isVenmoPickupDisplayed && !orderHasShipping) {
    nextButtonText = `${pickUpLabels.nextText}: ${pickUpLabels.reviewText}`;
  } else {
    nextButtonText = !orderHasShipping
      ? `${pickUpLabels.nextText}: ${pickUpLabels.billingText}`
      : `${pickUpLabels.nextText}: ${pickUpLabels.shippingText}`;
  }
  return nextButtonText;
};

const renderSmsUpdatedEnabled = (
  isSmsUpdatesEnabled,
  isOrderUpdateChecked,
  currentPhoneNumber,
  smsSignUpLabels,
  dispatch
) => {
  return (
    isSmsUpdatesEnabled && (
      <SmsSignUpForm>
        <FormSection name="smsSignUp">
          <SMSFormFields
            isOrderUpdateChecked={isOrderUpdateChecked}
            formName="checkoutPickup"
            formSection="smsSignUp"
            altInitValue={currentPhoneNumber}
            labels={smsSignUpLabels}
            showDefaultCheckbox={false}
            variation="secondary"
            dispatch={dispatch}
            addressPhoneNo={currentPhoneNumber}
          />
        </FormSection>
      </SmsSignUpForm>
    )
  );
};

const renderPickupAlternateForm = (isAlternateUpdateChecked, pickUpLabels, isEditing) => {
  return (
    <PickUpAlternateForm>
      <FormSection name="pickUpAlternate">
        <PickUpAlternateFormPart
          isAlternateUpdateChecked={isAlternateUpdateChecked}
          showNoteOnToggle
          formName="checkoutPickup"
          formSection="pickUpAlternate"
          labels={pickUpLabels}
          isEditing={isEditing}
        />
      </FormSection>
    </PickUpAlternateForm>
  );
};

export { getNextCTAText, renderSmsUpdatedEnabled, renderPickupAlternateForm };
