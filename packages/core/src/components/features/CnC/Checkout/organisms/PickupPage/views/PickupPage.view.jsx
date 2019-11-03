import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, FormSection, change, initialize } from 'redux-form';
import withStyles from '../../../../../../common/hoc/withStyles';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import ErrorMessage from '../../../../common/molecules/ErrorMessage';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import SMSFormFields from '../../../../../../common/molecules/SMSFormFields';
import PickUpAlternateFormPart from '../../../molecules/PickUpAlternateFormPart';
import PickupMainContactEditForm from '../../../molecules/PickupMainContactEditForm';
import ContactFormFields from '../../../molecules/ContactFormFields';
import styles from '../styles/PickupPage.style';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Button from '../../../../../../common/atoms/Button';
import Anchor from '../../../../../../common/atoms/Anchor';
import CheckoutFooter from '../../../molecules/CheckoutFooter';
import CheckoutOrderInfo from '../../../molecules/CheckoutOrderInfoMobile';

class PickUpFormPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      dataUpdated: false,
      pickUpContact: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: '',
      },
    };
  }

  componentDidMount() {
    const { pickupDidMount } = this.props;
    pickupDidMount();
  }

  handleEditModeChange = (isEditing, pickUpContact) => {
    if (pickUpContact) {
      this.setState({
        isEditing,
        dataUpdated: true,
        pickUpContact: {
          firstName: pickUpContact.firstName,
          lastName: pickUpContact.lastName,
          phoneNumber: pickUpContact.phoneNumber,
          emailAddress: pickUpContact.emailAddress,
        },
      });
    } else {
      this.setState({
        isEditing,
      });
    }
  };

  onEditMainContactSubmit = () => {
    this.setState({ isEditing: false });
  };

  handleExitEditModeClick = () => {
    const { dispatch } = this.props;
    const { pickUpContact } = this.state;
    dispatch(change('checkoutPickup', `pickUpContact.firstName`, pickUpContact.firstName));
    dispatch(change('checkoutPickup', `pickUpContact.lastName`, pickUpContact.lastName));
    dispatch(change('checkoutPickup', `pickUpContact.phoneNumber`, pickUpContact.phoneNumber));
    dispatch(change('checkoutPickup', `pickUpContact.emailAddress`, pickUpContact.emailAddress));
    this.setState({ isEditing: false });
  };

  SaveAndCancelButton = () => {
    const { pickUpLabels, handleSubmit } = this.props;
    return (
      <div className="buttonContainer">
        <Button
          onClick={this.handleExitEditModeClick}
          buttonVariation="variable-width"
          type="button"
          data-locator="pickup-cancelbtn"
        >
          {pickUpLabels.btnCancel}
        </Button>
        <Button
          onClick={handleSubmit(this.pickupEditSubmit)}
          className="updateButton"
          fill="BLUE"
          type="button"
          buttonVariation="variable-width"
          data-locator="pickup-addcardbtn"
        >
          {pickUpLabels.btnUpdate}
        </Button>
      </div>
    );
  };

  pickupEditSubmit = value => {
    const { pickUpContact } = value;
    this.setState({
      dataUpdated: true,
    });
    this.handleEditModeChange(false, pickUpContact);
  };

  pickupSubmit = data => {
    const { onPickupSubmit } = this.props;
    const { firstName, lastName, phoneNumber, emailAddress } = data.pickUpContact;
    const { hasAlternatePickup } = data.pickUpAlternate;
    const params = {
      pickUpContact: {
        firstName,
        lastName,
        phoneNumber,
        emailAddress,
        smsInfo: {
          wantsSmsOrderUpdates: data.smsSignUp.sendOrderUpdate,
        },
      },
      hasAlternatePickup,
      pickUpAlternate: {
        firstName: hasAlternatePickup ? data.pickUpAlternate.firstName : '',
        lastName: hasAlternatePickup ? data.pickUpAlternate.lastName : '',
        emailAddress: hasAlternatePickup ? data.pickUpAlternate.emailAddress : '',
      },
    };
    onPickupSubmit(params);
  };

  /**
   * This method is to return the label text based on venmo or normal checkout
   */
  getNextCTAText = () => {
    const {
      isVenmoPaymentInProgress,
      orderHasShipping,
      pickUpLabels,
      isVenmoPickupDisplayed,
    } = this.props;
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

  updatePickupForm() {
    const { pickupInitialValues, dispatch } = this.props;
    const { pickUpContact } = this.state;
    if (
      pickupInitialValues &&
      pickupInitialValues.pickUpContact &&
      (pickupInitialValues.pickUpContact.firstName !== pickUpContact.firstName ||
        pickupInitialValues.pickUpContact.lastName !== pickUpContact.lastName ||
        pickupInitialValues.pickUpContact.phoneNumber !== pickUpContact.phoneNumber)
    ) {
      const pickUpContactUpdate = {
        firstName: pickupInitialValues.pickUpContact.firstName,
        lastName: pickupInitialValues.pickUpContact.lastName,
        phoneNumber: pickupInitialValues.pickUpContact.phoneNumber,
        emailAddress: pickupInitialValues.pickUpContact.emailAddress,
      };
      dispatch(initialize('checkoutPickup', pickupInitialValues));
      this.setState({ pickUpContact: pickUpContactUpdate });
    }
  }

  render() {
    const {
      className,
      isGuest,
      isMobile,
      pickupError,
      isUsSite,
      pickUpLabels,
      smsSignUpLabels,
      currentPhoneNumber,
      isOrderUpdateChecked,
      isAlternateUpdateChecked,
      isSmsUpdatesEnabled,
      dispatch,
      handleSubmit,
      showAccordian,
      ServerErrors,
      pageCategory,
    } = this.props;
    const { isEditing, pickUpContact, dataUpdated } = this.state;
    if (!dataUpdated) {
      this.updatePickupForm();
    }

    return (
      <div className={className}>
        <div className="container">
          {pickupError && (
            <ErrorMessage
              error={pickupError}
              className="pickupError"
              fontSize="fs14"
              fontWeight="black"
              dataLocator="pickup-error"
            />
          )}
          <CheckoutSectionTitleDisplay
            title={pickUpLabels.title}
            dataLocator="pickup-title"
            className="summary-title-pick-up"
          />
          {ServerErrors && <ServerErrors />}
          <div className="pickUpContact" dataLocator="pickup-contact">
            <FormSection name="pickUpContact">
              {isGuest ? (
                <ContactFormFields
                  className="pickup-contact-guest-form"
                  showEmailAddress
                  showPhoneNumber
                  labels={pickUpLabels}
                />
              ) : (
                <PickupMainContactEditForm
                  dispatch={dispatch}
                  labels={pickUpLabels}
                  handleSubmit={handleSubmit}
                  isMobile={isMobile}
                  isEditing={isEditing}
                  className="pickup-contact-guest-form"
                  showPhoneNumber
                  formData={pickUpContact}
                  onEditModeChange={this.handleEditModeChange}
                  handleExitEditModeClick={this.handleExitEditModeClick}
                />
              )}
            </FormSection>
          </div>
          {isSmsUpdatesEnabled && (
            <div className="pick-up-form-container" dataLocator="pickup-sms">
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
            </div>
          )}
          {isGuest && !isUsSite && (
            <div className="email-signup-container">
              <Field
                dataLocator="signUp-checkbox-field"
                name="emailSignup"
                component={InputCheckbox}
                className="email-signup"
              >
                <BodyCopy
                  dataLocator="pickup-email-signUp-heading-lbl"
                  fontSize="fs16"
                  fontFamily="secondary"
                  fontWeight="regular"
                >
                  {pickUpLabels.emailSignupHeading}
                </BodyCopy>
              </Field>
              <div className="emailSignupText">
                <BodyCopy
                  dataLocator="pickup-email-signUp-sub-heading-text"
                  fontSize="fs12"
                  fontFamily="secondary"
                  fontWeight="regular"
                >
                  {pickUpLabels.emailSignupSubHeading}
                </BodyCopy>
                <BodyCopy fontSize="fs12" fontFamily="secondary" fontWeight="regular">
                  {pickUpLabels.emailSignupSubSubHeading}
                </BodyCopy>
                <Anchor
                  anchorVariation="primary"
                  fontSizeVariation="small"
                  noLink
                  href="#"
                  target="_blank"
                  dataLocator="pickup-email-signUp-contact-anchor"
                >
                  {pickUpLabels.emailSignupContact}
                </Anchor>
              </div>
            </div>
          )}
          <div className="pickUpAlternate-container">
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
          </div>
          {isEditing && !isMobile && this.SaveAndCancelButton()}
        </div>
        <CheckoutOrderInfo
          isGuest={isGuest}
          showAccordian={showAccordian}
          pageCategory={pageCategory}
        />
        <form onSubmit={handleSubmit(this.pickupSubmit)}>
          <CheckoutFooter
            hideBackLink={false}
            backLinkText={`${pickUpLabels.returnTo} ${pickUpLabels.pickupText}`}
            nextButtonText={this.getNextCTAText()}
            disableNext={isEditing}
          />
        </form>
      </div>
    );
  }
}

