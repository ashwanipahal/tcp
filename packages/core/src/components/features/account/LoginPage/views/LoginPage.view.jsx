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
  onSubmitForgot,
  showNotification,
  successFullResetEmail,
  resetForm,
  resetResponse,
}) => {
  return (
    <LoginSection
      onSubmit={onSubmit}
      labels={labels}
      loginErrorMessage={loginErrorMessage}
      initialValues={initialValues}
      showRecaptcha={showRecaptcha}
      resetLoginState={resetLoginState}
      onSubmitForgot={onSubmitForgot}
      showNotification={showNotification}
      successFullResetEmail={successFullResetEmail}
      resetForm={resetForm}
      resetResponse={resetResponse}
    />
  );
};

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  loginErrorMessage: PropTypes.string,
  initialValues: PropTypes.shape({}).isRequired,
  showRecaptcha: PropTypes.bool,
  resetResponse: PropTypes.bool.isRequired,
  resetForm: PropTypes.bool.isRequired,
  resetLoginState: PropTypes.bool.isRequired,
  onSubmitForgot: PropTypes.bool.isRequired,
  showNotification: PropTypes.bool.isRequired,
  successFullResetEmail: PropTypes.bool.isRequired,
};

LoginView.defaultProps = {
  loginErrorMessage: '',
  showRecaptcha: false,
};

export default LoginView;
