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
      isAddNewAddress: false,
      modalType: null,
      modalState: false,
    }
  }

  componentDidUpdate(prevProps) {
    const { shipmentMethods: prevShipmentMethods, isSaveToAddressBookChecked: prevSaveToAddressBookChecked } = prevProps;
    const { shipmentMethods: nextShipmentMethods, dispatch, defaultShipmentId, isSaveToAddressBookChecked } = this.props;
    const { isAddNewAddress, modalType, modalState } = this.state;
    if (prevShipmentMethods && nextShipmentMethods && prevShipmentMethods !== nextShipmentMethods) {
      dispatch(change(formName, 'shipmentMethods.shippingMethodId', defaultShipmentId));
    }
    if (prevSaveToAddressBookChecked !== isSaveToAddressBookChecked && (!isAddNewAddress || (modalType === 'add' && modalState))) {
      dispatch(change(formName, 'defaultShipping', isSaveToAddressBookChecked))
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { isEditing, modalType, modalState } = prevState;
    const { onFileAddressKey, dispatch, userAddresses } = nextProps;
    if ((isEditing || (modalType === 'edit' && modalState)) && onFileAddressKey && userAddresses && userAddresses.size > 0) {
      const address = userAddresses.find(add => add.addressId === onFileAddressKey);
      dispatch(change(formName, 'address.firstName', address.firstName));
      dispatch(change(formName, 'address.lastName', address.lastName));
      dispatch(change(formName, 'address.city', address.city));
      dispatch(change(formName, 'address.zipCode', address.zipCode));
      dispatch(change(formName, 'address.state', address.state));
      dispatch(change(formName, 'address.addressLine1', address.addressLine[0]));
      dispatch(change(formName, 'address.addressLine2', address.addressLine[1]));
      dispatch(change(formName, 'address.phoneNumber', address.phone1));
    }
    if ((modalType === 'add' && modalState)) {
      dispatch(resetSection(formName, 'address'));
    }
  }

  toggleIsEditing = () => {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
  }

  toggleAddNewAddress = () => {
    const { isAddNewAddress } = this.state;
    this.setState({ isAddNewAddress: !isAddNewAddress });
  }

  toggleAddEditModal = ({ type, e }) => {
    if (e) e.preventDefault();
    const { defaultAddressId, dispatch } = this.props;
    const { modalState, modalType } = this.state;
    this.setState({ modalType: type, modalState: !modalState });
    if (modalType === 'add' && modalState) {
      dispatch(change(formName, 'onFileAddressKey', defaultAddressId))
    }
  }

  renderEmailSignUp = () => {
    const { emailSignUpLabels, orderHasPickUp, isGuest, isUsSite } = this.props;
    return !orderHasPickUp && isGuest && !isUsSite && (
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
  }

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
      userAddresses
    } = this.props;
    const { isEditing, isAddNewAddress, modalType, modalState } = this.state;
    return (
      <>
        <CheckoutSectionTitleDisplay title={shippingLabels.header} />
        <BodyCopy
          fontFamily="primary"
          fontSize="fs28"
          fontWeight="regular"
          data-locator="shipping-details"
          className={`elem-mb-XS elem-mt-MED ${userAddresses && userAddresses.size !== 0 ? 'hide-on-desktop' : ''}`}
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
              toggleAddNewAddress={this.toggleAddNewAddress}
              isSaveToAddressBookChecked={isSaveToAddressBookChecked}
              modalType={modalType}
              modalState={modalState}
              toggleAddEditModal={this.toggleAddEditModal}
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
          )
          }
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
          />
        </form>
      </>
    )
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
