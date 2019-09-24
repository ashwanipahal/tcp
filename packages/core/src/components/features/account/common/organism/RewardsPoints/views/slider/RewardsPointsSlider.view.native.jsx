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

const RewardsPointsSlider = ({
  pointsToNextReward,
  currentPoints,
  plccUser,
  totalRewards,
  labels,
}) => {
  console.log('furkan-----------');
  console.log(plccUser);
  console.log('furkan-----------');

  return (
    <React.Fragment>
      <RewardsPointsView plccUser={plccUser}>
        <PointHeadingWrapper />
        <CurrentPointsWrapper>
          <BodyCopy
            fontSize="fs14"
            fontFamily="secondary"
            text={`${labels.lbl_rewardPoints_currentPoints}: `}
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
            text={`${labels.lbl_rewardPoints_heading}: `}
            fontFamily="secondary"
            fontSize="fs14"
          />
          {totalRewards && (
            <BodyCopy
              text={`${labels.lbl_rewardPoints_currency} ${totalRewards &&
                Math.trunc(totalRewards)} `}
              fontFamily="secondary"
              fontSize="fs14"
              fontWeight="black"
            />
          )}
        </RewardWrapper>

        <ProgressBarWrapper plccUser={plccUser}>
          <ProgressBarRewardWrapper style={{ width: `${currentPoints}%` }} plccUser={plccUser} />
        </ProgressBarWrapper>

        <RewardWrapper>
          <BodyCopy
            fontSize="fs14"
            fontFamily="secondary"
            text={`${labels.lbl_rewardPoints_nextReward}: `}
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
  plccUser: PropTypes.bool,
  labels: PropTypes.shape({
    lbl_rewardPoints_currentPoints: PropTypes.string,
    lbl_rewardPoints_heading: PropTypes.string,
    lbl_rewardPoints_nextReward: PropTypes.string,
    lbl_rewardPoints_currency: PropTypes.string,
  }),
};

RewardsPointsSlider.defaultProps = {
  pointsToNextReward: '0',
  currentPoints: '0',
  plccUser: false,
  totalRewards: '0',
  labels: {
    lbl_rewardPoints_currentPoints: '',
    lbl_rewardPoints_heading: '',
    lbl_rewardPoints_nextReward: '',
    lbl_rewardPoints_currency: '',
  },
};

export default RewardsPointsSlider;
export { RewardsPointsSlider as RewardsPointsSliderVanilla };
