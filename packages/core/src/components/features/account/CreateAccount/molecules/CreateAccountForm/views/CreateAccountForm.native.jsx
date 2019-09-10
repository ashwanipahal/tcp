import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { PropTypes } from 'prop-types';
import TextBox from '../../../../../../common/atoms/TextBox';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  Styles,
  ParentView,
  ButtonWrapper,
  AlreadyAccountWrapper,
  PasswordWrapper,
  ConfirmPasswordWrapper,
  ConfirmHideShowField,
} from '../styles/CreateAccountForm.style.native';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import CustomButton from '../../../../../../common/atoms/Button';
import Anchor from '../../../../../../common/atoms/Anchor';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';

class CreateAccountForm extends PureComponent<Props> {
  onSaveMyPlaceRewards = value => {
    console.log('onSaveMyPlaceRewards: ', value);
  };

  onUseTouchID = value => {
    console.log('onUseTouchID: ', value);
  };

  onUseFaceID = value => {
    console.log('onUseFaceID: ', value);
  };

  showLoginSection = () => {
    const { showLogin } = this.props;
    showLogin();
  };

  render() {
    const {
      labels,
      handleSubmit,
      handleSubmitForm,
      onPwdHideShowClick,
      hideShowPwd,
      onConfirmPwdHideShowClick,
      confirmHideShowPwd,
      getTouchStatus,
    } = this.props;
    return (
      <View {...this.props}>
        <ParentView>
          <Field
            label={labels.registration.lbl_createAccount_firstName}
            name="firstName"
            id="firstName"
            type="text"
            component={TextBox}
            dataLocator="firstName"
          />
          <Field
            label={labels.registration.lbl_createAccount_lastName}
            name="lastName"
            id="lastName"
            type="text"
            component={TextBox}
            dataLocator="lastName"
          />
          <Field
            label={labels.registration.lbl_createAccount_phoneNumber}
            name="phoneNumber"
            id="phoneNumber"
            type="text"
            component={TextBox}
            dataLocator="phoneNumber"
          />
          <Field
            label={labels.registration.lbl_createAccount_zipCode}
            name="noCountryZip"
            id="ZipCode"
            type="text"
            component={TextBox}
            dataLocator="Zip-Code"
          />
          <Field
            label={labels.registration.lbl_createAccount_emailAddress}
            name="emailAddress"
            id="emailAddress"
            type="text"
            component={TextBox}
            dataLocator="emailAddress"
          />
          <Field
            label={labels.registration.lbl_createAccount_confirmEmail}
            name="confirmEmailAddress"
            id="confirmEmailAddress"
            type="text"
            component={TextBox}
            dataLocator="confirmEmailAddress"
          />
          <PasswordWrapper>
            <Field
              label={labels.registration.lbl_createAccount_password}
              name="password"
              id="password"
              type="text"
              component={TextBox}
              dataLocator="password"
              secureTextEntry={!hideShowPwd}
            />

            <ConfirmHideShowField>
              <Field
                name="hide-show-pwd"
                component={InputCheckbox}
                dataLocator="hide-show-pwd"
                disabled={false}
                rightText={
                  hideShowPwd
                    ? labels.registration.lbl_createAccount_hide
                    : labels.registration.lbl_createAccount_show
                }
                onClick={onPwdHideShowClick}
                hideCheckboxIcon
              />
            </ConfirmHideShowField>
          </PasswordWrapper>
          <ConfirmPasswordWrapper>
            <Field
              label={labels.registration.lbl_createAccount_confirmPassword}
              name="confirmPassword"
              id="confirmPassword"
              type="text"
              component={TextBox}
              dataLocator="confirmPassword"
              secureTextEntry={!confirmHideShowPwd}
            />
            <ConfirmHideShowField>
              <Field
                name="hide-show-confirm-pwd"
                component={InputCheckbox}
                dataLocator="hide-show-confirm-pwd"
                disabled={false}
                rightText={
                  confirmHideShowPwd
                    ? labels.registration.lbl_createAccount_hide
                    : labels.registration.lbl_createAccount_show
                }
                onClick={onConfirmPwdHideShowClick}
                hideCheckboxIcon
              />
            </ConfirmHideShowField>
          </ConfirmPasswordWrapper>

          {/* CHECKBOXES */}
          <Field
            inputVariation="inputVariation-1"
            name="saveMyPlaceRewards"
            component={InputCheckbox}
            dataLocator="saveMyPlaceRewards"
            disabled={false}
            rightText={labels.registration.lbl_createAccount_saveRewards}
            onClick={this.onSaveMyPlaceRewards}
          />
          <Field
            inputVariation="inputVariation-1"
            name="iAgree"
            component={InputCheckbox}
            dataLocator="iAgree"
            disabled={false}
            rightText={`${labels.registration.lbl_createAccount_termsConditions_app} ${
              labels.registration.lbl_createAccount_termsConditions_1_app
            }`}
            marginTop={13}
          />
          {getTouchStatus === 'TouchID' ||
            (getTouchStatus === true && (
              <Field
                name="useTouchID"
                component={InputCheckbox}
                dataLocator="useTouchID"
                disabled={false}
                marginTop={13}
                rightText={labels.registration.lbl_createAccount_useTouchId}
                onClick={this.onUseTouchID}
              />
            ))}
          {getTouchStatus === 'FaceID' && (
            <Field
              name="useFaceID"
              component={InputCheckbox}
              dataLocator="useFaceID"
              disabled={false}
              rightText={labels.registration.lbl_createAccount_useFaceId}
              marginTop={13}
              onClick={this.onUseFaceID}
            />
          )}
          <ButtonWrapper>
            <CustomButton
              text={labels.registration.lbl_createAccount_createAccount}
              buttonVariation="variable-width"
              onPress={handleSubmit(handleSubmitForm)}
              fill="BLUE"
            />
          </ButtonWrapper>
          <AlreadyAccountWrapper>
            <Anchor
              fontSizeVariation="xlarge"
              anchorVariation="secondary"
              text={labels.registration.lbl_createAccount_alreadyAccount}
              onPress={this.showLoginSection}
              underlineBlue
            />
          </AlreadyAccountWrapper>
        </ParentView>
      </View>
    );
  }
}

