import React from 'react';
import PropTypes from 'prop-types';
import LoginSection from '../organism/LoginSection';

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
  currentForm,
}) => {
  return (
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
      currentForm={currentForm}
    />
  );
};

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  loginErrorMessage: PropTypes.string,
  initialValues: PropTypes.shape({}).isRequired,
  showRecaptcha: PropTypes.bool,
  resetForgotPasswordErrorResponse: PropTypes.bool.isRequired,
  resetForm: PropTypes.bool.isRequired,
  resetLoginState: PropTypes.bool.isRequired,
  SubmitForgot: PropTypes.bool.isRequired,
  showNotification: PropTypes.bool.isRequired,
  successFullResetEmail: PropTypes.bool.isRequired,
  onCreateAccountClick: PropTypes.func,
  currentForm: PropTypes.string.isRequired,
};

LoginView.defaultProps = {
  loginErrorMessage: '',
  showRecaptcha: false,
  onCreateAccountClick: () => {},
};

export default LoginView;
