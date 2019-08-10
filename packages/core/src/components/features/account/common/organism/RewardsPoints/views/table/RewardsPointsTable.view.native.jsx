import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../../common/atoms/BodyCopy';
import {
  RewardsOverviewContainer,
  MyRewardsWrapper,
  CurrentPointsWrapper,
  NextRewardsWrapper,
} from '../../styles/RewardsPointsTable.style';

/**
 * @function RewardsPointsView The RewardsPointsView component will provide slider for account drawer
 */

export class RewardsPointsTable extends React.PureComponent<Props> {
  render() {
    const { labels } = this.props;
    return (
      <RewardsOverviewContainer>
        <MyRewardsWrapper>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs14"
            fontWeight="black"
            text={`${labels.lbl_common_currency} 10`}
            color="black"
          />
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs12"
            fontWeight="regular"
            text={labels.lbl_common_heading}
            color="gray.700"
            height="50"
          />
        </MyRewardsWrapper>
        <View
          style={{
            borderLeftWidth: 1,
            borderLeftColor: 'black',
            height: 50,
            alignSelf: 'center',
          }}
        />
        <CurrentPointsWrapper>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs14"
            fontWeight="black"
            text="20"
            color="black"
          />
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs12"
            fontWeight="regular"
            text={labels.lbl_common_current_points}
            color="gray.700"
          />
        </CurrentPointsWrapper>
        <View
          style={{
            borderLeftWidth: 1,
            borderLeftColor: 'black',
            height: 50,
            alignSelf: 'center',
          }}
        />
        <NextRewardsWrapper>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs14"
            fontWeight="black"
            text="100"
            color="black"
          />
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs12"
            fontWeight="regular"
            text="Points to Next Reward"
            color="gray.700"
          />
        </NextRewardsWrapper>
      </RewardsOverviewContainer>
    );
  }
}

RewardsPointsTable.propTypes = {
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
  pointsToNextReward: '10',
  currentPoints: '90',
  totalRewards: '100',
  labels: {
    lbl_common_current_points: '',
    lbl_common_heading: '',
    lbl_common_next_reward: '',
    lbl_common_currency: '',
  },
};

export default RewardsPointsTable;
