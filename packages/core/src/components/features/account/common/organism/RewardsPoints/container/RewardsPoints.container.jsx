import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RewardsPointsSlider from '../views/slider';
import RewardsPointsTable from '../views/table';
import {
  getPointsToNextRewardState,
  getCurrentPointsState,
  getTotalRewardsState,
  isPlccUser,
} from '../../../../User/container/User.selectors';

/**
 * @function RewardsPointsContainer The RewardsPointsContainer component is the main container for the Rewards Points Container section
 * This component includes the Rewards Points view, it passes the my rewards point section with the rewards points details to be rendered
 * NOTE: this rewards point organism.
 * @param {router} router Router object to get the query key
 */

export class RewardsPointsContainer extends React.PureComponent {
  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const {
      pointsToNextReward,
      currentPoints,
      totalRewards,
      labels,
      tableView,
      plccUser,
    } = this.props;
    if (tableView) {
      return (
        <RewardsPointsTable
          pointsToNextReward={pointsToNextReward}
          currentPoints={currentPoints}
          totalRewards={totalRewards}
          labels={labels}
        />
      );
    }
    return (
      <RewardsPointsSlider
        pointsToNextReward={pointsToNextReward}
        currentPoints={currentPoints}
        totalRewards={totalRewards}
        plccUser={plccUser}
        labels={labels}
      />
    );
  }
}

const commonLabels = state =>
  state.Labels && state.Labels.global ? state.Labels.global.rewardPoints : '';

const mapStateToProps = state => {
  return {
    labels: commonLabels(state),
    pointsToNextReward: getPointsToNextRewardState(state),
    currentPoints: getCurrentPointsState(state),
    totalRewards: getTotalRewardsState(state),
    plccUser: isPlccUser(state),
  };
};

RewardsPointsContainer.propTypes = {
  pointsToNextReward: PropTypes.number,
  currentPoints: PropTypes.number,
  totalRewards: PropTypes.number,
  plccUser: PropTypes.bool,
  labels: PropTypes.shape({
    lbl_rewardPoints_currentPoints: PropTypes.string,
    lbl_rewardPoints_heading: PropTypes.string,
    lbl_rewardPoints_nextReward: PropTypes.string,
    lbl_rewardPoints_currency: PropTypes.string,
  }),
  tableView: PropTypes.bool,
};

RewardsPointsContainer.defaultProps = {
  pointsToNextReward: '',
  currentPoints: '',
  totalRewards: '',
  plccUser: false,
  labels: {
    lbl_rewardPoints_currentPoints: '',
    lbl_rewardPoints_heading: '',
    lbl_rewardPoints_nextReward: '',
    lbl_rewardPoints_currency: '',
  },
  tableView: false,
};

export default connect(mapStateToProps)(RewardsPointsContainer);
