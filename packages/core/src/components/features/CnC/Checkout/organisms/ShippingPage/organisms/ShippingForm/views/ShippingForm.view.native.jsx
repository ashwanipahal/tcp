import React from 'react';
import { FormSection, reduxForm, Field } from 'redux-form';
import { PropTypes } from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
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
import CnCTemplate from '../../../../../../common/organism/CnCTemplate';
import RegisteredShippingFormView from '../../RegisteredShippingForm/views/RegisteredShippingForm.view.native';

const ShippingForm = ({
  shipmentMethods,
  selectedShipmentId,
  dispatch,
  isGuest,
  isUsSite,
  orderHasPickUp,
  smsSignUpLabels,
  isOrderUpdateChecked,
  addressLabels: { addressFormLabels },
  addressPhoneNo,
  loadShipmentMethods,
  navigation,
  handleSubmit,
  submitShippingForm,
  labels,
  userAddresses,
  onFileAddressKey,
  isSaveToAddressBookChecked,
  updateShippingAddress,
  addNewShippingAddress,
  address,
  setAsDefaultShipping,
  defaultAddressId,
  syncErrorsObject,
}) => {
  return (
    <>
      <ShippingFormWrapper>
        {!isGuest && (
          <RegisteredShippingFormView
            labels={labels}
            userAddresses={userAddresses}
            addressFormLabels={addressFormLabels}
            formName="checkoutShipping"
            dispatch={dispatch}
            addressPhoneNo={addressPhoneNo}
            loadShipmentMethods={loadShipmentMethods}
            onFileAddressKey={onFileAddressKey}
            isSaveToAddressBookChecked={isSaveToAddressBookChecked}
            updateShippingAddress={updateShippingAddress}
            addNewShippingAddress={addNewShippingAddress}
            address={address}
            isGuest={isGuest}
            setAsDefaultShipping={setAsDefaultShipping}
            defaultAddressId={defaultAddressId}
            syncErrorsObject={syncErrorsObject}
          />
        )}
        {isGuest && (
          <FormSection name="address">
            <AddressFields
              addressFormLabels={addressFormLabels}
              showDefaultCheckbox={false}
              formName="checkoutShipping"
              formSection="address"
              dispatch={dispatch}
              addressPhoneNo={addressPhoneNo}
              loadShipmentMethods={loadShipmentMethods}
              disableCountry
            />
          </FormSection>
        )}
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
                  text={getLabelValue(
                    labels,
                    'lbl_pickup_emailSignupHeading',
                    'pickup',
                    'checkout'
                  )}
                />
              </EmailSignUpWrapper>
              <BodyCopy
                dataLocator="shipping-email-signUp-sub-heading-text"
                fontSize="fs12"
                mobileFontFamily="secondary"
                fontWeight="regular"
                text={getLabelValue(
                  labels,
                  'lbl_pickup_emailSignupSubHeading',
                  'pickup',
                  'checkout'
                )}
              />
              <BodyCopy
                fontSize="fs12"
                mobileFontFamily="secondary"
                fontWeight="regular"
                text={getLabelValue(
                  labels,
                  'lbl_pickup_emailSignupSubSubHeading',
                  'pickup',
                  'checkout'
                )}
              />
              <Anchor
                noUnderline
                anchorVariation="primary"
                fontSizeVariation="small"
                noLink
                href="#"
                target="_blank"
                dataLocator="shipping-email-signUp-contact-anchor"
                text={getLabelValue(labels, 'lbl_pickup_emailSignupContact', 'pickup', 'checkout')}
              />
            </EmailSignUpForm>
          </FormSection>
        )}
        <FormSection name="shipmentMethods">
          <ShipmentMethods
            shipmentMethods={shipmentMethods}
            formName="checkoutShipping"
            formSection="shipmentMethods"
            shipmentHeader={getLabelValue(
              labels,
              'lbl_shipping_shipmentHeader',
              'shipping',
              'checkout'
            )}
            selectedShipmentId={selectedShipmentId}
            dispatch={dispatch}
          />
        </FormSection>
      </ShippingFormWrapper>
      <CnCTemplate
        navigation={navigation}
        btnText="NEXT:BILLING"
        routeToPage=""
        onPress={handleSubmit(submitShippingForm)}
        isGuest={isGuest}
      />
    </>
  );
};

const validateMethod = createValidateMethod({
  address: AddressFields.addressValidationConfig,
  smsSignUp: SMSFormFields.smsFormFieldsConfig,
  emailSignUp: getStandardConfig(['sendEmailSignup']),
});

ShippingForm.propTypes = {
  addressLabels: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  isOrderUpdateChecked: PropTypes.bool,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
  selectedShipmentId: PropTypes.string,
  addressPhoneNo: PropTypes.number,
  labels: PropTypes.shape({}).isRequired,
  isGuest: PropTypes.bool,
  isUsSite: PropTypes.bool,
  orderHasPickUp: PropTypes.bool,
  shipmentMethods: PropTypes.shape([]),
  loadShipmentMethods: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  submitShippingForm: PropTypes.func.isRequired,
  userAddresses: PropTypes.shape([]),
  onFileAddressKey: PropTypes.string,
  isSaveToAddressBookChecked: PropTypes.bool,
  updateShippingAddress: PropTypes.func,
  addNewShippingAddress: PropTypes.func,
  address: PropTypes.shape({}),
  setAsDefaultShipping: PropTypes.func,
  defaultAddressId: PropTypes.string,
  syncErrorsObject: PropTypes.shape({}),
};

ShippingForm.defaultProps = {
  isOrderUpdateChecked: false,
  selectedShipmentId: null,
  addressPhoneNo: null,
  isGuest: true,
  isUsSite: true,
  orderHasPickUp: false,
  shipmentMethods: null,
  userAddresses: null,
  onFileAddressKey: null,
  isSaveToAddressBookChecked: false,
  updateShippingAddress: () => {},
  addNewShippingAddress: () => {},
  address: null,
  setAsDefaultShipping: null,
  defaultAddressId: null,
  syncErrorsObject: {},
};

export default reduxForm({
  form: 'checkoutShipping',
  ...validateMethod, // a unique identifier for this form
  destroyOnUnmount: false,
})(ShippingForm);

export { ShippingForm as ShippingFormVanilla };
