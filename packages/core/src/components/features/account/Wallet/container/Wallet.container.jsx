import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletView from '../views';

export const getGlobalLabels = state => {
  return state.Labels.global;
};

export const WalletContainer = ({ labels }) => {
  return <WalletView labels={labels} />;
};

export const mapStateToProps = state => {
  return {
    labels: getGlobalLabels(state),
  };
};

WalletContainer.propTypes = {
  labels: PropTypes.shape({}),
};

WalletContainer.defaultProps = {
  labels: {},
};

export default connect(mapStateToProps)(WalletContainer);
