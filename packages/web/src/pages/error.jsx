import React from 'react';

function Error({ statusCode }) {
  return (
    <h1>
      {statusCode
        ? `Error occurred on server. Status: ${statusCode}`
        : 'An unknown error occurred on client!'}
    </h1>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404; // eslint-disable-line no-nested-ternary
  return { statusCode };
};

export default Error;
