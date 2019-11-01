import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
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
            fontSize="fs20"
            fontWeight="black"
            color="gray.900"
            text={`${
              getLabelValue(labels, 'lbl_rewardPoints_currency')
                ? getLabelValue(labels, 'lbl_rewardPoints_currency')
                : ''
            }${Math.round(totalRewards || 0)}`}
          />
          <TextWrapper>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs14"
              fontWeight="regular"
              textAlign="center"
              color="black"
              text={getLabelValue(labels, 'lbl_rewardPoints_heading')}
            />
          </TextWrapper>
        </MyRewardsWrapper>
        <VerticalLine />
        <CurrentPointsWrapper>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs20"
            fontWeight="black"
            color="gray.900"
            text={Math.round(currentPoints || 0)}
          />
          <TextWrapper>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs14"
              fontWeight="regular"
              textAlign="center"
              color="black"
              text={getLabelValue(labels, 'lbl_rewardPoints_currentPoints')}
            />
          </TextWrapper>
        </CurrentPointsWrapper>
        <VerticalLine />
        <NextRewardsWrapper>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs20"
            fontWeight="black"
            color="gray.900"
            text={Math.round(pointsToNextReward || 100)}
          />
          <TextWrapper>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs14"
              fontWeight="regular"
              textAlign="center"
              color="black"
              text={getLabelValue(labels, 'lbl_rewardPoints_nextReward')}
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
    lbl_rewardPoints_currency: '',
    lbl_rewardPoints_heading: '',
    lbl_rewardPoints_currentPoints: '',
    lbl_rewardPoints_nextReward_points: '',
  },
};

export default RewardsPointsTable;
