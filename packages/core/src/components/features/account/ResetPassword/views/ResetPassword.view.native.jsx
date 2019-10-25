import React from 'react';
import PropTypes from 'prop-types';
import ResetPasswordTopSection from '../molecules/ResetPasswordTopSection';

export const ResetPassword = ({ labels, onBackClick, updateHeader }) => {
  updateHeader();
  return (
    <>
      <ResetPasswordTopSection labels={labels} onBackClick={onBackClick} />
    </>
  );
};

ResetPassword.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  onBackClick: PropTypes.func.isRequired,
  updateHeader: PropTypes.func.isRequired,
};

export default ResetPassword;
