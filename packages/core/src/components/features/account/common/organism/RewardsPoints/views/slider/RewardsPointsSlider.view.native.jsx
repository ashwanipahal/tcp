import React from 'react';
import PropTypes from 'prop-types';
import {
  RewardsPointsView,
  CurrentPointsWrapper,
  RewardWrapper,
  ProgressBarWrapper,
  ProgressBarRewardWrapper,
  PointHeadingWrapper,
} from '../../styles/RewardsPoints.style.native';
import BodyCopy from '../../../../../../../common/atoms/BodyCopy';

/**
 * @function RewardsPointsView The RewardsPointsView component will provide slider for account drawer
 */

const RewardsPointsSlider = ({ pointsToNextReward, currentPoints, totalRewards, labels }) => {
  return (
    <React.Fragment>
      <RewardsPointsView>
        <PointHeadingWrapper />
        <CurrentPointsWrapper>
          <BodyCopy
            fontSize="fs14"
            fontFamily="secondary"
            text={`${labels.lbl_common_current_points}: `}
          />
          <BodyCopy
            text={currentPoints}
            fontWeight="black"
            fontFamily="secondary"
            fontSize="fs14"
          />
        </CurrentPointsWrapper>
        <RewardWrapper>
          <BodyCopy
            text={`${labels.lbl_common_heading}: `}
            fontFamily="secondary"
            fontSize="fs14"
          />
          {totalRewards && (
            <BodyCopy
              text={`${labels.lbl_common_currency} ${totalRewards && Math.trunc(totalRewards)} `}
              fontFamily="secondary"
              fontSize="fs14"
              fontWeight="black"
            />
          )}
        </RewardWrapper>

        <ProgressBarWrapper>
          <ProgressBarRewardWrapper style={{ width: `${currentPoints}%` }} />
        </ProgressBarWrapper>

        <RewardWrapper>
          <BodyCopy
            fontSize="fs14"
            fontFamily="secondary"
            text={`${labels.lbl_common_next_reward}: `}
          />
          <BodyCopy
            text={pointsToNextReward}
            fontWeight="black"
            fontFamily="secondary"
            fontSize="fs14"
          />
        </RewardWrapper>
      </RewardsPointsView>
    </React.Fragment>
  );
};

RewardsPointsSlider.propTypes = {
  pointsToNextReward: PropTypes.number,
  currentPoints: PropTypes.number,
  totalRewards: PropTypes.number,
  labels: PropTypes.shape({
    lbl_common_current_points: PropTypes.string,
    lbl_common_heading: PropTypes.string,
    lbl_common_next_reward: PropTypes.string,
    lbl_common_currency: PropTypes.string,
  }),
};

RewardsPointsSlider.defaultProps = {
  pointsToNextReward: '0',
  currentPoints: '0',
  totalRewards: '0',
  labels: {
    lbl_common_current_points: '',
    lbl_common_heading: '',
    lbl_common_next_reward: '',
    lbl_common_currency: '',
  },
};

export default RewardsPointsSlider;
export { RewardsPointsSlider as RewardsPointsSliderVanilla };
