import React from 'react';
import PointsHistoryContainer from '@tcp/core/src/components/features/account/PointHistory';

const Login = props => {
  return (
    <React.Fragment>
      <PointsHistoryContainer {...props} />
    </React.Fragment>
  );
};

export default Login;
