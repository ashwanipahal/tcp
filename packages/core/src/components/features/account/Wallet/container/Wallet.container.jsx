import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletView from '../views';
import { getGlobalLabels, getCommonLabels } from '../../Account/container/Account.selectors';

export const WalletContainer = ({ labels, commonLabels, ...props }) => {
  return <WalletView labels={labels} commonLabels={commonLabels} {...props} />;
};

export const mapStateToProps = state => {
  return {
    labels: getGlobalLabels(state),
    commonLabels: getCommonLabels(state),
  };
};

WalletContainer.propTypes = {
  labels: PropTypes.shape({}),
  commonLabels: PropTypes.shape({}),
};

WalletContainer.defaultProps = {
  labels: {},
  commonLabels: {},
};

export default connect(mapStateToProps)(WalletContainer);
