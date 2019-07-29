/**
 * These are temporary changes for a dummy login page
 */

import React from 'react';
import PropTypes from 'prop-types';
import LoginSection from '../organism/LoginSection';

const LoginView = ({ onSubmit, labels, loginErrorMessage }) => {
  return (
    <LoginSection onSubmit={onSubmit} labels={labels} loginErrorMessage={loginErrorMessage} />
  )
}

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  loginErrorMessage: PropTypes.string,
};

LoginView.defaultProps = {
  loginErrorMessage: ''
};

export default LoginView;
