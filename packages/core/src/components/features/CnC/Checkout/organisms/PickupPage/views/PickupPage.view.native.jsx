import React from 'react';
import { View, ScrollView } from 'react-native';
import { Field, reduxForm, FormSection, change, initialize } from 'redux-form';
import PropTypes from 'prop-types';
import Button from '@tcp/core/src/components/common/atoms/Button';
import withStyles from '../../../../../../common/hoc/withStyles';

import PickupPageSkeleton from './PickupPageSkeleton.native';
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
import CheckoutPageEmptyBag from '../../../molecules/CheckoutPageEmptyBag';

const formName = 'checkoutPickup';
class PickUpFormPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      dataUpdated: false,
      editPickupError: '',
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
    pickupDidMount(true);
  }

  handleEditModeChange = (isEditing, pickUpContact) => {
    let { editPickupError } = this.state;
    if (isEditing) {
      editPickupError = '';
    }
    if (pickUpContact) {
      this.setState({
        isEditing,
        editPickupError,
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
        editPickupError,
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
    const { onPickupSubmit, navigation, pickUpLabels } = this.props;
    const { isEditing } = this.state;
    const { firstName, lastName, phoneNumber, emailAddress } = data.pickUpContact;
    const { hasAlternatePickup } = data.pickUpAlternate;
    if (!isEditing) {
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
      return onPickupSubmit(params);
    }
    this.setState({ editPickupError: pickUpLabels.editFormSubmitError });

    return this.errorMessageRef.measure((x, y, width, height) => {
      const scrollPosition = y - height;
      this.scrollView.scrollTo({ x: 0, y: scrollPosition, animated: true });
    });
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
      checkoutPageEmptyBagLabels,
      cartOrderItemsCount,
      bagLoading,
    } = this.props;
    const { isEditing, pickUpContact, dataUpdated, editPickupError } = this.state;
    if (!dataUpdated) {
      this.updatePickupForm();
    }
    return (
      <>
        {cartOrderItemsCount > 0 ? (
          <>
            <CheckoutProgressIndicator
              activeStage="pickup"
              navigation={navigation}
              availableStages={availableStages}
              setCheckoutStage={setCheckoutStage}
            />
            <ScrollView
              ref={ref => {
                this.scrollView = ref;
              }}
            >
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
                  {bagLoading ? (
                    <PickupPageSkeleton />
                  ) : (
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
                            errorMessageRef={ref => {
                              this.errorMessageRef = ref;
                            }}
                            editModeSubmissionError={editPickupError}
                            dispatch={dispatch}
                            labels={pickUpLabels}
                            handleSubmit={handleSubmit}
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
                  )}
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
                btnText={pickUpLabels.nextToBilling}
                routeToPage="ShippingPage"
                isGuest={isGuest}
                onPress={handleSubmit(this.pickupSubmit)}
                pageCategory="pickupPage"
                showAccordian
              />
            </ScrollView>
          </>
        ) : (
          <CheckoutPageEmptyBag labels={checkoutPageEmptyBagLabels} />
        )}
      </>
    );
  }
}

PickUpFormPart.propTypes = {
  isGuest: PropTypes.bool,
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
  pickupDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onPickupSubmit: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  availableStages: PropTypes.shape([]).isRequired,
  setCheckoutStage: PropTypes.func.isRequired,
  checkoutPageEmptyBagLabels: PropTypes.shape({}).isRequired,
  cartOrderItemsCount: PropTypes.number.isRequired,
  bagLoading: PropTypes.number.isRequired,
};

PickUpFormPart.defaultProps = {
  isGuest: true,
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
