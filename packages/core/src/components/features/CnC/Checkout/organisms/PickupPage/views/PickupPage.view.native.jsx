import React from 'react';
import { View, ScrollView } from 'react-native';
import { Field, reduxForm, FormSection } from 'redux-form';
import PropTypes from 'prop-types';
import Button from '@tcp/core/src/components/common/atoms/Button';
import withStyles from '../../../../../../common/hoc/withStyles';

import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import SMSFormFields from '../../../../../../common/molecules/SMSFormFields';
import PickUpAlternateFormPart from '../../../molecules/PickUpAlternateFormPart';
import PickupMainContactEditForm from '../../../molecules/PickupMainContactEditForm';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';

import {
  FormStyle,
  Container,
  PickupContainer,
  PickUpForm,
  SmsSignUpForm,
  EmailSignupForm,
  PickUpAlternateForm,
  PickupError,
  CheckBoxWrapper,
  CheckBoxColOne,
  CheckBoxColTwo,
  CheckBoxTextWrapper,
  CheckBoxSubWrapper,
  TextWrapper,
} from '../styles/PickupPage.view.native.style';
import ErrorMessage from '../../../../common/molecules/ErrorMessage';
import ContactFormFields from '../../../molecules/ContactFormFields';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import Anchor from '../../../../../../common/atoms/Anchor';
import CnCTemplate from '../../../../common/organism/CnCTemplate';

const formName = 'checkoutPickup';
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

  SaveAndCancelButton = () => {
    const { pickUpLabels } = this.props;
    return (
      <View>
        <Button
          buttonVariation="variable-width"
          text={pickUpLabels.btnCancel}
          onPress={this.handleExitEditModeClick}
        />
        <Button buttonVariation="variable-width" text={pickUpLabels.btnUpdate} onPress={() => {}} />
      </View>
    );
  };

  render() {
    const {
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
      navigation,
      onPickUpSubmit,
    } = this.props;
    const { isEditing, isReset } = this.state;

    return (
      <ScrollView>
        <Container>
          <PickupError>
            <ErrorMessage
              error={pickupError}
              className="pickupError"
              fontSize="fs14"
              fontWeight="black"
              dataLocator="pickup-error"
            />
          </PickupError>
          <PickupContainer>
            <CheckoutSectionTitleDisplay title={pickUpLabels.title} dataLocator="pickup-title" />
            <PickUpForm>
              <FormSection name="pickUpContact">
                {isGuest ? (
                  <ContactFormFields
                    formName={formName}
                    className="pickup-contact-guest-form"
                    showEmailAddress
                    showPhoneNumber
                    labels={pickUpLabels}
                  />
                ) : (
                  <PickupMainContactEditForm
                    formName={formName}
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
            </PickUpForm>
            {isSmsUpdatesEnabled && (
              <SmsSignUpForm>
                <FormSection name="smsSignUp">
                  <SMSFormFields
                    isOrderUpdateChecked={isOrderUpdateChecked}
                    formName={formName}
                    formSection="smsSignUp"
                    dispatch={dispatch}
                    altInitValue={currentPhoneNumber}
                    labels={smsSignUpLabels}
                  />
                </FormSection>
              </SmsSignUpForm>
            )}
            {isGuest && !isUsSite && (
              <EmailSignupForm>
                <CheckBoxWrapper>
                  <CheckBoxColOne>
                    <Field
                      name="emailSignup"
                      component={InputCheckbox}
                      dataLocator="hide-show-checkbox"
                      enableSuccessCheck={false}
                    />
                  </CheckBoxColOne>
                  <CheckBoxColTwo>
                    <CheckBoxTextWrapper>
                      <BodyCopy
                        dataLocator="pickup-email-signUp-heading-lbl"
                        fontSize="fs14"
                        mobileFontFamily="secondary"
                        fontWeight="regular"
                        text={pickUpLabels.emailSignupHeading}
                      />
                    </CheckBoxTextWrapper>
                  </CheckBoxColTwo>
                </CheckBoxWrapper>
                <CheckBoxSubWrapper>
                  <CheckBoxColOne />
                  <CheckBoxColTwo>
                    <BodyCopy
                      fontSize="fs10"
                      fontFamily="primary"
                      fontWeight="regular"
                      text={pickUpLabels.emailSignupSubHeading}
                    />
                    <TextWrapper>
                      <BodyCopy
                        fontSize="fs10"
                        fontFamily="primary"
                        fontWeight="regular"
                        text={pickUpLabels.emailSignupSubSubHeading}
                      />
                    </TextWrapper>
                    <Anchor
                      underline
                      anchorVariation="primary"
                      fontSizeVariation="small"
                      noLink
                      href="#"
                      target="_blank"
                      text={pickUpLabels.emailSignupContact}
                    />
                  </CheckBoxColTwo>
                </CheckBoxSubWrapper>
              </EmailSignupForm>
            )}
            <PickUpAlternateForm>
              <FormSection name="pickUpAlternate">
                <PickUpAlternateFormPart
                  isAlternateUpdateChecked={isAlternateUpdateChecked}
                  showNoteOnToggle
                  formName={formName}
                  formSection="pickUpAlternate"
                  labels={pickUpLabels}
                  isEditing={isEditing}
                />
              </FormSection>
            </PickUpAlternateForm>
          </PickupContainer>
        </Container>
        <CnCTemplate
          navigation={navigation}
          btnText="NEXT:SHIPPING"
          routeToPage="ShippingPage"
          onPress={handleSubmit(onPickUpSubmit)}
        />
      </ScrollView>
    );
  }
}

PickUpFormPart.propTypes = {
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
  navigation: PropTypes.shape({}).isRequired,
  onPickUpSubmit: PropTypes.func.isRequired,
};

PickUpFormPart.defaultProps = {
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
  form: formName, // a unique identifier for this form
  ...validateMethod,
  destroyOnUnmount: false,
})(withStyles(PickUpFormPart, FormStyle));
export { PickUpFormPart as PickUpFormPartVanilla };
