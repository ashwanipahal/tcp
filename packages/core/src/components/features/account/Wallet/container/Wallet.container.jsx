import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletView from '../views';
import { getLabels } from '../../Account/container/Account.selectors';

export const WalletContainer = ({ labels }) => {
  return <WalletView labels={labels} />;
};

const mapStateToProps = state => {
  return {
    labels: getLabels(state),
  };
};

WalletContainer.propTypes = {
  labels: PropTypes.shape({}),
};

WalletContainer.defaultProps = {
  labels: {},
};

export default connect(mapStateToProps)(WalletContainer);
