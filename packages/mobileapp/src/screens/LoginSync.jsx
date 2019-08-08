import React from 'react';
import LoginPageContainer from '@tcp/core/src/components/features/account/LoginPage';

const Login = props => {
  return (
    <React.Fragment>
      <LoginPageContainer {...props} />
    </React.Fragment>
  );
};

export default Login;
