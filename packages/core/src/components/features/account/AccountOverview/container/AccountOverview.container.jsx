import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleApplyNowModal } from '@tcp/core/src/components/common/molecules/ApplyNowPLCCModal/container/ApplyNowModal.actions';
import AccountOverviewComponent from '../views/AccountOverview.view';
import { setTrackOrderModalMountedState } from '../../TrackOrder/container/TrackOrder.actions';

const getAccountOverviewLabels = labels => {
  return (labels && labels.accountOverview) || {};
};

const getAccountCommonLabels = labels => {
  return (labels && labels.common) || {};
};

const AccountOverviewContainer = ({ labels, openTrackOrder, openApplyNowModal, ...otherProps }) => {
  const overviewLabels = getAccountOverviewLabels(labels);
  const commonLabels = getAccountCommonLabels(labels);
  return (
    <AccountOverviewComponent
      labels={overviewLabels}
      commonLabels={commonLabels}
      openTrackOrder={openTrackOrder}
      openApplyNowModal={openApplyNowModal}
      {...otherProps}
    />
  );
};

AccountOverviewContainer.propTypes = {
  labels: PropTypes.shape({
    accountOverview: PropTypes.shape({}),
  }),
  openTrackOrder: PropTypes.func.isRequired,
  openApplyNowModal: PropTypes.func.isRequired,
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
    openApplyNowModal: payload => {
      dispatch(toggleApplyNowModal(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountOverviewContainer);
export { AccountOverviewContainer as AccountOverviewContainerVanilla };
