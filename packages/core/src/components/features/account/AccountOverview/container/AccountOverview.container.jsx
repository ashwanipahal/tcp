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

const AccountOverviewContainer = ({
  labels,
  openTrackOrder,
  openApplyNowModal,
  fetchFooterLinks,
  ...otherProps
}) => {
  const overviewLabels = getAccountOverviewLabels(labels);
  const commonLabels = getAccountCommonLabels(labels);
  return (
    <AccountOverviewComponent
      labels={overviewLabels}
      commonLabels={commonLabels}
      openTrackOrder={openTrackOrder}
      openApplyNowModal={openApplyNowModal}
      fetchLinks={fetchFooterLinks}
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
  fetchFooterLinks: PropTypes.func,
};

AccountOverviewContainer.defaultProps = {
  labels: {
    accountOverview: {},
  },
  fetchFooterLinks: () => {},
};

export const mapStateToProps = state => {
  const { AccountReducer } = state;
  return {
    accountFooterLinks: AccountReducer.get('account-footer-links'),
    legalLinks: AccountReducer.get('account-legal-links'),
  };
};

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
