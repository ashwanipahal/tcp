import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { reduxForm, Field } from 'redux-form';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Button from '../../../../../../common/atoms/Button';
import withStyles from '../../../../../../common/hoc/withStyles';
import PasswordField from '../../../../common/molecule/PasswordField';
import PasswordRequirement from '../../PasswordRequirement';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import styles from '../styles/ResetPasswordForm.style';

const handleClick = handleSubmit => {
  handleSubmit();
};

export const ResetPasswordForm = ({
  className,
  labels,
  pristine,
  successMessage,
  handleSubmit,
  resetPasswordErrorMessage,
  showNotification,
}) => {
  return (
    <form
      name="ResetPasswordForm"
      noValidate
      onSubmit={e => {
        e.preventDefault();
        handleClick(handleSubmit);
      }}
      className={className}
    >
      {successMessage && (
        <BodyCopy fontSize="fs12" fontWeight="semibold" color="green.500" className="elem-mb-XL">
          {labels[`lbl_resetPassword_${successMessage}`]}
        </BodyCopy>
      )}
      {resetPasswordErrorMessage && showNotification && (
        <BodyCopy fontSize="fs12" fontWeight="semibold" color="red.500" className="elem-mb-XL">
          {resetPasswordErrorMessage}
        </BodyCopy>
      )}
      <Field
        id="password"
        placeholder={getLabelValue(labels, 'lbl_resetPassword_password')}
        name="password"
        component={PasswordField}
        dataLocator="login-passwordfield"
        errorDataLocator="login-passworderror"
        showSuccessCheck={false}
        enableSuccessCheck={false}
        className="elem-mb-SM"
        tooltipContent={<PasswordRequirement labels={labels} />}
      />
      <Field
        id="confirmPassword"
        placeholder={getLabelValue(labels, 'lbl_resetPassword_confirmPassword')}
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
          {getLabelValue(labels, 'lbl_resetPassword_resetCta')}
        </Button>
      </BodyCopy>
    </form>
  );
};

ResetPasswordForm.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  pristine: PropTypes.bool.isRequired,
  successMessage: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  resetPasswordErrorMessage: PropTypes.string.isRequired,
  showNotification: PropTypes.bool.isRequired,
};

ResetPasswordForm.defaultProps = {
  className: '',
};

const validateMethod = createValidateMethod(getStandardConfig(['password', 'confirmPassword']));

export default reduxForm({
  form: 'ResetPasswordForm', // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(ResetPasswordForm, styles));
