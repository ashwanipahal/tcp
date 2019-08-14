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
} from '../../styles/RewardsPointsTable.style';

/**
 * @function RewardsPointsTable The RewardsPointsTable component will provide rewards table listing on the account overview page
 */

export class RewardsPointsTable extends React.PureComponent<Props> {
  render() {
    const { labels, pointsToNextReward, currentPoints, totalRewards } = this.props;
    return (
      <RewardsOverviewContainer>
        <MyRewardsWrapper>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs18"
            fontWeight="black"
            color="gray.900"
            text={`${labels.lbl_common_currency ? labels.lbl_common_currency : ''}${Math.round(
              totalRewards || 0
            )}`}
          />
          <TextWrapper>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs13"
              fontWeight="regular"
              textAlign="center"
              color="black"
              text={labels.lbl_common_heading}
            />
          </TextWrapper>
        </MyRewardsWrapper>
        <VerticalLine />
        <CurrentPointsWrapper>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs18"
            fontWeight="black"
            color="gray.900"
            text={Math.round(currentPoints || 0)}
          />
          <TextWrapper>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs13"
              fontWeight="regular"
              textAlign="center"
              color="black"
              text={labels.lbl_common_current_points}
            />
          </TextWrapper>
        </CurrentPointsWrapper>
        <VerticalLine />
        <NextRewardsWrapper>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs18"
            fontWeight="black"
            color="gray.900"
            text={Math.round(pointsToNextReward || 100)}
          />
          <TextWrapper>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs13"
              fontWeight="regular"
              textAlign="center"
              color="black"
              text={labels.lbl_common_next_reward_points}
            />
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
  labels: {
    lbl_common_currency: '',
    lbl_common_heading: '',
    lbl_common_current_points: '',
    lbl_common_next_reward_points: '',
  },
};

export default RewardsPointsTable;
