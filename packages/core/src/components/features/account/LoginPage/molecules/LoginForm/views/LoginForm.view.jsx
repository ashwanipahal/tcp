import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import withStyles from '../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Button from '../../../../../../common/atoms/Button';
import TextBox from '../../../../../../common/atoms/TextBox';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import Notification from '../../../../../../common/molecules/Notification';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import PasswordField from '../../PasswordField';
import Anchor from '../../../../../../common/atoms/Anchor';
import Recaptcha from '../../../../../../common/molecules/recaptcha/recaptcha';
import styles from '../styles/LoginForm.styles';

export const LoginForm = ({
  handleSubmit,
  labels,
  loginErrorMessage,
  className,
  showRecaptcha,
  change,
  showSavePlcc,
}) => {
  return (
    <form name="LoginForm" onSubmit={handleSubmit} noValidate className={className}>
      {loginErrorMessage && (
        <Notification
          status="error"
          colSize={{ large: 12, medium: 8, small: 6 }}
          message={loginErrorMessage}
        />
      )}
      <BodyCopy component="div" className="elem-mb-LRG">
        <Field
          id="emailAddress"
          placeholder={labels.ACC_LBL_LOGIN_EMAIL}
          name="emailAddress"
          component={TextBox}
          dataLocator=""
          enableSuccessCheck={false}
        />
        <Field
          id="password"
          placeholder={labels.ACC_LBL_LOGIN_PASSWORD}
          name="password"
          component={PasswordField}
          dataLocator=""
          enableSuccessCheck={false}
        />
        <BodyCopy component="div">
          <Field name="rememberMe" component={InputCheckbox} dataLocator="" className="">
            {labels.ACC_LBL_LOGIN_REMEMBER_ME}
          </Field>
        </BodyCopy>
        {showSavePlcc && (
          <BodyCopy component="div">
            <Field name="savePlcc" component={InputCheckbox} dataLocator="">
              {labels.ACC_LBL_LOGIN_SAVE_MY_PLACE}
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
        >
          {labels.ACC_LBL_LOGIN_CTA}
        </Button>
        <Anchor to="/">{labels.ACC_LBL_LOGIN_FORGET_PASSWORD_CTA}</Anchor>
      </BodyCopy>
      <BodyCopy component="div" className="border elem-pt-LRG elem-pl-MED elem-pr-MED">
        <BodyCopy textAlign="center" className="elem-mb-LRG">
          {labels.ACC_LBL_LOGIN_CREATE_ACCOUNT_HELP}
        </BodyCopy>
      </BodyCopy>
      <Button fill="BLUE" type="submit" fullWidth buttonVariation="fixed-width">
        {labels.ACC_LBL_LOGIN_CREATE_ACCOUNT_CTA}
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  loginErrorMessage: PropTypes.string,
  showRecaptcha: PropTypes.bool,
  change: PropTypes.func,
  showSavePlcc: PropTypes.bool,
};

LoginForm.defaultProps = {
  className: '',
  loginErrorMessage: '',
  showRecaptcha: false,
  change: () => {},
  showSavePlcc: false,
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
