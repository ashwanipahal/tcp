import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { PropTypes } from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
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
import TouchFaceIdCheckBox from '../../../../common/molecule/FaceTouchCheckBox/views/faceTouchIdCheckBox.native';
import { formatPhoneNumber } from '../../../../../../../utils/formValidation/phoneNumber';

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
      userplccCardNumber,
      userplccCardId,
    } = this.props;
    const getPlccLbl = getLabelValue(
      labels,
      'lbl_createAccount_plcc_checkbox_Text',
      'registration'
    ).replace('#number', `${userplccCardNumber}`);
    return (
      <View {...this.props}>
        <ParentView>
          <Field
            label={getLabelValue(labels, 'lbl_createAccount_firstName', 'registration')}
            name="firstName"
            id="firstName"
            type="text"
            component={TextBox}
            dataLocator="firstName"
          />
          <Field
            label={getLabelValue(labels, 'lbl_createAccount_lastName', 'registration')}
            name="lastName"
            id="lastName"
            type="text"
            component={TextBox}
            dataLocator="lastName"
          />
          <Field
            label={getLabelValue(labels, 'lbl_createAccount_phoneNumber', 'registration')}
            name="phoneNumber"
            id="phoneNumber"
            type="text"
            component={TextBox}
            dataLocator="phoneNumber"
            normalize={formatPhoneNumber}
          />
          <Field
            label={getLabelValue(labels, 'lbl_createAccount_zipCode', 'registration')}
            name="noCountryZip"
            id="ZipCode"
            type="text"
            component={TextBox}
            dataLocator="Zip-Code"
          />
          <Field
            label={getLabelValue(labels, 'lbl_createAccount_emailAddress', 'registration')}
            name="emailAddress"
            id="emailAddress"
            type="text"
            component={TextBox}
            dataLocator="emailAddress"
          />
          <Field
            label={getLabelValue(labels, 'lbl_createAccount_confirmEmail', 'registration')}
            name="confirmEmailAddress"
            id="confirmEmailAddress"
            type="text"
            component={TextBox}
            dataLocator="confirmEmailAddress"
          />
          <PasswordWrapper>
            <Field
              label={getLabelValue(labels, 'lbl_createAccount_password', 'registration')}
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
                    ? getLabelValue(labels, 'lbl_createAccount_hide', 'registration')
                    : getLabelValue(labels, 'lbl_createAccount_show', 'registration')
                }
                onClick={onPwdHideShowClick}
                hideCheckboxIcon
              />
            </ConfirmHideShowField>
          </PasswordWrapper>
          <ConfirmPasswordWrapper>
            <Field
              label={getLabelValue(labels, 'lbl_createAccount_confirmPassword', 'registration')}
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
                    ? getLabelValue(labels, 'lbl_createAccount_hide', 'registration')
                    : getLabelValue(labels, 'lbl_createAccount_show', 'registration')
                }
                onClick={onConfirmPwdHideShowClick}
                hideCheckboxIcon
              />
            </ConfirmHideShowField>
          </ConfirmPasswordWrapper>

          {/* CHECKBOXES */}

          {!!(userplccCardNumber && userplccCardId) && (
            <Field
              inputVariation="inputVariation-1"
              name="plcc_checkbox"
              component={InputCheckbox}
              dataLocator="plcc_checkbox"
              disabled={false}
              rightText={getPlccLbl}
              marginTop={13}
            />
          )}

          <Field
            inputVariation="inputVariation-1"
            name="iAgree"
            component={InputCheckbox}
            dataLocator="iAgree"
            disabled={false}
            rightText={`${getLabelValue(
              labels,
              'lbl_createAccount_termsConditions_app',
              'registration'
            )} ${getLabelValue(labels, 'lbl_createAccount_termsConditions_1_app', 'registration')}`}
            marginTop={13}
          />
          <TouchFaceIdCheckBox labels={labels} getTouchStatus={getTouchStatus} />
          <ButtonWrapper>
            <CustomButton
              text={getLabelValue(labels, 'lbl_createAccount_createAccount', 'registration')}
              onPress={handleSubmit(handleSubmitForm)}
              fill="BLUE"
            />
          </ButtonWrapper>
          <AlreadyAccountWrapper>
            <Anchor
              fontSizeVariation="xlarge"
              anchorVariation="secondary"
              text={getLabelValue(labels, 'lbl_createAccount_alreadyAccount', 'registration')}
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
  userplccCardNumber: PropTypes.string,
  userplccCardId: PropTypes.string,
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
  userplccCardId: '',
  userplccCardNumber: '',
};

export default reduxForm({
  form: 'myCreateAccountForm',
  ...validateMethod,
  enableReinitialize: true,
})(withStyles(CreateAccountForm, Styles));
export { CreateAccountForm as CreateAccountFormVanilla };
