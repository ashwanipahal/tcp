import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../../common/atoms/BodyCopy';
import {
  RewardsOverviewContainer,
  MyRewardsWrapper,
  CurrentPointsWrapper,
  NextRewardsWrapper,
  TextWrapper,
  VerticalLine,
  RewardsTextStyle,
  RewardsStyle,
} from '../../styles/RewardsPointsTable.style';

/**
 * @function RewardsPointsView The RewardsPointsView component will provide slider for account drawer
 */

export class RewardsPointsTable extends React.PureComponent<Props> {
  render() {
    const { labels, pointsToNextReward, currentPoints, totalRewards } = this.props;
    return (
      <RewardsOverviewContainer>
        <MyRewardsWrapper>
          <BodyCopy {...RewardsStyle} text={`${labels.lbl_common_currency}${totalRewards || 0}`} />
          <TextWrapper>
            <BodyCopy {...RewardsTextStyle} text={labels.lbl_common_heading} />
          </TextWrapper>
        </MyRewardsWrapper>
        <VerticalLine />
        <CurrentPointsWrapper>
          <BodyCopy {...RewardsStyle} text={currentPoints || 0} />
          <TextWrapper>
            <BodyCopy {...RewardsTextStyle} text={labels.lbl_common_current_points} />
          </TextWrapper>
        </CurrentPointsWrapper>
        <VerticalLine />
        <NextRewardsWrapper>
          <BodyCopy {...RewardsStyle} text={pointsToNextReward || 100} />
          <TextWrapper>
            <BodyCopy {...RewardsTextStyle} text={labels.lbl_common_next_reward_points} />
          </TextWrapper>
        </NextRewardsWrapper>
      </RewardsOverviewContainer>
    );
  }
}

RewardsPointsTable.propTypes = {
  pointsToNextReward: PropTypes.number,
  currentPoints: PropTypes.number,
  totalRewards: PropTypes.number,
  labels: PropTypes.shape({}),
};

RewardsPointsTable.defaultProps = {
  pointsToNextReward: 100,
  currentPoints: 0,
  totalRewards: 0,
  labels: {},
};

export default RewardsPointsTable;
