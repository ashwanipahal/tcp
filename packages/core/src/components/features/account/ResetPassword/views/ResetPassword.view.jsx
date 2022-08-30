import React from 'react';
import PropTypes from 'prop-types';
import ResetPasswordTopSection from '../molecules/ResetPasswordTopSection';
import ResetPasswordForm from '../molecules/ResetPasswordForm';

export const ResetPassword = ({
  labels,
  successMessage,
  errorMessage,
  onSubmit,
  onBack,
  showNotification,
  resetPasswordErrorMessage,
}) => {
  return (
    <React.Fragment>
      <ResetPasswordTopSection labels={labels} onBack={onBack} className="elem-mb-XL" />
      <ResetPasswordForm
        labels={labels}
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSubmit={onSubmit}
        onBack={onBack}
        resetPasswordErrorMessage={resetPasswordErrorMessage}
        showNotification={showNotification}
      />
    </React.Fragment>
  );
};

ResetPassword.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  resetPasswordErrorMessage: PropTypes.string.isRequired,
  showNotification: PropTypes.bool.isRequired,
};

export default ResetPassword;
