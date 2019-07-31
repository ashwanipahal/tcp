import React from 'react';
import PropTypes from 'prop-types';
import LoginSection from '../organism/LoginSection';

const LoginView = ({
  onSubmit,
  labels,
  loginErrorMessage,
  initialValues,
  showRecaptcha,
  onCreateAccountClick,
}) => {
  return (
    <LoginSection
      onSubmit={onSubmit}
      labels={labels}
      loginErrorMessage={loginErrorMessage}
      initialValues={initialValues}
      showRecaptcha={showRecaptcha}
      onCreateAccountClick={onCreateAccountClick}
    />
  );
};

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  loginErrorMessage: PropTypes.string,
  initialValues: PropTypes.shape({}).isRequired,
  showRecaptcha: PropTypes.bool,
  onCreateAccountClick: PropTypes.func,
};

LoginView.defaultProps = {
  loginErrorMessage: '',
  showRecaptcha: false,
  onCreateAccountClick: () => {},
};

export default LoginView;
