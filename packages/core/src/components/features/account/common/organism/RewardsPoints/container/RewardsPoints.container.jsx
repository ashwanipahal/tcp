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
} from '../../../../LoginPage/container/LoginPage.selectors';

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
  state.Labels && state.Labels.account ? state.Labels.account.common : '';

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
    lbl_common_current_points: PropTypes.string,
    lbl_common_heading: PropTypes.string,
    lbl_common_next_reward: PropTypes.string,
    lbl_common_currency: PropTypes.string,
  }),
  tableView: PropTypes.bool,
};

RewardsPointsContainer.defaultProps = {
  pointsToNextReward: '',
  currentPoints: '',
  totalRewards: '',
  plccUser: false,
  labels: {
    lbl_common_current_points: '',
    lbl_common_heading: '',
    lbl_common_next_reward: '',
    lbl_common_currency: '',
  },
  tableView: false,
};

export default connect(mapStateToProps)(RewardsPointsContainer);
