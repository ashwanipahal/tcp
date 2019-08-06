import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router'; //eslint-disable-line
import RewardsPoints from '../views/RewardsPoints.view';
import {
  getPointsToNextRewardState,
  getCurrentPointsState,
  getTotalRewardsState,
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
    const { pointsToNextReward, currentPoints, totalRewards, labels } = this.props;

    return (
      <RewardsPoints
        pointsToNextReward={pointsToNextReward}
        currentPoints={currentPoints}
        totalRewards={totalRewards}
        labels={labels}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    pointsToNextReward: getPointsToNextRewardState(state),
    currentPoints: getCurrentPointsState(state),
    totalRewards: getTotalRewardsState(state),
  };
};

RewardsPointsContainer.propTypes = {
  pointsToNextReward: PropTypes.number,
  currentPoints: PropTypes.number,
  totalRewards: PropTypes.number,
  labels: PropTypes.shape({
    lbl_my_rewards_current_points: PropTypes.string,
    lbl_my_rewards_heading: PropTypes.string,
    lbl_my_rewards_next_reward: PropTypes.string,
    lbl_my_rewards_currency: PropTypes.string,
  }),
};

RewardsPointsContainer.defaultProps = {
  pointsToNextReward: '',
  currentPoints: '',
  totalRewards: '',
  labels: {
    lbl_my_rewards_current_points: '',
    lbl_my_rewards_heading: '',
    lbl_my_rewards_next_reward: '',
    lbl_my_rewards_currency: '',
  },
};

export default withRouter(connect(mapStateToProps)(RewardsPointsContainer));
