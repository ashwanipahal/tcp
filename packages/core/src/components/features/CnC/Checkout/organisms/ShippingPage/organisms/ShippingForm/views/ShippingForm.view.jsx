import React from 'react';
import { FormSection, reduxForm, Field, change, resetSection } from 'redux-form';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import InputCheckbox from '../../../../../../../../common/atoms/InputCheckbox';
import AddressFields from '../../../../../../../../common/molecules/AddressFields';
import SMSFormFields from '../../../../../../../../common/molecules/SMSFormFields';
import createValidateMethod from '../../../../../../../../../utils/formValidation/createValidateMethod';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import ShipmentMethods from '../../../../../../common/molecules/ShipmentMethods';
import CheckoutFooter from '../../../../../molecules/CheckoutFooter';
import Anchor from '../../../../../../../../common/atoms/Anchor';
import getStandardConfig from '../../../../../../../../../utils/formValidation/validatorStandardConfig';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import RegisteredShippingForm from '../../RegisteredShippingForm';
import CheckoutOrderInfo from '../../../../../molecules/CheckoutOrderInfoMobile';
import { getLabelValue } from '../../../../../../../../../utils';
import { propTypes, defaultProps } from './ShippingForm.view.utils';

import styles from '../styles/ShippingForm.styles';

const formName = 'checkoutShipping';

