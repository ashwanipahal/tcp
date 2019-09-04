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
  PickUpHeading,
} from '../styles/PickupPage.style.native';
import ErrorMessage from '../../../../common/molecules/ErrorMessage';
import ContactFormFields from '../../../molecules/ContactFormFields';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import Anchor from '../../../../../../common/atoms/Anchor';
import CnCTemplate from '../../../../common/organism/CnCTemplate';
import CheckoutProgressIndicator from '../../../molecules/CheckoutProgressIndicator';

const formName = 'checkoutPickup';
class PickUpFormPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false };
  }

  handleEditModeChange = isEditing => {
    this.setState({ isEditing });
  };

  onEditMainContactSubmit = () => {
    this.setState({ isEditing: false });
  };

  handleExitEditModeClick = () => {
    this.setState({ isEditing: false });
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
      isSmsUpdatesEnabled,
      dispatch,
      handleSubmit,
      navigation,
      onPickUpSubmit,
    } = this.props;
    const { isEditing, pickUpContact } = this.state;

    return (
      <>
        <CheckoutProgressIndicator activeStage="pickup" navigation={navigation} />
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
              {isGuest && <PickUpHeading>{pickUpLabels.pickupContactText}</PickUpHeading>}
              {!isGuest && (
                <CheckoutSectionTitleDisplay
                  title={pickUpLabels.title}
                  dataLocator="pickup-title"
                />
              )}
              <PickUpForm>
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
              </PickUpForm>
              {isSmsUpdatesEnabled && (
                <SmsSignUpForm>
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
                    formName="checkoutPickup"
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
      </>
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
  isGuest: true,
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
