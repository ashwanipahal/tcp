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
} from '../styles/ShippingForm.view.style.native';
import GiftServices from '../../../molecules/GiftServices';
import CnCTemplate from '../../../../../../common/organism/CnCTemplate';
import RegisteredShippingFormView from '../../RegisteredShippingForm/views/RegisteredShippingForm.view.native';
import CONSTANTS from '../../../../../Checkout.constants';

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
  isGiftServicesChecked,
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
  newUserPhoneNo,
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
            newUserPhoneNo={newUserPhoneNo}
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
        <FormSection name="giftServices">
          <GiftServices
            showDefaultCheckbox={false}
            formSection="giftServices"
            variation="secondary"
            isGiftServicesChecked={isGiftServicesChecked}
            dispatch={dispatch}
          />
        </FormSection>
      </ShippingFormWrapper>
      <CnCTemplate
        navigation={navigation}
        btnText={getLabelValue(labels, 'lbl_shipping_billingText', 'shipping', 'checkout')}
        routeToPage=""
        onPress={handleSubmit(submitShippingForm)}
        isGuest={isGuest}
        backLinkText={
          orderHasPickUp &&
          getLabelValue(labels, 'lbl_shipping_backLinkText', 'shipping', 'checkout')
        }
        onBackLinkPress={() => navigation.navigate(CONSTANTS.CHECKOUT_ROUTES_NAMES.CHECKOUT_PICKUP)}
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
  isGiftServicesChecked: PropTypes.bool.isRequired,
  userAddresses: PropTypes.shape([]),
  onFileAddressKey: PropTypes.string,
  isSaveToAddressBookChecked: PropTypes.bool,
  updateShippingAddress: PropTypes.func,
  addNewShippingAddress: PropTypes.func,
  address: PropTypes.shape({}),
  setAsDefaultShipping: PropTypes.func,
  defaultAddressId: PropTypes.string,
  syncErrorsObject: PropTypes.shape({}),
  newUserPhoneNo: PropTypes.string,
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
  newUserPhoneNo: null,
};

export default reduxForm({
  form: 'checkoutShipping',
  ...validateMethod, // a unique identifier for this form
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(ShippingForm);

export { ShippingForm as ShippingFormVanilla };
