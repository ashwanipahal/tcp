import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../../common/hoc/withStyles';
import styles from '../../styles/RewardsPoints.style';

/**
 * @function RewardsPointsView The RewardsPointsView component will provide slider for account drawer
 */

const RewardsPointsTable = ({
  className,
  pointsToNextReward,
  currentPoints,
  totalRewards,
  labels,
}) => {
  return (
    <div className={className}>
      <BodyCopy component="div" className="table-container">
        <BodyCopy component="div" className="table-item">
          <BodyCopy
            fontSize="fs20"
            fontWeight="extrabold"
            fontFamily="secondary"
            textAlign="center"
          >
            {labels.lbl_common_currency}
            {totalRewards && Math.trunc(totalRewards)}
          </BodyCopy>
          <BodyCopy fontSize="fs14" textAlign="center">
            {labels.lbl_common_heading}
          </BodyCopy>
        </BodyCopy>
        <BodyCopy component="div" className="table-item">
          <BodyCopy
            textAlign="center"
            fontSize="fs20"
            fontWeight="extrabold"
            fontFamily="secondary"
          >
            {currentPoints}
          </BodyCopy>
          <BodyCopy fontSize="fs14" textAlign="center">
            {labels.lbl_common_current_points}
          </BodyCopy>
        </BodyCopy>
        <BodyCopy component="div" className="table-item">
          <BodyCopy
            textAlign="center"
            fontSize="fs20"
            fontWeight="extrabold"
            fontFamily="secondary"
          >
            {pointsToNextReward}
          </BodyCopy>
          <BodyCopy fontSize="fs14" textAlign="center">
            {labels.lbl_common_next_reward}
          </BodyCopy>
        </BodyCopy>
      </BodyCopy>
    </div>
  );
};

RewardsPointsTable.propTypes = {
  className: PropTypes.string,
  pointsToNextReward: PropTypes.string,
  currentPoints: PropTypes.string,
  totalRewards: PropTypes.string,
  labels: PropTypes.shape({
    lbl_common_current_points: PropTypes.string,
    lbl_common_heading: PropTypes.string,
    lbl_common_next_reward: PropTypes.string,
    lbl_common_currency: PropTypes.string,
  }),
};

RewardsPointsTable.defaultProps = {
  className: '',
  pointsToNextReward: '',
  currentPoints: '',
  totalRewards: '',
  labels: {
    lbl_common_current_points: '',
    lbl_common_heading: '',
    lbl_common_next_reward: '',
    lbl_common_currency: '',
  },
};

export default withStyles(RewardsPointsTable, styles);
export { RewardsPointsTable as RewardsPointsTableVanilla };
