import React, { Fragment } from 'react';
import { View } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { PropTypes } from 'prop-types';
import RecaptchaModal from '@tcp/core/src/components/common/molecules/recaptcha/recaptchaModal.native';
import { noop, get } from 'lodash';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { FormStyle, ShowHideWrapper, HideShowFieldWrapper } from '../styles/LoginForm.style.native';
import TextBox from '../../../../../../common/atoms/TextBox';
import CustomButton from '../../../../../../common/atoms/Button';
import Anchor from '../../../../../../common/atoms/Anchor';
import LineComp from '../../../../../../common/atoms/Line';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import TouchFaceIdCheckBox from '../../../../common/molecule/FaceTouchCheckBox/views/faceTouchIdCheckBox.native';

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
    marginBottom: 30,
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
    };
  }

  componentDidUpdate(prevProps) {
    const { change, setEmailid } = this.props;
    if (!prevProps.setEmailid && setEmailid) {
      change('emailAddress', setEmailid);
    }
  }

  setRecaptchaModalMountState = () => {
    const { setRecaptchaModalMountedState } = this.state;
    this.setState({
      setRecaptchaModalMountedState: !setRecaptchaModalMountedState,
    });
  };

  onMessage = event => {
    const { handleSubmit, onSubmit, change } = this.props;
    if (event && event.nativeEvent.data) {
      const value = get(event, 'nativeEvent.data', '');
      change('recaptchaToken', value);
      handleSubmit(data => {
        const { emailAddress, password, rememberMe, savePlcc, userTouchId } = data;
        const LoginData = {
          emailAddress,
          password,
          rememberMe,
          savePlcc,
          userTouchId,
          recaptchaToken: value,
        };
        onSubmit(LoginData);
      })();

      this.setRecaptchaModalMountState();
    }
  };

  onClose = () => {
    this.setRecaptchaModalMountState();
  };

  handleLoginClick = e => {
    const { handleSubmit, invalid, showRecaptcha } = this.props;
    e.preventDefault();
    if (!invalid && showRecaptcha) {
      this.setRecaptchaModalMountState();
    } else {
      handleSubmit();
    }
  };

  showForgotPassword = () => {
    const { showForgotPasswordForm, resetForm } = this.props;
    showForgotPasswordForm();
    resetForm();
  };

  handleContinueAsGuest = () => {
    const { handleContinueAsGuest } = this.props;
    handleContinueAsGuest();
  };

  changeType = e => {
    e.preventDefault();
    const { type } = this.state;
    this.setState({
      type: type === 'password' ? 'text' : 'password',
    });
  };

  render() {
    const { labels, variation, getTouchStatus, showRecaptcha } = this.props;
    const { type, setRecaptchaModalMountedState } = this.state;
    return (
      <Fragment>
        <View {...this.props}>
          <Field
            label={getLabelValue(labels, 'lbl_login_email', 'login')}
            name="emailAddress"
            id="emailAddress"
            type="text"
            autoCapitalize="none"
            component={TextBox}
            dataLocator="emailAddress"
          />
          <ShowHideWrapper>
            <Field
              label={getLabelValue(labels, 'lbl_login_password', 'login')}
              name="password"
              id="password"
              type={type}
              component={TextBox}
              dataLocator="password"
              secureTextEntry={type === 'password'}
              rightText={
                type === 'password'
                  ? getLabelValue(labels, 'lbl_createAccount_show', 'registration')
                  : getLabelValue(labels, 'lbl_createAccount_hide', 'registration')
              }
            />
            <HideShowFieldWrapper>
              <Anchor
                fontSizeVariation="medium"
                fontFamily="secondary"
                anchorVariation="primary"
                onPress={this.changeType}
                noLink
                to="/#"
                dataLocator=""
                text={
                  type === 'password'
                    ? getLabelValue(labels, 'lbl_createAccount_show', 'registration')
                    : getLabelValue(labels, 'lbl_createAccount_hide', 'registration')
                }
              />
            </HideShowFieldWrapper>
          </ShowHideWrapper>
          <View style={styles.inputCheckBoxStyle}>
            <TouchFaceIdCheckBox labels={labels} getTouchStatus={getTouchStatus} />
          </View>

          <CustomButton
            fill="BLUE"
            text={getLabelValue(labels, 'lbl_login_loginCTA', 'login')}
            buttonVariation="variable-width"
            customStyle={styles.loginButtonStyle}
            onPress={this.handleLoginClick}
          />

          {variation === 'checkout' && (
            <CustomButton
              customStyle={styles.loginButtonStyle}
              text={getLabelValue(labels, 'lbl_login_modal_checkout_as_guest', 'login')}
              onPress={this.handleContinueAsGuest}
            />
          )}

          <Anchor
            style={styles.underline}
            class="underlink"
            underlineBlue
            fontSizeVariation="xlarge"
            anchorVariation="secondary"
            text={getLabelValue(labels, 'lbl_login_forgetPasswordCTA', 'login')}
            customStyle={styles.forgotPasswordStyle}
            onPress={this.showForgotPassword}
          />
          <LineComp marginTop={28} />

          <React.Fragment>
            {setRecaptchaModalMountedState && showRecaptcha && (
              <RecaptchaModal
                onMessage={this.onMessage}
                setRecaptchaModalMountedState={setRecaptchaModalMountedState}
                toggleRecaptchaModal={this.setRecaptchaModalMountState}
                onClose={this.onClose}
              />
            )}
          </React.Fragment>
        </View>
      </Fragment>
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
