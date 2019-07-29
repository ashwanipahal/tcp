import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../../../molecules/LoginForm';
import LoginTopSection from '../../../molecules/LoginTopSection';

export const LoginSection = ({
  onSubmit,
  labels,
  loginErrorMessage,
  initialValues,
  showRecaptcha,
}) => {
  return (
    <React.Fragment>
      <LoginTopSection labels={labels} className="elem-mb-LRG" />
      <LoginForm
        onSubmit={onSubmit}
        labels={labels}
        loginErrorMessage={loginErrorMessage}
        initialValues={initialValues}
        showRecaptcha={showRecaptcha}
        className="elem-mb-LRG"
      />
    </React.Fragment>
  );
};

LoginSection.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  loginErrorMessage: PropTypes.string,
  initialValues: PropTypes.shape({}).isRequired,
  showRecaptcha: PropTypes.bool,
};

LoginSection.defaultProps = {
  loginErrorMessage: '',
  showRecaptcha: false,
};

export default LoginSection;
