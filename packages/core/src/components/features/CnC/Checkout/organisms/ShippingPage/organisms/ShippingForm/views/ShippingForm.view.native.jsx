import React from 'react';
import { FormSection, reduxForm, Field } from 'redux-form';
import { PropTypes } from 'prop-types';
import AddressFields from '../../../../../../../../common/molecules/AddressFields';
import ShipmentMethods from '../../../../../../common/molecules/ShipmentMethods';
import SMSFormFields from '../../../../../../../../common/molecules/SMSFormFields';
import createValidateMethod from '../../../../../../../../../utils/formValidation/createValidateMethod';
import InputCheckbox from '../../../../../../../../common/atoms/InputCheckbox';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../../../common/atoms/Anchor';
import getStandardConfig from '../../../../../../../../../utils/formValidation/validatorStandardConfig';
import {
  EmailSignUpWrapper,
  EmailSignUpForm,
  ShippingFormWrapper,
} from '../styles/ShippingForm.styles.native';

const ShippingForm = ({
  shippingLabels,
  shipmentMethods,
  selectedShipmentId,
  dispatch,
  isGuest,
  isUsSite,
  orderHasPickUp,
  smsSignUpLabels,
  isOrderUpdateChecked,
  emailSignUpLabels,
  addressLabels: { addressFormLabels },
  checkPOBoxAddress,
  addressPhoneNo,
  loadShipmentMethods,
}) => {
  return (
    <ShippingFormWrapper>
      <FormSection name="address">
        <AddressFields
          addressFormLabels={addressFormLabels}
          showDefaultCheckbox={false}
          formName="checkoutShipping"
          formSection="address"
          dispatch={dispatch}
          checkPOBoxAddress={checkPOBoxAddress}
          addressPhoneNo={addressPhoneNo}
          loadShipmentMethods={loadShipmentMethods}
        />
      </FormSection>
      {!orderHasPickUp && isUsSite && (
        <FormSection name="smsSignUp">
          <SMSFormFields
            labels={smsSignUpLabels}
            showDefaultCheckbox={false}
            formName="checkoutShipping"
            formSection="smsSignUp"
            isOrderUpdateChecked={isOrderUpdateChecked}
            dispatch={dispatch}
            addressPhoneNo={addressPhoneNo}
          />
        </FormSection>
      )}
      {!orderHasPickUp && isGuest && !isUsSite && (
        <FormSection name="emailSignUp">
          <EmailSignUpForm>
            <EmailSignUpWrapper>
              <Field
                dataLocator="signUp-checkbox-field"
                name="sendEmailSignup"
                component={InputCheckbox}
              />
              <BodyCopy
                dataLocator="shipping-email-signUp-heading-lbl"
                fontSize="fs14"
                mobileFontFamily="secondary"
                fontWeight="regular"
                text={emailSignUpLabels.emailSignupHeading}
              />
            </EmailSignUpWrapper>
            <BodyCopy
              dataLocator="shipping-email-signUp-sub-heading-text"
              fontSize="fs12"
              mobileFontFamily="secondary"
              fontWeight="regular"
              text={emailSignUpLabels.emailSignupSubHeading}
            />
            <BodyCopy
              fontSize="fs12"
              mobileFontFamily="secondary"
              fontWeight="regular"
              text={emailSignUpLabels.emailSignupSubSubHeading}
            />
            <Anchor
              noUnderline
              anchorVariation="primary"
              fontSizeVariation="small"
              noLink
              href="#"
              target="_blank"
              dataLocator="shipping-email-signUp-contact-anchor"
              text={emailSignUpLabels.emailSignupContact}
            />
          </EmailSignUpForm>
        </FormSection>
      )}
      <FormSection name="shipmentMethods">
        <ShipmentMethods
          shipmentMethods={shipmentMethods}
          formName="checkoutShipping"
          formSection="shipmentMethods"
          shipmentHeader={shippingLabels.shipmentHeader}
          selectedShipmentId={selectedShipmentId}
          dispatch={dispatch}
        />
      </FormSection>
    </ShippingFormWrapper>
  );
};

const validateMethod = createValidateMethod({
  address: AddressFields.addressValidationConfig,
  smsSignUp: SMSFormFields.smsFormFieldsConfig,
  emailSignUp: getStandardConfig(['sendEmailSignup']),
});

ShippingForm.propTypes = {
  addressLabels: PropTypes.shape({}).isRequired,
  // handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  isOrderUpdateChecked: PropTypes.bool,
  shippingLabels: PropTypes.shape({}).isRequired,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
  selectedShipmentId: PropTypes.string,
  checkPOBoxAddress: PropTypes.func,
  addressPhoneNo: PropTypes.number,
  emailSignUpLabels: PropTypes.shape({}).isRequired,
  isGuest: PropTypes.bool,
  isUsSite: PropTypes.bool,
  orderHasPickUp: PropTypes.bool,
  shipmentMethods: PropTypes.shape([]),
  loadShipmentMethods: PropTypes.func.isRequired,
};

ShippingForm.defaultProps = {
  isOrderUpdateChecked: false,
  selectedShipmentId: null,
  checkPOBoxAddress: () => {},
  addressPhoneNo: null,
  isGuest: true,
  isUsSite: true,
  orderHasPickUp: false,
  shipmentMethods: null,
};

export default reduxForm({
  form: 'checkoutShipping',
  ...validateMethod, // a unique identifier for this form
  destroyOnUnmount: false,
})(ShippingForm);

export { ShippingForm as ShippingFormVanilla };
