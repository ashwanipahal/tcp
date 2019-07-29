/**
 * These are temporary changes for a dummy login page
 */

import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../../../molecules/LoginForm';
import LoginTopSection from '../../../molecules/LoginTopSection';
import LoginBottomSection from '../../../molecules/LoginBottomSection';

const LoginSection = ({ onSubmit, labels, loginErrorMessage, initialValues }) => {
  return (
    <React.Fragment>
      <LoginTopSection labels={labels} className="elem-mb-LRG" />
      <LoginForm onSubmit={onSubmit} labels={labels} loginErrorMessage={loginErrorMessage} initialValues={initialValues} className="elem-mb-LRG" />
      <LoginBottomSection labels={labels} />
    </React.Fragment>
  )
}

LoginSection.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  loginErrorMessage: PropTypes.string,
  initialValues: PropTypes.shape({}).isRequired
};

LoginSection.defaultProps = {
  loginErrorMessage: ''
};

export default LoginSection;
