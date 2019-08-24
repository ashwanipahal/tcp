import React from 'react';
import { View } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import RecaptchaModal from '@tcp/core/src/components/common/molecules/recaptcha/recaptchaModal.native';
import { PropTypes } from 'prop-types';
import { noop, get } from 'lodash';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { FormStyle, ShowHideWrapper, HideShowFieldWrapper } from '../styles/LoginForm.style.native';
import TextBox from '../../../../../../common/atoms/TextBox';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import CustomButton from '../../../../../../common/atoms/Button';
import Anchor from '../../../../../../common/atoms/Anchor';
import LineComp from '../../../../../../common/atoms/Line';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';

const colorPallete = createThemeColorPalette();

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

class LoginForm extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      type: 'password',
      setRecaptchaModalMountedState: false,
      tokenInfomation: '',
    };
  }

  setRecaptchaModalMountState = () => {
    const { setRecaptchaModalMountedState } = this.state;
    this.setState({
      setRecaptchaModalMountedState: !setRecaptchaModalMountedState,
    });
  };

  onMessage = event => {
    const { handleSubmit, onSubmit } = this.props;
    if (event && event.nativeEvent.data) {
      const value = get(event, 'nativeEvent.data', '');
      this.setState({ tokenInfomation: value });
      handleSubmit(onSubmit)();
      this.setRecaptchaModalMountState();
    }
  };

  onClose = () => {
    this.setRecaptchaModalMountState();
  };

  handleLoginClick = e => {
    const { tokenInfomation } = this.state;
    const { handleSubmit, invalid, showRecaptcha } = this.props;
    e.preventDefault();
    if (!tokenInfomation && !invalid && showRecaptcha) {
      this.setRecaptchaModalMountState();
    } else {
      handleSubmit();
    }
  };

  showForgotPassword = () => {
    const { showForgotPasswordForm, resetForm } = this.props;
    resetForm();
    showForgotPasswordForm();
  };

  changeType = e => {
    e.preventDefault();
    const { type } = this.state;
    this.setState({
      type: type === 'password' ? 'text' : 'password',
    });
  };

  render() {
    const { labels, showRecaptcha } = this.props;
    const { type, setRecaptchaModalMountedState } = this.state;
    return (
      <View {...this.props}>
        <Field
          label={labels.login.lbl_login_email}
          name="emailAddress"
          id="emailAddress"
          type="text"
          autoCapitalize="none"
          component={TextBox}
          dataLocator="emailAddress"
        />
        <ShowHideWrapper>
          <Field
            label={labels.login.lbl_login_password}
            name="password"
            id="password"
            type={type}
            component={TextBox}
            dataLocator="password"
            secureTextEntry={type === 'password'}
          />
          <HideShowFieldWrapper>
            <Anchor
              fontSizeVariation="small"
              fontFamily="secondary"
              underline
              anchorVariation="primary"
              onPress={this.changeType}
              noLink
              to="/#"
              data-locator=""
              text={type === 'password' ? 'show' : 'hide'}
            />
          </HideShowFieldWrapper>
        </ShowHideWrapper>
        <View style={styles.inputCheckBoxStyle}>
          <Field
            name="userTouchId"
            component={InputCheckbox}
            dataLocator="rememberMe"
            disabled={false}
            rightText={labels.login.lbl_login_touch_id}
          />
        </View>

        <React.Fragment>
          {setRecaptchaModalMountedState && showRecaptcha && (
            <RecaptchaModal
              onMessage={this.onMessage}
              labels={labels}
              setRecaptchaModalMountedState={setRecaptchaModalMountedState}
              toggleRecaptchaModal={this.setRecaptchaModalMountState}
              onClose={this.onClose}
            />
          )}
        </React.Fragment>

        <CustomButton
          color={colorPallete.white}
          fill="BLUE"
          text={labels.login.lbl_login_loginCTA}
          buttonVariation="variable-width"
          customStyle={styles.loginButtonStyle}
          onPress={this.handleLoginClick}
        />

        <Anchor
          style={styles.underline}
          class="underlink"
          underlineBlue
          fontSizeVariation="xlarge"
          anchorVariation="secondary"
          text={labels.login.lbl_login_forgetPasswordCTA}
          customStyle={styles.forgotPasswordStyle}
          onPress={this.showForgotPassword}
        />
        <LineComp marginTop={28} />
      </View>
    );
  }
}
LoginForm.propTypes = {
  labels: PropTypes.shape({
    login: {
      lbl_login_email: PropTypes.string,
      lbl_login_password: PropTypes.string,
      lbl_login_rememberMe: PropTypes.string,
      lbl_login_saveMyPlace: PropTypes.string,
      login: PropTypes.string,
      lbl_login_createAccountCTA: PropTypes.string,
      lbl_login_forgetPasswordCTA: PropTypes.string,
      lbl_login_createAccountHelp: PropTypes.string,
    },
  }),
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  showForgotPasswordForm: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  labels: {
    login: {
      lbl_login_email: 'Email Address',
      lbl_login_password: 'Password',
      lbl_login_rememberMe: `Remember me.\nNot recommended on shared devices.`,
      lbl_login_saveMyPlace: `Save My Place Rewards Credit Card ending in 1234\nto my account for future purchases.`,
      lbl_login_loginCTA: 'LOG IN',
      lbl_login_createAccountCTA: 'CREATE ACCOUNT',
      lbl_login_forgetPasswordCTA: 'Forgot password?',
      lbl_login_createAccountHelp: "Don't have an account? Create one now to start earning points!",
    },
  },
  handleSubmit: noop,
  onSubmit: noop,
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
