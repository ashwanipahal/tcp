/**
 * These are temporary changes for a dummy login page
 */

import React from 'react';
import PropTypes from 'prop-types';
import LoginSection from '../organism/LoginSection';
import ScrollViewStyle from '../styles/LoginPage.style.native';
import KeychainExample from './keychain';

const LoginView = ({
  onSubmit,
  labels,
  loginErrorMessage,
  initialValues,
  showRecaptcha,
  resetLoginState,
  SubmitForgot,
  showNotification,
  successFullResetEmail,
  resetForm,
  resetForgotPasswordErrorResponse,
  onCreateAccountClick,
}) => {
  return (
    <ScrollViewStyle>
      <LoginSection
        onSubmit={onSubmit}
        labels={labels}
        loginErrorMessage={loginErrorMessage}
        initialValues={initialValues}
        showRecaptcha={showRecaptcha}
        resetLoginState={resetLoginState}
        SubmitForgot={SubmitForgot}
        showNotification={showNotification}
        successFullResetEmail={successFullResetEmail}
        resetForm={resetForm}
        resetForgotPasswordErrorResponse={resetForgotPasswordErrorResponse}
        onCreateAccountClick={onCreateAccountClick}
      />
      <KeychainExample />
    </ScrollViewStyle>
  );
};

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  loginErrorMessage: PropTypes.string,
  initialValues: PropTypes.shape({}).isRequired,
  showRecaptcha: PropTypes.string.isRequired,
  resetLoginState: PropTypes.string.isRequired,
  SubmitForgot: PropTypes.string.isRequired,
  showNotification: PropTypes.string.isRequired,
  successFullResetEmail: PropTypes.string.isRequired,
  resetForm: PropTypes.string.isRequired,
  resetForgotPasswordErrorResponse: PropTypes.string.isRequired,
  onCreateAccountClick: PropTypes.string.isRequired,
};

LoginView.defaultProps = {
  loginErrorMessage: '',
};

export default LoginView;
