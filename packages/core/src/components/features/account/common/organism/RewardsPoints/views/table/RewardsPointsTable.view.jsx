import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
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
            {getLabelValue(labels, 'lbl_rewardPoints_currency')}
            {totalRewards && Math.trunc(totalRewards)}
          </BodyCopy>
          <BodyCopy fontSize="fs14" textAlign="center">
            {getLabelValue(labels, 'lbl_rewardPoints_heading')}
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
            {getLabelValue(labels, 'lbl_rewardPoints_currentPoints')}
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
            {getLabelValue(labels, 'lbl_rewardPoints_nextReward')}
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
    lbl_rewardPoints_currentPoints: PropTypes.string,
    lbl_rewardPoints_heading: PropTypes.string,
    lbl_rewardPoints_nextReward: PropTypes.string,
    lbl_rewardPoints_currency: PropTypes.string,
  }),
};

RewardsPointsTable.defaultProps = {
  className: '',
  pointsToNextReward: '',
  currentPoints: '',
  totalRewards: '',
  labels: {
    lbl_rewardPoints_currentPoints: '',
    lbl_rewardPoints_heading: '',
    lbl_rewardPoints_nextReward: '',
    lbl_rewardPoints_currency: '',
  },
};

export default withStyles(RewardsPointsTable, styles);
export { RewardsPointsTable as RewardsPointsTableVanilla };
