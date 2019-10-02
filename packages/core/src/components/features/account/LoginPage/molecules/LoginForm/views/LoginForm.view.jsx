import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import withStyles from '../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Button from '../../../../../../common/atoms/Button';
import Anchor from '../../../../../../common/atoms/Anchor';
import TextBox from '../../../../../../common/atoms/TextBox';
import RichText from '../../../../../../common/atoms/RichText';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import PasswordField from '../../../../common/molecule/PasswordField';
// import Anchor from '../../../../../../common/atoms/Anchor';
import Recaptcha from '../../../../../../common/molecules/recaptcha/recaptcha';
import styles from '../styles/LoginForm.styles';

class LoginForm extends React.PureComponent<Props> {
  showForgotPasswordForm = e => {
    e.preventDefault();
    const { showForgotPasswordForm, resetForm, resetLoginState } = this.props;
    resetForm();
    resetLoginState();
    showForgotPasswordForm();
  };

  resetError = () => {
    const { resetLoginState, loginErrorMessage } = this.props;
    if (loginErrorMessage) {
      resetLoginState();
    }
  };

  render() {
    const {
      handleSubmit,
      labels,
      loginErrorMessage,
      className,
      showRecaptcha,
      change,
      showSavePlcc,
      pristine,
      variation,
      handleContinueAsGuest,
      tooltipContent,
    } = this.props;
    return (
      <div className={className}>
        <form name="LoginForm" onSubmit={handleSubmit} noValidate className={className}>
          {loginErrorMessage && (
            <BodyCopy fontSize="fs12" fontWeight="semibold" color="red.500" className="elem-mb-XL">
              <RichText className="richTextColor" richTextHtml={loginErrorMessage} />
            </BodyCopy>
          )}
          <BodyCopy component="div" className="elem-mb-LRG">
            <Field
              id="emailAddress"
              placeholder={getLabelValue(labels, 'lbl_login_email', 'login')}
              name="emailAddress"
              component={TextBox}
              dataLocator="login-emailfield"
              errorDataLocator="login-emailerror"
              showSuccessCheck={false}
              enableSuccessCheck={false}
              className="elem-mb-SM"
              onKeyPress={this.resetError}
            />
            <Field
              labels={labels}
              id="password"
              placeholder={getLabelValue(labels, 'lbl_login_password', 'login')}
              name="password"
              component={PasswordField}
              dataLocator="login-passwordfield"
              errorDataLocator="login-passworderror"
              showSuccessCheck={false}
              enableSuccessCheck={false}
              className="elem-mb-SM"
              tooltipContent={tooltipContent}
              onKeyPress={this.resetError}
            />
            <BodyCopy component="div">
              <Field
                name="rememberMe"
                component={InputCheckbox}
                dataLocator="login-remembermecb"
                className=""
              >
                <span className="remember-me-text">
                  {getLabelValue(labels, 'lbl_login_rememberMe', 'login')}
                </span>
                <span>{getLabelValue(labels, 'lbl_login_rememberMeHelpText', 'login')}</span>
              </Field>
            </BodyCopy>
            {showSavePlcc && (
              <BodyCopy component="div">
                <Field
                  name="savePlcc"
                  component={InputCheckbox}
                  dataLocator="login-savemyplcccardcb"
                >
                  {getLabelValue(labels, 'lbl_login_saveMyPlace', 'login')}
                </Field>
              </BodyCopy>
            )}
            <BodyCopy component="div">
              {showRecaptcha && (
                <>
                  <Recaptcha
                    verifyCallback={token => change('recaptchaToken', token)}
                    expiredCallback={() => change('recaptchaToken', '')}
                  />
                  <Field
                    component={TextBox}
                    type="hidden"
                    name="recaptchaToken"
                    data-locator="login-recaptchcb"
                  />
                </>
              )}
            </BodyCopy>
          </BodyCopy>
          <BodyCopy component="div" textAlign="center" className="elem-mb-LRG">
            <Button
              fill="BLUE"
              type="submit"
              buttonVariation="fixed-width"
              dataLocator="login-logincta"
              fullWidth
              className="elem-mb-XS"
              disabled={pristine}
            >
              {getLabelValue(labels, 'lbl_login_loginCTA', 'login')}
            </Button>
            {variation === 'checkout' && (
              <Button
                fill="WHITE"
                type="button"
                buttonVariation="fixed-width"
                dataLocator="login-logincta"
                fullWidth
                className="elem-mb-XS"
                onClick={handleContinueAsGuest}
              >
                {getLabelValue(labels, 'lbl_login_modal_checkout_as_guest', 'login')}
              </Button>
            )}
            <Anchor
              underline
              fontSizeVariation="xlarge"
              anchorVariation="secondary"
              dataLocator="login-forgotpasswordlnk"
              onClick={this.showForgotPasswordForm}
            >
              {getLabelValue(labels, 'lbl_login_forgetPasswordCTA', 'login')}
            </Anchor>
          </BodyCopy>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  loginErrorMessage: PropTypes.string,
  showRecaptcha: PropTypes.bool,
  change: PropTypes.func,
  showSavePlcc: PropTypes.bool,
  pristine: PropTypes.bool,
  handleContinueAsGuest: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  className: '',
  loginErrorMessage: '',
  showRecaptcha: false,
  change: () => {},
  showSavePlcc: false,
  pristine: false,
};

const validateMethod = createValidateMethod(
  getStandardConfig([
    { emailAddress: 'emailAddressNoAsync' },
    { password: 'legacyPassword' },
    'recaptchaToken',
  ])
);

export default reduxForm({
  form: 'LoginForm', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(LoginForm, styles));

export { LoginForm as LoginFormFormVanilla };
