import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, FormSection } from 'redux-form';
import withStyles from '../../../../../../common/hoc/withStyles';

// import CheckoutSectionTitleDisplay from '../../../molecules/CheckoutSectionTitleDisplay';
import ErrorMessage from '../../../../common/molecules/ErrorMessage';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
// import SMSFormFields from '../../../molecules/SmsSignupFormSection';
import PickUpAlternateFormPart from '../../../molecules/PickUpAlternateFormPart';
import ContactFormFields from '../../../molecules/ContactFormFields';
import styles from '../styles/PickUpFormPart.style';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';

const SMSFormFields = () => {
  return null;
};
class PickUpFormPart extends React.PureComponent {
  render() {
    const {
      className,
      isGuest,
      isMobile,
      isSMSActive,
      pickupError,
      isUsSite,
      currentPhoneNumber,
      isOrderUpdateChecked,
      isAlternateUpdateChecked,
    } = this.props;
    return (
      <div className={className}>
        <div className="container">
          {/* <CheckoutSectionTitleDisplay title="Pickup" className="summary-title-pick-up" /> */}
          {pickupError && (
            <ErrorMessage
              error={pickupError}
              className="pickupError"
              fontSize="fs14"
              fontWeight="black"
            />
          )}
          <form name="checkoutPickup" className="checkoutPickupForm">
            <FormSection name="pickUpContact">
              {isGuest ? (
                <ContactFormFields
                  className="pickup-contact-guest-form"
                  showEmailAddress
                  showPhoneNumber
                />
              ) : (
                <ContactFormFields isMobile={isMobile} />
              )}
            </FormSection>
            <FormSection name="smsSignUp" className="pick-up-form-container">
              <SMSFormFields
                isOrderUpdateChecked={isOrderUpdateChecked}
                formName="checkoutPickup"
                formSection="smsSignUp"
                altInitValue={currentPhoneNumber}
                shouldRender={isSMSActive}
              />
            </FormSection>
            {isGuest && !isUsSite && (
              <div className="email-signup-container">
                <Field
                  name="emailSignup"
                  component={InputCheckbox}
                  title="Sign up for email today & get $10 off your next purchase!*"
                  className="email-signup"
                >
                  <BodyCopy fontSize="fs16" fontFamily="secondary" fontWeight="regular">
                    Sign up for email today & get $10 off your next purchase!*
                  </BodyCopy>
                </Field>
                <div className="emailSignupText">
                  <BodyCopy fontSize="fs12" fontFamily="secondary" fontWeight="regular">
                    I understand I will receive marketing emails from The Childrens Place.
                  </BodyCopy>
                  <BodyCopy fontSize="fs12" fontFamily="secondary" fontWeight="regular">
                    *Applies to new email subscribers only. Exclusions apply. Offer valid on your
                    next purchase of $40 or more. You may withdraw your consent at any time.
                  </BodyCopy>
                  <Anchor
                    anchorVariation="secondary"
                    dataLocator="pickup-contactUs"
                    onClick={this.showForgotPasswordForm}
                  >
                    Contact us
                  </Anchor>
                </div>
              </div>
            )}
            <FormSection name="pickUpAlternate">
              <PickUpAlternateFormPart
                isAlternateUpdateChecked={isAlternateUpdateChecked}
                showNoteOnToggle
                formName="checkoutPickup"
                formSection="pickUpAlternate"
              />
            </FormSection>
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
  isSMSActive: PropTypes.bool,
  isUsSite: PropTypes.bool,
  isOrderUpdateChecked: PropTypes.bool,
  isAlternateUpdateChecked: PropTypes.bool,
  pickupError: PropTypes.string,
  currentPhoneNumber: PropTypes.string,
};

PickUpFormPart.defaultProps = {
  className: '',
  isGuest: false,
  isMobile: false,
  isSMSActive: false,
  isUsSite: false,
  isOrderUpdateChecked: false,
  isAlternateUpdateChecked: false,
  pickupError: '',
  currentPhoneNumber: '',
};

const validateMethod = createValidateMethod({
  pickUpContact: ContactFormFields.ContactValidationConfig,
  pickUpAlternate: ContactFormFields.ContactValidationConfig,
});

export default reduxForm({
  form: 'checkoutPickup', // a unique identifier for this form
  ...validateMethod,
  destroyOnUnmount: false,
})(withStyles(PickUpFormPart, styles));
