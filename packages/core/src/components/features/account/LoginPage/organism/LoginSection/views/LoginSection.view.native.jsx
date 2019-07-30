import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../../../molecules/LoginForm';
import LoginTopSection from '../../../molecules/LoginTopSection';

const LoginSection = ({ onSubmit, labels, loginErrorMessage, initialValues }) => {
  return (
    <React.Fragment>
      <LoginTopSection labels={labels} />
      <LoginForm
        onSubmit={onSubmit}
        labels={labels}
        loginErrorMessage={loginErrorMessage}
        initialValues={initialValues}
      />
    </React.Fragment>
  );
};

LoginSection.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  loginErrorMessage: PropTypes.string,
  initialValues: PropTypes.shape({}).isRequired,
};

LoginSection.defaultProps = {
  loginErrorMessage: '',
};

export default LoginSection;
