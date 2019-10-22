import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import Button from '@tcp/core/src/components/common/atoms/Button';
import Image from '@tcp/core/src/components/common/atoms/Image';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import RichText from '@tcp/core/src/components/common/atoms/RichText';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import ReactTooltip from '@tcp/core/src/components/common/atoms/ReactToolTip';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import createValidateMethod from '@tcp/core/src/utils/formValidation/createValidateMethod';
import getStandardConfig from '@tcp/core/src/utils/formValidation/validatorStandardConfig';
import PasswordRequirement from '@tcp/core/src/components/features/account/ResetPassword/molecules/PasswordRequirement';
import IconInfoLogo from '@tcp/core/src/assets/info-icon.png';
import {
  ViewWithSpacing,
  BodyCopyWithSpacing,
} from '@tcp/core/src/components/common/atoms/styledWrapper';
import theme from '@tcp/core/styles/themes/TCP';
import {
  Styles,
  ParentView,
  ButtonWrapper,
  PasswordWrapper,
  ConfirmPasswordWrapper,
  HideShowField,
  IconContainer,
  CheckBoxContainerView,
  CheckBoxImage,
  CheckMessageView,
} from '../styles/ConfirmationAccountForm.style.native';
import Constants from '../../../../../account/ChangePassword/container/CurrentPassword.utils';

const buttonStyle = {
  fontWeight: theme.typography.fontWeights.extrabold,
};

/**
 * @function renderEmailAddress
 * @param {String} emailAddress
 * @param {String} label
 * @returns {JSX}
 */
const renderEmailAddress = (emailAddress, label) => {
  return emailAddress ? (
    <ViewWithSpacing spacingStyles="margin-bottom-MED">
      <BodyCopy
        textAlign="center"
        fontFamily="secondary"
        fontSize="fs14"
        fontWeight="extrabold"
        color="gray[900]"
        lineHeight="1.71"
        text={label}
      />
      <BodyCopyWithSpacing
        textAlign="center"
        fontFamily="secondary"
        fontSize="fs14"
        fontWeight="extrabold"
        color="gray[900]"
        lineHeight="1.71"
        text={emailAddress}
        spacingStyles="margin-top-XXS"
      />
    </ViewWithSpacing>
  ) : (
    <Field
      label="Email Address"
      name="emailAddress"
      id="emailAddress"
      component={TextBox}
      dataLocator="email-address-field"
      type="text"
    />
  );
};

/**
 * @function renderNotification
 * @param {Boolean} success
 * @param {String} successMsg
 * @param {String} error
 * @returns {JSX} Notification component with error or success state as provided in the input params.
 */
const renderNotification = (success, successMsg) => {
  return success && <Notification status="success" message={successMsg} />;
};

/**
 * @function ConfirmationCreateAccountForm
 * @param {Object} Props
 * @returns {JSX} Render method
 */
