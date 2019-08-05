import React from 'react';
import { connect } from 'react-redux';
import AccountOverview from '../views';
import {
  getUserName,
  getPointsToNextRewardState,
  getCurrentPointsState,
  getTotalRewardsState,
} from '../../../../LoginPage/container/LoginPage.selectors';

const AccountOverviewContainer = props => {
  return <AccountOverview {...props} />;
};

const mapStateToProps = state => ({
  name: getUserName(state),
  pointsToNextRewards: getPointsToNextRewardState(state),
  currentPoints: getCurrentPointsState(state),
  totalRewards: getTotalRewardsState(state),
});

export default connect(mapStateToProps)(AccountOverviewContainer);
