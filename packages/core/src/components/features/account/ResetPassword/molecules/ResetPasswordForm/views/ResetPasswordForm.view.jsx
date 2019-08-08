import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Button from '../../../../../../common/atoms/Button';
import withStyles from '../../../../../../common/hoc/withStyles';
import PasswordField from '../../../../common/molecule/PasswordField';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import styles from '../styles/ResetPasswordForm.style';

export class ResetPasswordForm extends PureComponent {
  static propTypes = {
    labels: PropTypes.shape({}),
    pristine: PropTypes.bool,
    success: PropTypes.string,
    error: PropTypes.string,
  };

  static defaultProps = {
    labels: {},
    pristine: false,
    success: null,
    error: null,
  }

  render() {
    const { labels, pristine, success, error } = this.props;
    return (
      <form noValidate>
        {success && (
          <BodyCopy fontSize="fs12" fontWeight="semibold" color="green.500" className="elem-mb-XL">
            {success}
          </BodyCopy>
        )}
        {error && (
          <BodyCopy fontSize="fs12" fontWeight="semibold" color="red.500" className="elem-mb-XL">
            {error}
          </BodyCopy>
        )}
        <Field
          id="password"
          placeholder={labels.lbl_resetPassword_password}
          name="password"
          component={PasswordField}
          dataLocator="login-passwordfield"
          errorDataLocator="login-passworderror"
          showSuccessCheck={false}
          enableSuccessCheck={false}
          className="elem-mb-SM"
        />
        <Field
          id="confirmPassword"
          placeholder={labels.lbl_resetPassword_confirmPassword}
          name="confirmPassword"
          component={PasswordField}
          dataLocator="login-passwordfield"
          errorDataLocator="login-passworderror"
          showSuccessCheck={false}
          enableSuccessCheck={false}
          className="elem-mb-SM"
        />
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
            {labels.lbl_resetPassword_resetCta}
          </Button>
        </BodyCopy>
      </form>
    )
  }
}

const validateMethod = createValidateMethod(
  getStandardConfig([
    'password',
    'confirmPassword',
  ])
);

export default reduxForm({
  form: 'ResetPasswordForm', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(ResetPasswordForm, styles));