const validateMethod = createValidateMethod(
  getStandardConfig([
    'firstName',
    'lastName',
    'phoneNumber',
    'noCountryZip',
    'emailAddress',
    'confirmEmailAddress',
    'password',
    'confirmPassword',
    'iAgree',
  ])
);

CreateAccountForm.propTypes = {
  labels: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    rememberMe: PropTypes.string,
    saveMyRewards: PropTypes.string,
    login: PropTypes.string,
    createAccount: PropTypes.string,
  }),
  handleSubmit: PropTypes.func,
  handleSubmitForm: PropTypes.func,
  onPwdHideShowClick: PropTypes.func,
  hideShowPwd: PropTypes.bool,
  onConfirmPwdHideShowClick: PropTypes.func,
  onRequestClose: PropTypes.func,
  confirmHideShowPwd: PropTypes.bool,
};

CreateAccountForm.defaultProps = {
  labels: {
    lbl_createAccount_firstName: 'First Name',
    lbl_createAccount_lastName: 'Last Name',
    lbl_createAccount_phoneNumber: 'Phone Number',
    lbl_createAccount_zipCode: 'Zip Code',
    lbl_createAccount_emailAddress: 'Email Address',
    lbl_createAccount_confirmEmail: 'Confirm Email Address',
    lbl_createAccount_password: 'Password',
    lbl_createAccount_confirmPassword: 'Confirm Password',
    lbl_createAccount_useTouchId: 'Use Touch ID',
    lbl_createAccount_useFaceId: 'Use Face ID',
  },
  handleSubmit: () => {},
  handleSubmitForm: () => {},
  onPwdHideShowClick: () => {},
  hideShowPwd: false,
  onConfirmPwdHideShowClick: () => {},
  onRequestClose: () => {},
  confirmHideShowPwd: false,
};

export default reduxForm({
  form: 'myCreateAccountForm',
  ...validateMethod,
  enableReinitialize: true,
})(withStyles(CreateAccountForm, Styles));
export { CreateAccountForm as CreateAccountFormVanilla };
