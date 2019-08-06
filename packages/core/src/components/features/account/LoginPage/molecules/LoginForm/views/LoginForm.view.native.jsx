import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { PropTypes } from 'prop-types';
import { noop } from 'lodash';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  FormStyle,
  DescriptionStyle,
  ModalHeading,
  ModalViewWrapper,
} from '../styles/LoginForm.style.native';
import TextBox from '../../../../../../common/atoms/TextBox';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import CustomButton from '../../../../../../common/atoms/Button';
import Anchor from '../../../../../../common/atoms/Anchor';
import LineComp from '../../../../../../common/atoms/Line';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';

import ModalNative from '../../../../../../common/molecules/Modal';
import CreateAccount from '../../../../CreateAccount';

const styles = {
  loginButtonStyle: {
    marginTop: 30,
  },

  createAccountStyle: {
    marginTop: 30,
  },

  forgotPasswordStyle: {
    marginTop: 10,
  },
  inputCheckBoxStyle: {
    width: '90%',
  },
};

/**
 * @param {string} props : props for CustomIcon
 * @return {JSX} IconClass : Return jsx icon component
 * @desc This method based on the props generate icon component.
 */

export const LoginForm = props => {
  const { labels, handleSubmit, onSubmit } = props;
  const [showModal, setModalState] = useState(false);

  const showForgotPassword = () => {
    const { showForgotPasswordForm, resetForm } = props;
    resetForm();
    showForgotPasswordForm();
  };

  const openModal = () => {
    setModalState(!showModal);
  };
  return (
    <View {...props}>
      <Field
        label={labels.login.lbl_login_email}
        name="emailAddress"
        id="emailAddress"
        type="text"
        component={TextBox}
        dataLocator="emailAddress"
      />
      <Field
        label={labels.login.lbl_login_password}
        name="password"
        id="password"
        type="text"
        component={TextBox}
        dataLocator="password"
        secureTextEntry
      />
      <View style={styles.inputCheckBoxStyle}>
        <Field
          name="rememberMe"
          component={InputCheckbox}
          dataLocator="rememberMe"
          disabled={false}
          rightText={labels.login.lbl_login_rememberMe}
        />
        <Field
          name="savePlcc"
          component={InputCheckbox}
          dataLocator="savePlcc"
          disabled={false}
          rightText={labels.login.lbl_login_saveMyPlace}
          marginTop={13}
        />
      </View>

      <CustomButton
        color="#FFFFFF"
        fill="BLUE"
        text={labels.login.lbl_login_loginCTA}
        buttonVariation="variable-width"
        customStyle={styles.loginButtonStyle}
        onPress={handleSubmit(onSubmit)}
      />
      <Anchor
        fontSizeVariation="xlarge"
        anchorVariation="secondary"
        text={labels.login.lbl_login_forgetPasswordCTA}
        customStyle={styles.forgotPasswordStyle}
        onPress={showForgotPassword}
      />
      <LineComp marginTop={28} />
      <DescriptionStyle>{labels.login.lbl_login_createAccountHelp}</DescriptionStyle>
      <CustomButton
        text={labels.login.lbl_login_createAccountCTA}
        buttonVariation="variable-width"
        onPress={() => setModalState(true)}
        customStyle={styles.createAccountStyle}
      />
      {showModal && (
        <ModalNative isOpen={showModal} onRequestClose={openModal}>
          <ModalHeading>CREATE ACCOUNT</ModalHeading>
          <ModalViewWrapper>
            <SafeAreaView>
              <CreateAccount />
            </SafeAreaView>
          </ModalViewWrapper>
        </ModalNative>
      )}
    </View>
  );
};
LoginForm.propTypes = {
  labels: PropTypes.shape({
    lbl_login_email: PropTypes.string,
    lbl_login_password: PropTypes.string,
    lbl_login_rememberMe: PropTypes.string,
    lbl_login_saveMyPlace: PropTypes.string,
    login: PropTypes.string,
    lbl_login_createAccountCTA: PropTypes.string,
    lbl_login_forgetPasswordCTA: PropTypes.string,
    lbl_login_createAccountHelp: PropTypes.string,
  }),
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  loginErrorMessage: PropTypes.string,
  showForgotPasswordForm: PropTypes.string.isRequired,
  resetForm: PropTypes.string.isRequired,
};

LoginForm.defaultProps = {
  labels: {
    lbl_login_email: 'Email Address',
    lbl_login_password: 'Password',
    lbl_login_rememberMe: `Remember me.\nNot recommended on shared devices.`,
    lbl_login_saveMyPlace: `Save My Place Rewards Credit Card ending in 1234\nto my account for future purchases.`,
    lbl_login_loginCTA: 'LOG IN',
    lbl_login_createAccountCTA: 'CREATE ACCOUNT',
    lbl_login_forgetPasswordCTA: 'Forgot password?',
    lbl_login_createAccountHelp: "Don't have an account? Create one now to start earning points!",
  },
  handleSubmit: noop,
  onSubmit: noop,
  loginErrorMessage: '',
};

const validateMethod = createValidateMethod(
  getStandardConfig([
    { emailAddress: 'emailAddressNoAsync' },
    { password: 'legacyPassword' },
    'recaptchaToken',
  ])
);

export default reduxForm({
  form: 'myLoginForm',
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(LoginForm, FormStyle));
export { LoginForm as LoginFormVanilla };
