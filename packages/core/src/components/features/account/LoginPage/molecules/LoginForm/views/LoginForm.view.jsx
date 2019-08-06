import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import withStyles from '../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Button from '../../../../../../common/atoms/Button';
import Anchor from '../../../../../../common/atoms/Anchor';
import TextBox from '../../../../../../common/atoms/TextBox';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import PasswordField from '../../PasswordField';
// import Anchor from '../../../../../../common/atoms/Anchor';
import Recaptcha from '../../../../../../common/molecules/recaptcha/recaptcha';
import styles from '../styles/LoginForm.styles';

class LoginForm extends React.PureComponent<Props> {
  showForgotPasswordForm = e => {
    e.preventDefault();
    const { showForgotPasswordForm, resetForm } = this.props;
    resetForm();
    showForgotPasswordForm();
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
    } = this.props;
    return (
      <div className={className}>
        <form name="LoginForm" onSubmit={handleSubmit} noValidate className={className}>
          {loginErrorMessage && (
            <BodyCopy fontSize="fs12" fontWeight="semibold" color="red.500" className="elem-mb-XL">
              {loginErrorMessage}
            </BodyCopy>
          )}
          <BodyCopy component="div" className="elem-mb-LRG">
            <Field
              id="emailAddress"
              placeholder={labels.login.lbl_login_email}
              name="emailAddress"
              component={TextBox}
              dataLocator=""
              showSuccessCheck={false}
              enableSuccessCheck={false}
              className="elem-mb-SM"
            />
            <Field
              id="password"
              placeholder={labels.login.lbl_login_password}
              name="password"
              component={PasswordField}
              dataLocator=""
              showSuccessCheck={false}
              enableSuccessCheck={false}
            />
            <BodyCopy component="div">
              <Field name="rememberMe" component={InputCheckbox} dataLocator="" className="">
                {labels.login.lbl_login_rememberMe}
              </Field>
            </BodyCopy>
            {showSavePlcc && (
              <BodyCopy component="div">
                <Field name="savePlcc" component={InputCheckbox} dataLocator="">
                  {labels.login.lbl_login_saveMyPlace}
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
              data-locator=""
              fullWidth
              className="elem-mb-XS"
              disabled={pristine}
            >
              {labels.login.lbl_login_loginCTA}
            </Button>
            <Anchor
              className="addAddress__anchor__back"
              fontSizeVariation="xlarge"
              anchorVariation="secondary"
              to="/account?id=address-book"
              data-locator="addnewaddress-back"
              onClick={this.showForgotPasswordForm}
            >
              {labels.login.lbl_login_forgetPasswordCTA}
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
