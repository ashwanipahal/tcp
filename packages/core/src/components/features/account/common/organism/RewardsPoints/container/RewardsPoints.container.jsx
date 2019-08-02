import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router'; //eslint-disable-line
import RewardsPoints from '../views/RewardsPoints.view';
import labels from './RewardsPoints.labels';
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
    const { pointsToNextReward, currentPoints, totalRewards } = this.props;

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
  labels: PropTypes.shape({}),
};

RewardsPointsContainer.defaultProps = {
  pointsToNextReward: '',
  currentPoints: '',
  totalRewards: '',
  labels: {},
};

export default withRouter(connect(mapStateToProps)(RewardsPointsContainer));
