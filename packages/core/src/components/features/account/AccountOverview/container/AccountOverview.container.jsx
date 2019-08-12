import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AccountOverviewComponent from '../views/AccountOverview.view';

const getAccountOverviewLabels = labels => {
  return (labels && labels.accountOverview) || {};
};

export const AccountOverviewContainer = ({ labels, ...otherProps }) => {
  const overviewLabels = getAccountOverviewLabels(labels);
  return <AccountOverviewComponent labels={overviewLabels} {...otherProps} />;
};

AccountOverviewContainer.propTypes = {
  labels: PropTypes.shape({
    accountOverview: PropTypes.shape({}),
  }),
};

AccountOverviewContainer.defaultProps = {
  labels: {
    accountOverview: {},
  },
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(AccountOverviewContainer);
