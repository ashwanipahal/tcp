import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../../common/hoc/withStyles';
import {
  RewardsOverviewContainer,
  MyRewardsWrapper,
  CurrentPointsWrapper,
  NextRewardsWrapper,
} from '../../styles/RewardsPointsTable.style';

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
    <RewardsOverviewContainer>
      <MyRewardsWrapper>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs13"
          fontWeight="regular"
          text={totalRewards}
          color="gray.900"
        />
      </MyRewardsWrapper>
      <CurrentPointsWrapper>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs13"
          fontWeight="regular"
          text={currentPoints}
          color="gray.900"
        />
      </CurrentPointsWrapper>
      <NextRewardsWrapper>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs13"
          fontWeight="regular"
          text={pointsToNextReward}
          color="gray.900"
        />
      </NextRewardsWrapper>
    </RewardsOverviewContainer>
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

export default RewardsPointsTable;
