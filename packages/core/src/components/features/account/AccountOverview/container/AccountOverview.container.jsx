import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AccountOverviewComponent from '../views/AccountOverview.view';

const getAccountOverviewLabels = labels => {
  return (labels && labels.accountOverview) || {};
};

const getAccountCommonLabels = labels => {
  return (labels && labels.common) || {};
};

export const AccountOverviewContainer = ({ labels, ...otherProps }) => {
  const overviewLabels = getAccountOverviewLabels(labels);
  const commonLabels = getAccountCommonLabels(labels);
  return (
    <AccountOverviewComponent labels={overviewLabels} commonLabels={commonLabels} {...otherProps} />
  );
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