export class CreateAccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Password: {
        New: true,
        Confirm: true,
      },
    };
  }

  componentDidUpdate(prevProps) {
    const { toastMessage, createAccountError } = this.props;
    if (createAccountError !== prevProps.createAccountError) {
      toastMessage(createAccountError);
    }
  }

  onShowHidePassword = type => {
    const { Password } = this.state;
    const updatedPassord = Password;
    updatedPassord[type] = !Password[type];
    this.setState({ Password: updatedPassord });
  };

  getHideShowView = (type, isShowText) => {
    const {
      labels: { lbl_createAccount_show: lblShow, lbl_createAccount_hide: lblHide },
    } = this.props;
    return (
      <HideShowField>
        <Field
          name="hide-show-pwd"
          component={InputCheckbox}
          dataLocator="hide-show-pwd"
          disabled={false}
          rightText={!isShowText ? lblHide : lblShow}
          hideCheckboxIcon
          fontSize="fs13"
          onClick={() => this.onShowHidePassword(type)}
        />
      </HideShowField>
    );
  };

  render() {
    const {
      isPromptForUserDetails,
      emailAddress,
      userInformation,
      handleSubmit,
      createAccountSubmit,
      createAccountSuccess,
      resetAccountErrorState,
      labels: {
        lbl_createAccount_emailAddress: lblEmailAddress,
        lbl_createAccount_password: lblPassword,
        lbl_createAccount_confirmPassword: lblConfirmPassword,
        lbl_createAccount_firstName: lblFirstName,
        lbl_createAccount_lastName: lblLastName,
        lbl_createAccount_phoneNumber: lblPhoneNumber,
        lbl_createAccount_zipCode: lblZipCode,
        lbl_createAccount_createAccount: lblSubmitButton,
        lbl_createAccount_termsConditions: lblTermsAndConditions1,
        lbl_createAccount_termsConditions_1: lblTermsAndConditions2,

        lbl_createAccount_heading: lblHeading,
        lbl_createAccount_succcessMsg: lblSucccessMsg,
      },
      passwordLabels,
    } = this.props;

    const formSubmit = formValues => {
      resetAccountErrorState();
      createAccountSubmit({
        isOrderConfirmation: true,
        ...userInformation,
        ...formValues,
      });
    };
    const { Password } = this.state;
    const isAgreeText = `${lblTermsAndConditions1} ${lblTermsAndConditions2}`;
    return (
      <View>
        <ParentView>
          {renderNotification(createAccountSuccess, lblSucccessMsg)}
          <ViewWithSpacing spacingStyles="margin-bottom-MED">
            <BodyCopy
              textAlign="center"
              fontFamily="primary"
              fontSize="fs26"
              fontWeight="regular"
              color="gray.900"
              text={lblHeading}
            />
          </ViewWithSpacing>
          {renderEmailAddress(emailAddress, lblEmailAddress)}
          {isPromptForUserDetails ? (
            <Field
              label={lblFirstName}
              name="firstName"
              id="firstName"
              type="text"
              component={TextBox}
              dataLocator="first-name-field"
            />
          ) : null}
          {isPromptForUserDetails && (
            <Field
              label={lblLastName}
              name="lastName"
              id="lastName"
              component={TextBox}
              dataLocator="last name-field"
              enableSuccessCheck={false}
              type="text"
            />
          )}
          <PasswordWrapper>
            <Field
              label={lblPassword}
              name="password"
              id="password"
              component={TextBox}
              dataLocator="password-field"
              enableSuccessCheck={false}
              secureTextEntry={Password.New}
            />

            <IconContainer>
              <ReactTooltip
                withOverlay={false}
                popover={<PasswordRequirement labels={passwordLabels} />}
                height={200}
                width={300}
                textAlign="left"
              >
                <Image source={IconInfoLogo} height={12} width={12} />
              </ReactTooltip>
            </IconContainer>

            {this.getHideShowView(Constants.New, Password.New)}
          </PasswordWrapper>
          <ConfirmPasswordWrapper>
            <Field
              label={lblConfirmPassword}
              name="confirmPassword"
              id="confirmPassword"
              component={TextBox}
              dataLocator="confirm-Password-field"
              enableSuccessCheck={false}
              secureTextEntry={Password.Confirm}
            />
            {this.getHideShowView(Constants.Confirm, Password.Confirm)}
          </ConfirmPasswordWrapper>
          {isPromptForUserDetails && (
            <Field
              label={lblPhoneNumber}
              name="phoneNumber"
              id="phoneNumber"
              type="tel"
              component={TextBox}
              maxLength={50}
              dataLocator="phone-number-field"
              enableSuccessCheck={false}
            />
          )}
          {isPromptForUserDetails && (
            <Field
              label={lblZipCode}
              name="noCountryZip"
              id="noCountryZip"
              component={TextBox}
              dataLocator="zip-code-field"
              enableSuccessCheck={false}
            />
          )}
          <ViewWithSpacing spacingStyles="margin-top-XXL margin-bottom-XXL">
            <CheckBoxContainerView>
              <CheckBoxImage>
                <Field
                  name="iAgree"
                  component={InputCheckbox}
                  dataLocator="i-agree-checkbox"
                  alignCheckbox="top"
                  enableSuccessCheck={false}
                />
              </CheckBoxImage>
              <CheckMessageView>
                <RichText source={{ html: isAgreeText }} />
              </CheckMessageView>
            </CheckBoxContainerView>
            <Field label="" component={TextBox} title="" type="hidden" id="iAgree" name="iAgree" />
          </ViewWithSpacing>
          <ButtonWrapper>
            <Button
              buttonVariation="fixed-width"
              fill="BLUE"
              type="submit"
              data-locator="create-account-btn"
              text={lblSubmitButton}
              onPress={handleSubmit(formSubmit)}
              customTextStyle={buttonStyle}
            />
          </ButtonWrapper>
        </ParentView>
      </View>
    );
  }
}

const validateMethod = createValidateMethod(
  getStandardConfig([
    'emailAddress',
    'firstName',
    'lastName',
    'phoneNumber',
    'noCountryZip',
    'password',
    'confirmPassword',
    'iAgree',
  ])
);

CreateAccountForm.propTypes = {
  isPromptForUserDetails: PropTypes.bool,
  emailAddress: PropTypes.string.isRequired,
  userInformation: PropTypes.shape({}),
  handleSubmit: PropTypes.func.isRequired,
  createAccountSubmit: PropTypes.func.isRequired,
  createAccountSuccess: PropTypes.bool,
  createAccountError: PropTypes.string,
  resetAccountErrorState: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    lbl_createAccount_emailAddress: PropTypes.string,
    lbl_createAccount_password: PropTypes.string,
    lbl_createAccount_confirmPassword: PropTypes.string,
    lbl_createAccount_firstName: PropTypes.string,
    lbl_createAccount_lastName: PropTypes.string,
    lbl_createAccount_phoneNumber: PropTypes.string,
    lbl_createAccount_zipCode: PropTypes.string,
    lbl_createAccount_createAccount: PropTypes.string,
    lbl_createAccount_termsConditions: PropTypes.string,
    lbl_createAccount_termsConditions_1: PropTypes.string,
    lbl_createAccount_show: PropTypes.string,
    lbl_createAccount_hide: PropTypes.string,
    lbl_createAccount_heading: PropTypes.string,
  }),
  passwordLabels: PropTypes.shape({}),
  toastMessage: PropTypes.func.isRequired,
};

CreateAccountForm.defaultProps = {
  isPromptForUserDetails: false,
  userInformation: {},
  createAccountSuccess: null,
  createAccountError: '',
  labels: {
    lbl_createAccount_emailAddress: '',
    lbl_createAccount_password: '',
    lbl_createAccount_confirmPassword: '',
    lbl_createAccount_firstName: '',
    lbl_createAccount_lastName: '',
    lbl_createAccount_phoneNumber: '',
    lbl_createAccount_zipCode: '',
    lbl_createAccount_createAccount: '',
    lbl_createAccount_termsConditions: '',
    lbl_createAccount_termsConditions_1: '',
    lbl_createAccount_show: '',
    lbl_createAccount_hide: '',
    lbl_createAccount_heading: '',
  },
  passwordLabels: {},
};

/**
 * Redux Form HOC
 */
export default reduxForm({
  form: 'ConfirmationCreateAccountForm', // a unique identifier for this form
  ...validateMethod,
  enableReinitialize: true,
})(withStyles(CreateAccountForm, Styles));
export { CreateAccountForm as ConfirmationCreateAccountFormVanilla };
