import React, { useState } from 'react';
import { View } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { FormStyle, DescriptionStyle } from '../LoginForm.style.native';
import TextBox from '../../../../../../common/atoms/TextBox';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import CustomButton from '../../../../../../common/atoms/Button';
import Anchor from '../../../../../../common/atoms/Anchor';
import LineComp from '../../../../../../common/atoms/Line';

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
};

/**
 * @param {string} props : props for CustomIcon
 * @return {JSX} IconClass : Return jsx icon component
 * @desc This method based on the props generate icon component.
 */
const LoginForm = props => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [saveMyRewards, setSaveMyRewards] = useState(false);
  const { labels, handleSubmit } = props;

  const onEmailChange = val => {
    setEmailAddress(val);
  };

  const onPasswordChange = val => {
    setPassword(val);
  };

  const onRememberMe = value => {
    setRememberMe(value);
  };

  const onSaveMyRewards = value => {
    setSaveMyRewards(value);
  };

  return (
    <View {...props}>
      <Field
        label={labels.email}
        input={{
          value: emailAddress,
          onChangeText: onEmailChange,
          name: 'emailAddress',
        }}
        name="emailAddress"
        id="emailAddress"
        type="text"
        component={TextBox}
        dataLocator="emailAddress"
      />
      <Field
        label={labels.password}
        input={{
          value: password,
          onChangeText: onPasswordChange,
          name: 'password',
        }}
        name="password"
        id="password"
        type="text"
        component={TextBox}
        dataLocator="password"
      />
      <Field
        name="rememberMe"
        component={InputCheckbox}
        dataLocator="rememberMe"
        disabled={false}
        rightText={labels.rememberMe}
        onClick={onRememberMe}
        isChecked={rememberMe}
      />
      <Field
        name="saveMyRewards"
        component={InputCheckbox}
        dataLocator="saveMyRewards"
        disabled={false}
        rightText={labels.saveMyRewards}
        marginTop={13}
        onClick={onSaveMyRewards}
        isChecked={saveMyRewards}
      />
      <CustomButton
        text={labels.login}
        buttonVariation="variable-width"
        customStyle={styles.loginButtonStyle}
        onPress={handleSubmit()}
      />
      <Anchor
        fontSizeVariation="xlarge"
        anchorVariation="secondary"
        text={labels.forgotPassword}
        customStyle={styles.forgotPasswordStyle}
      />
      <LineComp marginTop={28} />
      <DescriptionStyle>{labels.createAccountLabel}</DescriptionStyle>
      <CustomButton
        text={labels.createAccount}
        buttonVariation="variable-width"
        customStyle={styles.createAccountStyle}
      />
    </View>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    rememberMe: PropTypes.string,
    saveMyRewards: PropTypes.string,
    login: PropTypes.string,
    createAccount: PropTypes.string,
    forgotPassword: PropTypes.string,
    createAccountLabel: PropTypes.string,
  }),
};

LoginForm.defaultProps = {
  labels: {
    email: 'Email Address',
    password: 'Password',
    rememberMe: `Remember me.\nNot recommended on shared devices.`,
    saveMyRewards: `Save My Place Rewards Credit Card ending in 1234\nto my account for future purchases.`,
    login: 'LOG IN',
    createAccount: 'CREATE ACCOUNT',
    forgotPassword: 'Forgot password?',
    createAccountLabel: "Don't have an account? Create one now to start earning points!",
  },
};

// export default withStyles(LoginForm, FormStyle);
// export { LoginForm as LoginFormVanilla };

export default reduxForm({
  form: 'myLoginForm',
  enableReinitialize: true,
})(withStyles(LoginForm, FormStyle));
export { LoginForm as LoginFormVanilla };
