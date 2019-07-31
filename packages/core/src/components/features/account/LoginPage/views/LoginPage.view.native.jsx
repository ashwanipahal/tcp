/**
 * These are temporary changes for a dummy login page
 */

import React from 'react';
import PropTypes from 'prop-types';
import LoginSection from '../organism/LoginSection';
import ScrollViewStyle from '../styles/LoginPage.style.native';

const LoginView = ({ onSubmit, labels, loginErrorMessage, initialValues }) => {
  return (
    <ScrollViewStyle>
      <LoginSection
        onSubmit={onSubmit}
        labels={labels}
        loginErrorMessage={loginErrorMessage}
        initialValues={initialValues}
      />
    </ScrollViewStyle>
  );
};

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  loginErrorMessage: PropTypes.string,
  initialValues: PropTypes.shape({}).isRequired,
};

LoginView.defaultProps = {
  loginErrorMessage: '',
};

export default LoginView;
