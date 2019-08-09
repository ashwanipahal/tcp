import React from 'react';
import PropTypes from 'prop-types';
import ResetPasswordTopSection from '../molecules/ResetPasswordTopSection';
import ResetPasswordForm from '../molecules/ResetPasswordForm';

export const ResetPassword = ({ labels, successMessage, errorMessage, onSubmit, onBack }) => {
  return (
    <React.Fragment>
      <ResetPasswordTopSection labels={labels} onBack={onBack} className="elem-mb-XL" />
      <ResetPasswordForm
        labels={labels}
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSubmit={onSubmit}
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
};

export default ResetPassword;
