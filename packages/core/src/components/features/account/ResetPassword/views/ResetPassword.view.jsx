import React from 'react';
import PropTypes from 'prop-types';
import ResetPasswordTopSection from '../molecules/ResetPasswordTopSection';
import ResetPasswordForm from '../molecules/ResetPasswordForm';

export const ResetPassword = ({ labels, success, error, onSubmit, onBack }) => {
  return (
    <div>
      <ResetPasswordTopSection labels={labels} onBack={onBack} />
      <ResetPasswordForm labels={labels} success={success} error={error} onSubmit={onSubmit} />
    </div>
  );
};

ResetPassword.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  success: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default ResetPassword;
