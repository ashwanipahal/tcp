import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AccountHeader from '../views';
import {
  getUserName,
  getPointsToNextRewardState,
  getCurrentPointsState,
  getTotalRewardsState,
} from '../../../../LoginPage/container/LoginPage.selectors';
import { fetchModuleX } from './AccountHeader.actions';
import { getRewardsPointsBannerContent } from './AccountHeader.selectors';

export class AccountHeaderContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.labels = this.getOverviewLabels(props.labels);
    this.commonLabels = this.getCommonLabels(props.labels);
  }

  componentDidMount() {
    const { fetchRewardsPointsBannerContent } = this.props;
    const isPlcc = true;
    const contentKey = `overviewRewardsPointsBanner${isPlcc ? 'PLCC' : 'MPR'}`;
    const contentObject = this.labels.referred.find(ref => ref.name === contentKey);
    if (contentObject && contentObject.contentId) {
      fetchRewardsPointsBannerContent(contentObject.contentId);
    }
  }

  getOverviewLabels = labels => {
    return (labels && labels.accountOverview) || {};
  };

  getCommonLabels = labels => {
    return (labels && labels.common) || {};
  };

  render() {
    const { labels, commonLabels, ...otherProps } = this.props;
    return <AccountHeader labels={this.labels} commonLabels={this.commonLabels} {...otherProps} />;
  }
}

AccountHeaderContainer.propTypes = {
  labels: PropTypes.shape({}),
  commonLabels: PropTypes.shape({}),
  fetchRewardsPointsBannerContent: PropTypes.func.isRequired,
};

AccountHeaderContainer.defaultProps = {
  labels: {},
  commonLabels: {},
};

const mapStateToProps = state => ({
  name: getUserName(state),
  pointsToNextRewards: getPointsToNextRewardState(state),
  currentPoints: getCurrentPointsState(state),
  totalRewards: getTotalRewardsState(state),
  rewardsPointsBannerContent: getRewardsPointsBannerContent(state),
});

const mapDispatchToProps = dispatch => ({
  fetchRewardsPointsBannerContent: contentId => {
    dispatch(fetchModuleX(contentId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountHeaderContainer);
