import React from 'react';
import { View, ScrollView } from 'react-native';
import { Field, reduxForm, FormSection, change, initialize } from 'redux-form';
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
import VenmoBanner from '../../../../../../common/molecules/VenmoBanner';
import CONSTANTS from '../../../Checkout.constants';

const formName = 'checkoutPickup';
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
      <View>
        <Button text={pickUpLabels.btnCancel} onClick={this.handleExitEditModeClick} />
        <Button text={pickUpLabels.btnUpdate} onPress={handleSubmit(this.pickupEditSubmit)} />
      </View>
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
    const { onPickupSubmit, navigation } = this.props;
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
      navigation,
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

  /**
   * This function is to validate if we need to show venmo banner or not.
   * Only if user comes on pickup or shipping page, but not on coming back from navigation
   * @params {string} currentSection - current checkout section name
   */
  isShowVenmoBanner = currentSection => {
    const {
      isVenmoPaymentInProgress,
      isVenmoPickupDisplayed,
      isVenmoShippingDisplayed,
    } = this.props;
    const { CHECKOUT_STAGES } = CONSTANTS;
    return (
      isVenmoPaymentInProgress &&
      ((currentSection.toLowerCase() === CHECKOUT_STAGES.PICKUP && !isVenmoPickupDisplayed) ||
        (currentSection.toLowerCase() === CHECKOUT_STAGES.SHIPPING && !isVenmoShippingDisplayed))
    );
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
      availableStages,
      setCheckoutStage,
    } = this.props;
    const { isEditing, pickUpContact, dataUpdated } = this.state;
    if (!dataUpdated) {
      this.updatePickupForm();
    }
    return (
      <>
        <CheckoutProgressIndicator
          activeStage={CONSTANTS.CHECKOUT_STAGES.PICKUP}
          navigation={navigation}
          availableStages={availableStages}
          setCheckoutStage={setCheckoutStage}
        />
        {this.isShowVenmoBanner(CONSTANTS.CHECKOUT_STAGES.PICKUP) && (
          <VenmoBanner labels={pickUpLabels} />
        )}
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
            btnText={this.getNextCTAText()}
            routeToPage="ShippingPage"
            isGuest={isGuest}
            onPress={handleSubmit(this.pickupSubmit)}
            showAccordian
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
  pickupInitialValues: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onPickupSubmit: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  availableStages: PropTypes.shape([]).isRequired,
  setCheckoutStage: PropTypes.func.isRequired,
  isVenmoPaymentInProgress: PropTypes.bool,
  isVenmoPickupDisplayed: PropTypes.bool,
  isVenmoShippingDisplayed: PropTypes.bool,
  orderHasShipping: PropTypes.bool.isRequired,
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
  isVenmoPaymentInProgress: false,
  isVenmoPickupDisplayed: true,
  isVenmoShippingDisplayed: true,
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
