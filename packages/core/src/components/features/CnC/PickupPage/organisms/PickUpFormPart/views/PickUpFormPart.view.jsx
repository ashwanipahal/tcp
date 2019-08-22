import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, FormSection } from 'redux-form';
import withStyles from '../../../../../../common/hoc/withStyles';

import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import ErrorMessage from '../../../../common/molecules/ErrorMessage';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import SMSFormFields from '../../../../../../common/molecules/SMSFormFields';
import PickUpAlternateFormPart from '../../../molecules/PickUpAlternateFormPart';
import ContactFormFields from '../../../molecules/ContactFormFields';
import styles from '../styles/PickUpFormPart.style';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';

class PickUpFormPart extends React.PureComponent {
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
    } = this.props;
    return (
      <div className={className}>
        <div className="container">
          <CheckoutSectionTitleDisplay
            title={pickUpLabels.title}
            className="summary-title-pick-up"
          />
          {pickupError && (
            <ErrorMessage
              error={pickupError}
              className="pickupError"
              fontSize="fs14"
              fontWeight="black"
            />
          )}
          <form name="checkoutPickup" className="checkoutPickupForm">
            <div className="pickUpContact">
              <FormSection name="pickUpContact" className="pickUpContact">
                {isGuest ? (
                  <ContactFormFields
                    className="pickup-contact-guest-form"
                    showEmailAddress
                    showPhoneNumber
                    labels={pickUpLabels}
                  />
                ) : (
                  <ContactFormFields isMobile={isMobile} />
                )}
              </FormSection>
            </div>

            {isUsSite && (
              <div className="pick-up-form-container">
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
                <Field name="emailSignup" component={InputCheckbox} className="email-signup">
                  <BodyCopy fontSize="fs16" fontFamily="secondary" fontWeight="regular">
                    {pickUpLabels.emailSignupHeading}
                  </BodyCopy>
                </Field>
                <div className="emailSignupText">
                  <BodyCopy fontSize="fs12" fontFamily="secondary" fontWeight="regular">
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
                    href="https://www.childrensplace.com/us/help-center/#privacyPolicySectionli"
                    target="_blank"
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
                />
              </FormSection>
            </div>
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
