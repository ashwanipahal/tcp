import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AccountOverviewComponent from '../views/AccountOverview.view';

const getAccountOverviewLabels = labels => {
  return (
    (labels && labels.accountOverview) || {
      lbl_overview_heading: 'ACCOUNT OVERVIEW',
      lbl_overview_addressBookHeading: 'Address Book',
      lbl_overview_addressBookCTA: 'VIEW ADDRESS BOOK',
      lbl_overview_paymentHeading: 'Payment & Gift Cards',
      lbl_overview_paymentCTA: 'VIEW PAYMENT & GIFT CARDS',
      lbl_overview_myPlaceRewardsHeading: 'My Place Rewards',
      lbl_overview_myPlaceRewardsCTA: 'VIEW ALL REWARDS',
    }
  );
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
