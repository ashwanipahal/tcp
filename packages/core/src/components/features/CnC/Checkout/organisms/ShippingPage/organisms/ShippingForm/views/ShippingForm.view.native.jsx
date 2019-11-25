import React, { useState } from 'react';
import { FormSection, reduxForm } from 'redux-form';
import { PropTypes } from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import AddressFields from '../../../../../../../../common/molecules/AddressFields';
import ShipmentMethods from '../../../../../../common/molecules/ShipmentMethods';
import SMSFormFields from '../../../../../../../../common/molecules/SMSFormFields';
import createValidateMethod from '../../../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../../../utils/formValidation/validatorStandardConfig';
import {
  ShippingFormWrapper,
  ShippingLoaderWrapper,
} from '../styles/ShippingForm.view.style.native';
import GiftServices from '../../../molecules/GiftServices';
import CnCTemplate from '../../../../../../common/organism/CnCTemplate';
import RegisteredShippingFormView from '../../RegisteredShippingForm/views/RegisteredShippingForm.view.native';
import CONSTANTS from '../../../../../Checkout.constants';
import PickupPageSkeleton from '../../../../PickupPage/views/PickupPageSkeleton.native';

const nextCTAText = (labels, isVenmoPaymentInProgress, isVenmoShippingDisplayed) => {
  return isVenmoPaymentInProgress && !isVenmoShippingDisplayed
    ? getLabelValue(labels, 'lbl_shipping_reviewText', 'shipping', 'checkout')
    : getLabelValue(labels, 'lbl_shipping_billingText', 'shipping', 'checkout');
};

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
  setCheckoutStage,
  isVenmoPaymentInProgress,
  isVenmoShippingDisplayed,
  emailSignUpLabels,
  scrollView,
  bagLoading,
  initialValues,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editType, setEditType] = useState('');
  const [editShipmentDetailsError, setEditShipmentDetailsError] = useState('');
  let editModalRef;
  // Type added for address update. edit when updating address and add when selected 'Add' from dropdown
  const setEditState = (state, type) => {
    if (!state) {
      setEditShipmentDetailsError('');
    }
    setEditMode(state);
    setEditType(type);
  };

  const handleShippingFormSubmit = e => {
    if (!editMode || editType === 'add') {
      setEditShipmentDetailsError('');
      return handleSubmit(submitShippingForm)(e);
    }
    if (editModalRef && scrollView) {
      editModalRef.measure((x, y, width, height) => {
        const scrollPosition = y - height;
        scrollView.scrollTo({ x: 0, y: scrollPosition, animated: true });
      });
    }
    setEditShipmentDetailsError(emailSignUpLabels.shippingAddressEditError);
    return null;
  };

  return (
    <>
      <ShippingFormWrapper>
        {bagLoading ? (
          <ShippingLoaderWrapper>
            <PickupPageSkeleton />
          </ShippingLoaderWrapper>
        ) : (
          <>
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
                setEditState={setEditState}
                editShipmentDetailsError={editShipmentDetailsError}
                setEditModalRef={modalRef => {
                  editModalRef = modalRef;
                }}
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
                  initialValues={initialValues}
                />
              </FormSection>
            )}
          </>
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
        btnText={nextCTAText(labels, isVenmoPaymentInProgress, isVenmoShippingDisplayed)}
        routeToPage=""
        onPress={e => handleShippingFormSubmit(e)}
        isGuest={isGuest}
        backLinkText={
          orderHasPickUp &&
          getLabelValue(labels, 'lbl_shipping_backLinkText', 'shipping', 'checkout')
        }
        onBackLinkPress={() => setCheckoutStage(CONSTANTS.PICKUP_DEFAULT_PARAM)}
        pageCategory="shippingPage"
        showAccordian
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
  initialValues: PropTypes.shape({}).isRequired,
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
  setCheckoutStage: PropTypes.func.isRequired,
  isVenmoPaymentInProgress: PropTypes.bool,
  isVenmoShippingDisplayed: PropTypes.bool,
  emailSignUpLabels: PropTypes.shape({}).isRequired,
  scrollView: PropTypes.shape({}).isRequired,
  bagLoading: PropTypes.bool.isRequired,
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
  isVenmoPaymentInProgress: false,
  isVenmoShippingDisplayed: true,
};

export default reduxForm({
  form: 'checkoutShipping',
  ...validateMethod, // a unique identifier for this form
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(ShippingForm);

export { ShippingForm as ShippingFormVanilla };
