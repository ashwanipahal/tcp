import React from 'react';
import PropTypes from 'prop-types';
import { FormSection, reduxForm, Field, change, resetSection } from 'redux-form';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import InputCheckbox from '../../../../../../../../common/atoms/InputCheckbox';
import AddressFields from '../../../../../../../../common/molecules/AddressFields';
import SMSFormFields from '../../../../../../../../common/molecules/SMSFormFields';
import createValidateMethod from '../../../../../../../../../utils/formValidation/createValidateMethod';
import styles from '../styles/ShippingForm.styles';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import ShipmentMethods from '../../../../../../common/molecules/ShipmentMethods';
import CheckoutFooter from '../../../../../molecules/CheckoutFooter';
import Anchor from '../../../../../../../../common/atoms/Anchor';
import getStandardConfig from '../../../../../../../../../utils/formValidation/validatorStandardConfig';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import RegisteredShippingForm from '../../RegisteredShippingForm';

const formName = 'checkoutShipping';

class ShippingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      modalType: null,
      modalState: false,
      isEditingMode: false,
    };
    this.isAddressModalEmptied = false;
  }

  componentDidUpdate(prevProps) {
    const {
      shipmentMethods: prevShipmentMethods,
      isSaveToAddressBookChecked: prevSaveToAddressBookChecked,
    } = prevProps;
    const {
      shipmentMethods: nextShipmentMethods,
      dispatch,
      defaultShipmentId,
      isSaveToAddressBookChecked,
      isAddNewAddress,
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
    this.checkPropsOnUpdation(prevProps);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { isEditing, modalType, modalState, isEditingMode } = prevState;
    const { onFileAddressKey, dispatch, userAddresses, isMobile } = nextProps;
    if (
      (isEditing || (modalType === 'edit' && modalState)) &&
      onFileAddressKey &&
      userAddresses &&
      userAddresses.size > 0 &&
      !isEditingMode
    ) {
      const address = userAddresses.find(add => add.addressId === onFileAddressKey);
      const isDefaultAddress = address.primary === 'true';
      dispatch(change(formName, 'address.firstName', address.firstName));
      dispatch(change(formName, 'address.lastName', address.lastName));
      dispatch(change(formName, 'address.city', address.city));
      dispatch(change(formName, 'address.zipCode', address.zipCode));
      dispatch(change(formName, 'address.state', address.state));
      dispatch(change(formName, 'address.addressLine1', address.addressLine[0]));
      dispatch(change(formName, 'address.addressLine2', address.addressLine[1]));
      dispatch(change(formName, 'address.phoneNumber', address.phone1));
      dispatch(change(formName, 'defaultShipping', isDefaultAddress));
      if (!isMobile) {
        return { isEditingMode: true };
      }
    }
    return null;
  }

  checkPropsOnUpdation = prevProps => {
    const { dispatch, isAddNewAddress } = this.props;
    const { modalType, modalState } = this.state;
    if (((modalType === 'add' && modalState) || isAddNewAddress) && !this.isAddressModalEmptied) {
      dispatch(resetSection(formName, 'address'));
      this.isAddressModalEmptied = true;
    }
    if (!modalState && this.isAddressModalEmptied) {
      this.isAddressModalEmptied = false;
    }
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

  toggleIsEditing = () => {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
  };

  toggleAddEditModal = ({ type, e }) => {
    if (e) e.preventDefault();
    const { defaultAddressId, dispatch } = this.props;
    const { modalState } = this.state;
    this.setState({ modalType: type, modalState: !modalState });
    if (modalState) {
      dispatch(change(formName, 'onFileAddressKey', defaultAddressId));
    }
  };

  renderEmailSignUp = () => {
    const { emailSignUpLabels, orderHasPickUp, isGuest, isUsSite } = this.props;
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
                {emailSignUpLabels.emailSignupHeading}
              </BodyCopy>
            </Field>
            <div className="email-signup-text">
              <BodyCopy
                dataLocator="pickup-email-signUp-sub-heading-text"
                fontSize="fs12"
                fontFamily="secondary"
                fontWeight="regular"
              >
                {emailSignUpLabels.emailSignupSubHeading}
              </BodyCopy>
              <BodyCopy fontSize="fs12" fontFamily="secondary" fontWeight="regular">
                {emailSignUpLabels.emailSignupSubSubHeading}
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
                {emailSignUpLabels.emailSignupContact}
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
      shippingLabels,
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
    } = this.props;
    const { isEditing, modalType, modalState } = this.state;
    return (
      <>
        <CheckoutSectionTitleDisplay title={shippingLabels.header} />
        <BodyCopy
          fontFamily="primary"
          fontSize="fs28"
          fontWeight="regular"
          data-locator="shipping-details"
          className={`elem-mb-XS elem-mt-MED ${
            userAddresses && userAddresses.size !== 0 ? 'hide-on-desktop hide-on-tablet' : ''
          }`}
        >
          {shippingLabels.sectionHeader}
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
                shipmentHeader={shippingLabels.shipmentHeader}
              />
            </div>
          </FormSection>
          <CheckoutFooter
            hideBackLink={!!orderHasPickUp}
            backLinkHandler={routeToPickupPage}
            nextButtonText={shippingLabels.billingText}
            backLinkText={shippingLabels.backLinkText}
            disableNext={isEditing}
          />
        </form>
      </>
    );
  }
}

ShippingForm.propTypes = {
  addressLabels: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  isOrderUpdateChecked: PropTypes.bool,
  shippingLabels: PropTypes.shape({}).isRequired,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
  selectedShipmentId: PropTypes.string,
  addressPhoneNo: PropTypes.number,
  emailSignUpLabels: PropTypes.shape({}).isRequired,
  isGuest: PropTypes.bool,
  isUsSite: PropTypes.bool,
  orderHasPickUp: PropTypes.bool,
  shipmentMethods: PropTypes.shape([]),
  loadShipmentMethods: PropTypes.func.isRequired,
  routeToPickupPage: PropTypes.func.isRequired,
  isSaveToAddressBookChecked: PropTypes.bool,
  userAddresses: PropTypes.shape([]),
  onFileAddressKey: PropTypes.string,
  isMobile: PropTypes.bool,
  newUserPhoneNo: PropTypes.number,
  shippingAddressId: PropTypes.string,
  setAsDefaultShipping: PropTypes.bool,
  addNewShippingAddressData: PropTypes.func.isRequired,
  updateShippingMethodSelection: PropTypes.func.isRequired,
  saveToAddressBook: PropTypes.bool,
  updateShippingAddressData: PropTypes.func.isRequired,
  toggleAddNewAddress: PropTypes.func.isRequired,
  isAddNewAddress: PropTypes.bool,
  updateShippingAddress: PropTypes.func.isRequired,
  addNewShippingAddress: PropTypes.func.isRequired,
  defaultAddressId: PropTypes.string,
  defaultShipmentId: PropTypes.number,
};

ShippingForm.defaultProps = {
  className: '',
  isOrderUpdateChecked: false,
  selectedShipmentId: null,
  addressPhoneNo: null,
  isGuest: true,
  isUsSite: true,
  orderHasPickUp: false,
  shipmentMethods: null,
  isSaveToAddressBookChecked: false,
  userAddresses: [],
  onFileAddressKey: null,
  isMobile: false,
  newUserPhoneNo: null,
  shippingAddressId: null,
  setAsDefaultShipping: false,
  saveToAddressBook: false,
  isAddNewAddress: false,
  defaultAddressId: null,
  defaultShipmentId: null,
};

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
