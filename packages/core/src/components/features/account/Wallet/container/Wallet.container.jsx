import React from 'react';
import PropTypes from 'prop-types';
import WalletView from '../views';

export const WalletContainer = ({ labels }) => {
  return <WalletView labels={labels} />;
};

WalletContainer.propTypes = {
  labels: PropTypes.shape({}),
};

WalletContainer.defaultProps = {
  labels: {},
};

export default WalletContainer;