PickUpFormPart.propTypes = {
  className: PropTypes.string,
  isGuest: PropTypes.bool,
  isMobile: PropTypes.bool,
  isUsSite: PropTypes.bool,
  isSmsUpdatesEnabled: PropTypes.bool,
  isOrderUpdateChecked: PropTypes.bool,
  isAlternateUpdateChecked: PropTypes.bool,
  orderHasShipping: PropTypes.isRequired,
  pickupError: PropTypes.string,
  currentPhoneNumber: PropTypes.string,
  pickUpLabels: PropTypes.shape({}).isRequired,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
  pickupInitialValues: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onPickupSubmit: PropTypes.func.isRequired,
  pickupDidMount: PropTypes.func.isRequired,
  isVenmoPaymentInProgress: PropTypes.bool,
  showAccordian: PropTypes.bool,
  pageCategory: PropTypes.string,
  isVenmoPickupDisplayed: PropTypes.bool,
  ServerErrors: PropTypes.node.isRequired,
};

PickUpFormPart.defaultProps = {
  className: '',
  isGuest: false,
  isMobile: false,
  isUsSite: false,
  isSmsUpdatesEnabled: false,
  isOrderUpdateChecked: false,
  isAlternateUpdateChecked: false,
  pickupError: '',
  currentPhoneNumber: '',
  pageCategory: '',
  isVenmoPaymentInProgress: false,
  showAccordian: true,
  isVenmoPickupDisplayed: true,
};

const validateMethod = createValidateMethod({
  pickUpContact: ContactFormFields.ContactValidationConfig,
  smsSignUp: SMSFormFields.smsFormFieldsConfig,
  pickUpAlternate: ContactFormFields.ContactValidationConfig,
});

export default reduxForm({
  form: 'checkoutPickup', // a unique identifier for this form
  ...validateMethod,
  destroyOnUnmount: false,
})(withStyles(PickUpFormPart, styles));
export { PickUpFormPart as PickUpFormPartVanilla };
