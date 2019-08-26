import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, FormSection, SubmissionError } from 'redux-form';
import withStyles from '../../../../../../common/hoc/withStyles';

import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import ErrorMessage from '../../../../common/molecules/ErrorMessage';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import SMSFormFields from '../../../../../../common/molecules/SMSFormFields';
import PickUpAlternateFormPart from '../../../molecules/PickUpAlternateFormPart';
import PickupMainContactEditForm from '../../../molecules/PickupMainContactEditForm';
import ContactFormFields from '../../../molecules/ContactFormFields';
import styles from '../styles/PickUpFormPart.style';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Button from '../../../../../../common/atoms/Button';
import Anchor from '../../../../../../common/atoms/Anchor';
import CheckoutFooter from '../../../molecules/CheckoutFooter';

class PickUpFormPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, isReset: false };
  }

  handleEditModeChange = isEditing => {
    this.setState({ isEditing, isReset: false });
  };

  onEditMainContactSubmit = () => {
    this.setState({ isEditing: false });
  };

  handleExitEditModeClick = () => {
    this.setState({ isEditing: false, isReset: true });
  };

  submit = () => {
    const { handleSubmit } = this.props;
    SubmissionError({ username: 'User does not exist', _error: 'Login failed!' });
    handleSubmit();
  };

  SaveAndCancelButton = () => {
    const { pickUpLabels } = this.props;
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
          className="updateButton"
          fill="BLUE"
          type="submit"
          buttonVariation="variable-width"
          data-locator="pickup-addcardbtn"
        >
          {pickUpLabels.btnUpdate}
        </Button>
      </div>
    );
  };

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
      initialValues,
      isSmsUpdatesEnabled,
      dispatch,
      handleSubmit,
    } = this.props;
    const { isEditing, isReset } = this.state;

    return (
      <div className={className}>
        <div className="container">
          <CheckoutSectionTitleDisplay
            title={pickUpLabels.title}
            dataLocator="pickup-title"
            className="summary-title-pick-up"
          />
          {pickupError && (
            <ErrorMessage
              error={pickupError}
              className="pickupError"
              fontSize="fs14"
              fontWeight="black"
              dataLocator="pickup-error"
            />
          )}
          <form onSubmit={handleSubmit} className="checkoutPickupForm">
            <div className="pickUpContact" dataLocator="pickup-contact">
              <FormSection name="pickUpContact" className="pickUpContact">
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
                    isMobile={isMobile}
                    isEditing={isEditing}
                    className="pickup-contact-guest-form"
                    showPhoneNumber
                    formData={initialValues}
                    isReset={isReset}
                    labels={pickUpLabels}
                    onSubmit={this.onEditMainContactSubmit}
                    onEditModeChange={this.handleEditModeChange}
                    onClose={this.handleExitEditModeClick}
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
          </form>
        </div>
        <form onSubmit={handleSubmit}>
          <CheckoutFooter
            disableBackLink="true"
            backLinkText={`${pickUpLabels.returnTo} ${pickUpLabels.pickupText}`}
            nextButtonText={`${pickUpLabels.nextText}: ${pickUpLabels.billingText}`}
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
  pickupError: PropTypes.string,
  currentPhoneNumber: PropTypes.string,
  pickUpLabels: PropTypes.shape({}).isRequired,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
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
