import React from 'react';
import { FormSection, reduxForm, Field, change, resetSection } from 'redux-form';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import { Row, Col } from '../../../../../../../../common/atoms';

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
import GiftServices from '../../../molecules/GiftServices';

import styles from '../styles/ShippingForm.view.style';

const formName = 'checkoutShipping';

class ShippingForm extends React.Component {
  static changeAddressFields(nextProps) {
    const { onFileAddressKey, dispatch, userAddresses, shippingAddress } = nextProps;
    let address = {};
    let isDefaultAddress = false;
    if (userAddresses && userAddresses.size > 0) {
      address = userAddresses.find(add => add.addressId === onFileAddressKey);
      dispatch(change(formName, 'address.addressLine1', address.addressLine[0]));
      dispatch(change(formName, 'address.addressLine2', address.addressLine[1]));
      isDefaultAddress = address.primary === 'true';
      if (!isDefaultAddress && userAddresses.size === 1) isDefaultAddress = true;
    } else if (shippingAddress) {
      address = shippingAddress;
      dispatch(change(formName, 'address.addressLine1', address.addressLine1));
      dispatch(change(formName, 'address.addressLine2', address.addressLine2));
      isDefaultAddress = true;
    }
    dispatch(change(formName, 'address.firstName', address.firstName));
    dispatch(change(formName, 'address.lastName', address.lastName));
    dispatch(change(formName, 'address.city', address.city));
    dispatch(change(formName, 'address.zipCode', address.zipCode));
    dispatch(change(formName, 'address.state', address.state));
    dispatch(change(formName, 'address.phoneNumber', address.phone1));
    dispatch(change(formName, 'defaultShipping', isDefaultAddress));
    return { isEditingMode: true };
  }

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      isEditingMode: false,
      editShipmentDetailsError: '',
    };
    this.isAddressModalEmptied = false;
    this.addNewAddressEnabled = false;
    this.editShippingErrorRef = React.createRef();
  }

  shouldComponentUpdate() {
    const { isSubmitting } = this.props;
    return !isSubmitting;
  }

  componentDidUpdate(prevProps) {
    const { shipmentMethods: prevShipmentMethods } = prevProps;
    const { shipmentMethods: nextShipmentMethods, dispatch, defaultShipmentId } = this.props;
    if (prevShipmentMethods && nextShipmentMethods && prevShipmentMethods !== nextShipmentMethods) {
      dispatch(change(formName, 'shipmentMethods.shippingMethodId', defaultShipmentId));
    }
    this.checkPropsOnUpdation(prevProps);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { isEditing, isEditingMode, shippingAddress } = prevState;
    const { onFileAddressKey, userAddresses } = nextProps;
    if (
      isEditing &&
      onFileAddressKey &&
      ((userAddresses && userAddresses.size > 0) || shippingAddress) &&
      !isEditingMode
    ) {
      return ShippingForm.changeAddressFields(nextProps);
    }
    return null;
  }

  checkPropsOnUpdation = prevProps => {
    const { dispatch, isAddNewAddress } = this.props;
    if (isAddNewAddress && !this.isAddressModalEmptied && !this.addNewAddressEnabled) {
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
    const { dispatch, defaultAddressId } = this.props;
    const { isEditingMode, isEditing } = this.state;
    const { defaultAddressId: prevDefaultAddressId } = prevProps;
    if (prevDefaultAddressId && defaultAddressId && defaultAddressId !== prevDefaultAddressId) {
      dispatch(change(formName, 'onFileAddressKey', defaultAddressId));
      this.setState({ isEditing: false });
    }
    if (!isEditing && isEditingMode) {
      this.setState({ isEditingMode: false });
    }
  };

  toggleAddressState = () => {
    const { isAddNewAddress } = this.props;
    if (this.isAddressModalEmptied) {
      this.isAddressModalEmptied = false;
    }
    if (!isAddNewAddress && this.addNewAddressEnabled) {
      this.addNewAddressEnabled = false;
    }
  };

  toggleIsEditing = () => {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing, editShipmentDetailsError: '' });
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

  handleSubmit = e => {
    const { handleSubmit, emailSignUpLabels } = this.props;
    const { isEditing } = this.state;

    if (isEditing) {
      e.preventDefault();
      this.setState({
        editShipmentDetailsError: emailSignUpLabels.shippingAddressEditError,
      });
      return this.editShippingErrorRef.current.scrollIntoView(false);
    }
    return handleSubmit(e);
  };

  renderGiftServices = () => {
    const { isCanada, isGiftServicesChecked, dispatch } = this.props;
    return (
      !isCanada && (
        <Col colSize={{ small: 6, medium: 8, large: 6 }}>
          <GiftServices
            showDefaultCheckbox={false}
            formName={formName}
            formSection="giftServices"
            variation="secondary"
            isGiftServicesChecked={isGiftServicesChecked}
            dispatch={dispatch}
          />
        </Col>
      )
    );
  };

  render() {
    const {
      addressLabels: { addressFormLabels },
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
      setDefaultAddressId,
      syncErrorsObject,
      isVenmoPaymentInProgress,
      isVenmoShippingDisplayed,
      showAccordian,
      isMobile,
    } = this.props;
    const { isEditing, editShipmentDetailsError } = this.state;
    const nextButtonText =
      isVenmoPaymentInProgress && !isVenmoShippingDisplayed
        ? getLabelValue(labels, 'lbl_shipping_reviewText', 'shipping', 'checkout')
        : getLabelValue(labels, 'lbl_shipping_billingText', 'shipping', 'checkout');
    return (
      <>
        <CheckoutSectionTitleDisplay
          title={getLabelValue(labels, 'lbl_shipping_header', 'shipping', 'checkout')}
        />
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
        <form
          name={formName}
          className={className}
          onSubmit={this.handleSubmit}
          isEditing={isEditing}
        >
          {!isGuest && (
            <RegisteredShippingForm
              {...this.props}
              isEditing={isEditing}
              isMobile={isMobile}
              toggleIsEditing={this.toggleIsEditing}
              dispatch={dispatch}
              isAddNewAddress={isAddNewAddress}
              toggleAddNewAddress={toggleAddNewAddress}
              isSaveToAddressBookChecked={isSaveToAddressBookChecked}
              shippingAddressId={shippingAddressId}
              updateShippingAddress={updateShippingAddress}
              addNewShippingAddress={addNewShippingAddress}
              shippingAddress={shippingAddress}
              labels={labels}
              setDefaultAddressId={setDefaultAddressId}
              syncErrorsObject={syncErrorsObject}
              errorMessageRef={this.editShippingErrorRef}
              editShipmentDetailsError={editShipmentDetailsError}
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

          <Row fullBleed>
            <Col colSize={{ small: 6, medium: 8, large: 6 }}>
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
            </Col>
            {this.renderGiftServices()}
          </Row>
          <CheckoutOrderInfo showAccordian={showAccordian} isGuest={isGuest} />
          <CheckoutFooter
            hideBackLink={!!orderHasPickUp}
            backLinkHandler={routeToPickupPage}
            nextButtonText={nextButtonText}
            backLinkText={getLabelValue(
              labels,
              'lbl_shipping_backLinkText',
              'shipping',
              'checkout'
            )}
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
})(withStyles(ShippingForm, styles));
export { ShippingForm as ShippingFormVanilla };
