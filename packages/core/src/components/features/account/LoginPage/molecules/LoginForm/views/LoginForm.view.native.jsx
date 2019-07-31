import React from 'react';
import { View } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { PropTypes } from 'prop-types';
import { noop } from 'lodash';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { FormStyle, DescriptionStyle } from '../styles/LoginForm.style.native';
import TextBox from '../../../../../../common/atoms/TextBox';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import CustomButton from '../../../../../../common/atoms/Button';
import Anchor from '../../../../../../common/atoms/Anchor';
import LineComp from '../../../../../../common/atoms/Line';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';

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

  return (
    <View {...props}>
      <Field
        label={labels.ACC_LBL_LOGIN_EMAIL}
        name="emailAddress"
        id="emailAddress"
        type="text"
        autoCapitalize={false}
        component={TextBox}
        dataLocator="emailAddress"
      />
      <Field
        label={labels.ACC_LBL_LOGIN_PASSWORD}
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
          rightText={labels.ACC_LBL_LOGIN_REMEMBER_ME}
        />
        <Field
          name="savePlcc"
          component={InputCheckbox}
          dataLocator="savePlcc"
          disabled={false}
          rightText={labels.ACC_LBL_LOGIN_SAVE_MY_PLACE}
          marginTop={13}
        />
      </View>

      <CustomButton
        color="#FFFFFF"
        fill="BLUE"
        text={labels.ACC_LBL_LOGIN_CTA}
        buttonVariation="variable-width"
        customStyle={styles.loginButtonStyle}
        onPress={handleSubmit(onSubmit)}
      />
      <Anchor
        fontSizeVariation="xlarge"
        anchorVariation="secondary"
        text={labels.ACC_LBL_LOGIN_FORGET_PASSWORD_CTA}
        customStyle={styles.forgotPasswordStyle}
      />
      <LineComp marginTop={28} />
      <DescriptionStyle>{labels.ACC_LBL_LOGIN_CREATE_ACCOUNT_HELP}</DescriptionStyle>
      <CustomButton
        text={labels.ACC_LBL_LOGIN_CREATE_ACCOUNT_CTA}
        buttonVariation="variable-width"
        customStyle={styles.createAccountStyle}
      />
    </View>
  );
};

LoginForm.propTypes = {
  labels: PropTypes.shape({
    ACC_LBL_LOGIN_EMAIL: PropTypes.string,
    ACC_LBL_LOGIN_PASSWORD: PropTypes.string,
    ACC_LBL_LOGIN_REMEMBER_ME: PropTypes.string,
    ACC_LBL_LOGIN_SAVE_MY_PLACE: PropTypes.string,
    login: PropTypes.string,
    ACC_LBL_LOGIN_CREATE_ACCOUNT_CTA: PropTypes.string,
    ACC_LBL_LOGIN_FORGET_PASSWORD_CTA: PropTypes.string,
    ACC_LBL_LOGIN_CREATE_ACCOUNT_HELP: PropTypes.string,
  }),
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  loginErrorMessage: PropTypes.string,
};

LoginForm.defaultProps = {
  labels: {
    ACC_LBL_LOGIN_EMAIL: 'Email Address',
    ACC_LBL_LOGIN_PASSWORD: 'Password',
    ACC_LBL_LOGIN_REMEMBER_ME: `Remember me.\nNot recommended on shared devices.`,
    ACC_LBL_LOGIN_SAVE_MY_PLACE: `Save My Place Rewards Credit Card ending in 1234\nto my account for future purchases.`,
    ACC_LBL_LOGIN_CTA: 'LOG IN',
    ACC_LBL_LOGIN_CREATE_ACCOUNT_CTA: 'CREATE ACCOUNT',
    ACC_LBL_LOGIN_FORGET_PASSWORD_CTA: 'Forgot password?',
    ACC_LBL_LOGIN_CREATE_ACCOUNT_HELP:
      "Don't have an account? Create one now to start earning points!",
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
