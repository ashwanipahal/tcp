import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, FormSection } from 'redux-form';
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

class PickUpFormPart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isEditing: props.isGuest };
  }

  handleEditModeChange = isEditing => {
    this.setState({ isEditing });
  };

  onEditMainContactSubmit = () => {
    this.setState({ isEditing: false });
  };

  SaveAndCancelButton = () => {
    return (
      <div className="buttonContainer">
        <Button
          onClick={() => {}}
          buttonVariation="variable-width"
          type="button"
          data-locator="payment-cancelbtn"
        >
          Cancel
        </Button>
        <Button
          className="updateButton"
          onClick={() => {}}
          buttonVariation="variable-width"
          type="button"
          fill="BLUE"
          data-locator="payment-cancelbtn"
        >
          Update
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
      pickUpData,
    } = this.props;
    const { isEditing } = this.state;
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
          <form name="checkoutPickup" className="checkoutPickupForm">
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
                    isMobile={isMobile}
                    isEditing={isEditing}
                    className="pickup-contact-guest-form"
                    showPhoneNumber
                    pickUpData={pickUpData}
                    labels={pickUpLabels}
                    onSubmit={this.onEditMainContactSubmit}
                    onEditModeChange={this.handleEditModeChange}
                  />
                )}
              </FormSection>
            </div>
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
                    noUnderline
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
            <div lassName="pickUpAlternate-container">
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
            {isEditing && this.SaveAndCancelButton()}
          </form>
        </div>
      </div>
    );
  }
}

PickUpFormPart.propTypes = {
  className: PropTypes.string,
  isGuest: PropTypes.bool,
  isMobile: PropTypes.bool,
  isUsSite: PropTypes.bool,
  isOrderUpdateChecked: PropTypes.bool,
  isAlternateUpdateChecked: PropTypes.bool,
  pickupError: PropTypes.string,
  currentPhoneNumber: PropTypes.string,
  pickUpLabels: PropTypes.shape({}).isRequired,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
  initialValues: PropTypes.shape({}).isRequired,
};

PickUpFormPart.defaultProps = {
  className: '',
  isGuest: false,
  isMobile: false,
  isUsSite: false,
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
