import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AccountOverviewComponent from '../views/AccountOverview.view';
import { setTrackOrderModalMountedState } from '../../TrackOrder/container/TrackOrder.actions';

const getAccountOverviewLabels = labels => {
  return (labels && labels.accountOverview) || {};
};

const getAccountCommonLabels = labels => {
  return (labels && labels.common) || {};
};

const AccountOverviewContainer = ({ labels, openTrackOrder, ...otherProps }) => {
  const overviewLabels = getAccountOverviewLabels(labels);
  const commonLabels = getAccountCommonLabels(labels);
  return (
    <AccountOverviewComponent
      labels={overviewLabels}
      commonLabels={commonLabels}
      openTrackOrder={openTrackOrder}
      {...otherProps}
    />
  );
};

AccountOverviewContainer.propTypes = {
  labels: PropTypes.shape({
    accountOverview: PropTypes.shape({}),
  }),
  openTrackOrder: PropTypes.func.isRequired,
};

AccountOverviewContainer.defaultProps = {
  labels: {
    accountOverview: {},
  },
};

export const mapStateToProps = () => ({});

export const mapDispatchToProps = dispatch => {
  return {
    openTrackOrder: payload => {
      dispatch(setTrackOrderModalMountedState(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountOverviewContainer);
export { AccountOverviewContainer as AccountOverviewContainerVanilla };