class ShippingForm extends React.Component {
  static changeAddressFields(nextProps) {
    const { onFileAddressKey, dispatch, userAddresses, isMobile, shippingAddress } = nextProps;
    let address = {};
    if (userAddresses && userAddresses.size > 0) {
      address = userAddresses.find(add => add.addressId === onFileAddressKey);
      dispatch(change(formName, 'address.addressLine1', address.addressLine[0]));
      dispatch(change(formName, 'address.addressLine2', address.addressLine[1]));
    } else if (shippingAddress) {
      address = shippingAddress;
      dispatch(change(formName, 'address.addressLine1', address.addressLine1));
      dispatch(change(formName, 'address.addressLine2', address.addressLine2));
    }
    const isDefaultAddress = address.primary === 'true';
    dispatch(change(formName, 'address.firstName', address.firstName));
    dispatch(change(formName, 'address.lastName', address.lastName));
    dispatch(change(formName, 'address.city', address.city));
    dispatch(change(formName, 'address.zipCode', address.zipCode));
    dispatch(change(formName, 'address.state', address.state));
    dispatch(change(formName, 'address.phoneNumber', address.phone1));
    dispatch(change(formName, 'defaultShipping', isDefaultAddress));
    if (!isMobile) {
      return { isEditingMode: true };
    }
    return { isEditingMobileMode: true };
  }

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      modalType: null,
      modalState: false,
      isEditingMode: false,
      isEditingMobileMode: false,
    };
    this.isAddressModalEmptied = false;
    this.addNewAddressEnabled = false;
  }

  componentDidUpdate(prevProps) {
    const {
      shipmentMethods: prevShipmentMethods,
      isSaveToAddressBookChecked: prevSaveToAddressBookChecked,
      isAddNewAddress: prevAddNewAddress,
    } = prevProps;
    const {
      shipmentMethods: nextShipmentMethods,
      dispatch,
      defaultShipmentId,
      isSaveToAddressBookChecked,
      isAddNewAddress,
      isAddNewAddress: nextIsAddNewAddress,
    } = this.props;
    const { modalType, modalState } = this.state;
    if (prevShipmentMethods && nextShipmentMethods && prevShipmentMethods !== nextShipmentMethods) {
      dispatch(change(formName, 'shipmentMethods.shippingMethodId', defaultShipmentId));
    }
    if (
      prevSaveToAddressBookChecked !== isSaveToAddressBookChecked &&
      (!isAddNewAddress || (modalType === 'add' && modalState))
    ) {
      dispatch(change(formName, 'defaultShipping', isSaveToAddressBookChecked));
    }

    if (!prevAddNewAddress && nextIsAddNewAddress !== prevAddNewAddress) {
      dispatch(change(formName, 'saveToAddressBook', nextIsAddNewAddress));
    }
    this.checkPropsOnUpdation(prevProps);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      isEditing,
      modalType,
      modalState,
      isEditingMode,
      isEditingMobileMode,
      shippingAddress,
    } = prevState;
    const { onFileAddressKey, userAddresses } = nextProps;
    if (
      (isEditing || (modalType === 'edit' && modalState)) &&
      onFileAddressKey &&
      ((userAddresses && userAddresses.size > 0) || shippingAddress) &&
      !isEditingMode &&
      !isEditingMobileMode
    ) {
      return ShippingForm.changeAddressFields(nextProps);
    }
    return null;
  }

  checkPropsOnUpdation = prevProps => {
    const { dispatch, isAddNewAddress } = this.props;
    const { modalType, modalState } = this.state;
    if (
      ((modalType === 'add' && modalState) || isAddNewAddress) &&
      !this.isAddressModalEmptied &&
      !this.addNewAddressEnabled
    ) {
      dispatch(resetSection(formName, 'address'));
      if (!this.isAddressModalEmptied) {
        this.isAddressModalEmptied = true;
      }
      if (!this.addNewAddressEnabled) {
        this.addNewAddressEnabled = true;
      }
    }
    this.toggleAddressState();

    this.checkPropsOnMoreUpdation(prevProps);
  };

  checkPropsOnMoreUpdation = prevProps => {
    const { dispatch, defaultAddressId, isMobile } = this.props;
    const { isEditingMode, isEditing } = this.state;
    const { defaultAddressId: prevDefaultAddressId } = prevProps;
    if (defaultAddressId && defaultAddressId !== prevDefaultAddressId) {
      if (isMobile) {
        this.toggleAddEditModal({ type: 'add' });
      } else {
        dispatch(change(formName, 'onFileAddressKey', defaultAddressId));
        this.setState({ isEditing: false });
      }
    }
    if (!isEditing && isEditingMode) {
      this.setState({ isEditingMode: false });
    }
  };

  toggleAddressState = () => {
    const { isAddNewAddress } = this.props;
    const { modalState } = this.state;
    if (!modalState && this.isAddressModalEmptied) {
      this.isAddressModalEmptied = false;
    }
    if (!isAddNewAddress && this.addNewAddressEnabled) {
      this.addNewAddressEnabled = false;
    }
  };

  toggleIsEditing = () => {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
  };

  toggleAddEditModal = ({ type, e }) => {
    if (e) e.preventDefault();
    const { defaultAddressId, dispatch } = this.props;
    const { modalState, isEditingMobileMode } = this.state;
    this.setState({ modalType: type, modalState: !modalState });
    if (modalState && type === 'add') {
      dispatch(change(formName, 'onFileAddressKey', defaultAddressId));
    }
    if (isEditingMobileMode) {
      this.setState({ isEditingMobileMode: !isEditingMobileMode });
    }
  };

  renderEmailSignUp = () => {
    const { orderHasPickUp, isGuest, isUsSite, labels } = this.props;
    return (
      !orderHasPickUp &&
      isGuest &&
      !isUsSite && (
        <FormSection name="emailSignUp">
          <div className="email-signup-container">
            <Field
              dataLocator="signUp-checkbox-field"
              name="sendEmailSignup"
              component={InputCheckbox}
              className="email-signup"
            >
              <BodyCopy
                dataLocator="pickup-email-signUp-heading-lbl"
                fontSize="fs16"
                fontFamily="secondary"
                fontWeight="regular"
              >
                {getLabelValue(labels, 'lbl_pickup_emailSignupHeading', 'pickup', 'checkout')}
              </BodyCopy>
            </Field>
            <div className="email-signup-text">
              <BodyCopy
                dataLocator="pickup-email-signUp-sub-heading-text"
                fontSize="fs12"
                fontFamily="secondary"
                fontWeight="regular"
              >
                {getLabelValue(labels, 'lbl_pickup_emailSignupSubHeading', 'pickup', 'checkout')}
              </BodyCopy>
              <BodyCopy fontSize="fs12" fontFamily="secondary" fontWeight="regular">
                {getLabelValue(labels, 'lbl_pickup_emailSignupSubSubHeading', 'pickup', 'checkout')}
              </BodyCopy>
              <Anchor
                noUnderline
                anchorVariation="primary"
                fontSizeVariation="small"
                noLink
                href="#"
                target="_blank"
                dataLocator="shipping-email-signUp-contact-anchor"
              >
                {getLabelValue(labels, 'lbl_pickup_emailSignupContact', 'pickup', 'checkout')}
              </Anchor>
            </div>
          </div>
        </FormSection>
      )
    );
  };

  render() {
    const {
      addressLabels: { addressFormLabels },
      handleSubmit,
      className,
      dispatch,
      isOrderUpdateChecked,
      smsSignUpLabels,
      selectedShipmentId,
      addressPhoneNo,
      isGuest,
      orderHasPickUp,
      shipmentMethods,
      loadShipmentMethods,
      routeToPickupPage,
      isSaveToAddressBookChecked,
      isUsSite,
      userAddresses,
      shippingAddressId,
      toggleAddNewAddress,
      isAddNewAddress,
      updateShippingAddress,
      addNewShippingAddress,
      labels,
      shippingAddress,
    } = this.props;
    const { isEditing, modalType, modalState } = this.state;
    return (
      <>
        <CheckoutSectionTitleDisplay
          title={getLabelValue(labels, 'lbl_shipping_header', 'shipping', 'checkout')}
        />
        <CheckoutOrderInfo isGuest={isGuest} />
        <BodyCopy
          fontFamily="primary"
          fontSize="fs28"
          fontWeight="regular"
          data-locator="shipping-details"
          className={`elem-mb-XS elem-mt-MED ${
            (userAddresses && userAddresses.size !== 0) || shippingAddress
              ? 'hide-on-desktop hide-on-tablet'
              : ''
          }`}
        >
          {getLabelValue(labels, 'lbl_shipping_sectionHeader', 'shipping', 'checkout')}
        </BodyCopy>
        <form name={formName} className={className} onSubmit={handleSubmit} isEditing={isEditing}>
          {!isGuest && (
            <RegisteredShippingForm
              {...this.props}
              isEditing={isEditing}
              toggleIsEditing={this.toggleIsEditing}
              dispatch={dispatch}
              isAddNewAddress={isAddNewAddress}
              toggleAddNewAddress={toggleAddNewAddress}
              isSaveToAddressBookChecked={isSaveToAddressBookChecked}
              modalType={modalType}
              modalState={modalState}
              toggleAddEditModal={this.toggleAddEditModal}
              shippingAddressId={shippingAddressId}
              updateShippingAddress={updateShippingAddress}
              addNewShippingAddress={addNewShippingAddress}
              shippingAddress={shippingAddress}
              labels={labels}
            />
          )}
          {isGuest && (
            <div className="address-form">
              <FormSection name="address">
                <AddressFields
                  addressFormLabels={addressFormLabels}
                  showDefaultCheckbox={false}
                  formName={formName}
                  formSection="address"
                  variation="secondary"
                  dispatch={dispatch}
                  addressPhoneNo={addressPhoneNo}
                  loadShipmentMethods={loadShipmentMethods}
                />
              </FormSection>
            </div>
          )}
          {!orderHasPickUp && isUsSite && (
            <FormSection name="smsSignUp">
              <SMSFormFields
                labels={smsSignUpLabels}
                showDefaultCheckbox={false}
                formName={formName}
                formSection="smsSignUp"
                variation="secondary"
                isOrderUpdateChecked={isOrderUpdateChecked}
                dispatch={dispatch}
                borderBottom={!isEditing}
                addressPhoneNo={addressPhoneNo}
              />
            </FormSection>
          )}
          {this.renderEmailSignUp()}
          <FormSection name="shipmentMethods">
            <div className="shipment-methods-form">
              <ShipmentMethods
                shipmentMethods={shipmentMethods}
                formName={formName}
                formSection="shipmentMethods"
                selectedShipmentId={selectedShipmentId}
                shipmentHeader={getLabelValue(
                  labels,
                  'lbl_shipping_shipmentHeader',
                  'shipping',
                  'checkout'
                )}
              />
            </div>
          </FormSection>
          <CheckoutOrderInfo />
          <CheckoutFooter
            hideBackLink={!!orderHasPickUp}
            backLinkHandler={routeToPickupPage}
            nextButtonText={getLabelValue(
              labels,
              'lbl_shipping_billingText',
              'shipping',
              'checkout'
            )}
            backLinkText={getLabelValue(
              labels,
              'lbl_shipping_backLinkText',
              'shipping',
              'checkout'
            )}
            disableNext={isEditing}
          />
        </form>
      </>
    );
  }
}

ShippingForm.propTypes = propTypes;

ShippingForm.defaultProps = defaultProps;

const validateMethod = createValidateMethod({
  address: AddressFields.addressValidationConfig,
  smsSignUp: SMSFormFields.smsFormFieldsConfig,
  emailSignUp: getStandardConfig(['sendEmailSignup']),
});

export default reduxForm({
  form: formName, // a unique identifier for this form
  ...validateMethod,
  destroyOnUnmount: false,
})(withStyles(ShippingForm, styles));
export { ShippingForm as ShippingFormVanilla };
