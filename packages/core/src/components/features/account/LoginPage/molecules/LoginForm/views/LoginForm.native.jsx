import React from 'react';
import { View } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { FormStyle } from '../LoginForm.style.native';
import TextBox from '../../../../../../common/atoms/TextBox';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import CustomButton from '../../../../../../common/atoms/Button';
import Anchor from '../../../../../../common/atoms/Anchor';
import LineComp from '../../../../../../common/atoms/Line';

const onRememberMe = value => {
  console.log('onRememberMe: ', value);
};
const onSaveMyRewards = value => {
  console.log('onSaveMyRewards: ', value);
};

const styles = {
  loginButtonStyle: {
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
  const { labels } = props;
  return (
    <View {...props}>
      <Field
        label={labels.email}
        name="emailAddress"
        id="emailAddress"
        type="text"
        component={TextBox}
        dataLocator="emailAddress"
      />
      <Field
        label={labels.password}
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
      />
      <Field
        name="saveMyRewards"
        component={InputCheckbox}
        dataLocator="saveMyRewards"
        disabled={false}
        rightText={labels.saveMyRewards}
        marginTop={13}
        onClick={onSaveMyRewards}
      />
      <CustomButton
        text={labels.login}
        buttonVariation="variable-width"
        customStyle={styles.loginButtonStyle}
      />
      <Anchor
        fontSizeVariation="xlarge"
        anchorVariation="secondary"
        text={labels.forgotPassword}
        customStyle={styles.forgotPasswordStyle}
      />
      <LineComp marginTop={28} marginBottom={28} />
      <CustomButton text={labels.createAccount} buttonVariation="variable-width" />
    </View>
  );
};

LoginForm.propTypes = {
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
