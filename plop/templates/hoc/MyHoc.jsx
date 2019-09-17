import React, { Fragment } from 'react';

const MyHoc = WrappedComponent => {
  return props => {
    return (
      <Fragment {...props}>
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
};

export default MyHoc;
