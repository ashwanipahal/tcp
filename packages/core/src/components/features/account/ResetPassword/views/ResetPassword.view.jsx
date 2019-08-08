import React from 'react'
import PropTypes from 'prop-types';
import ResetPasswordTopSection from '../molecules/ResetPasswordTopSection';
import ResetPasswordForm from '../molecules/ResetPasswordForm';

const ResetPassword = ({ labels, success, error, onSubmit, onBack }) => {
  return (
    <div>
      <ResetPasswordTopSection labels={labels} onBack={onBack} />
      <ResetPasswordForm labels={labels} success={success} error={error} onSubmit={onSubmit} />
    </div>
  )
};

ResetPassword.propTypes = {
  labels: PropTypes.shape({}),
  success: PropTypes.string,
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

ResetPassword.defaultProps = {
  labels: {},
  success: '',
  error: '',
};

export default ResetPassword
