import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '../../../../../../common/atoms';
import RewardsPoints from '../../RewardsPoints';

export const AccountHeader = ({
  labels,
  name,
  pointsToNextRewards,
  currentPoints,
  totalRewards,
}) => {
  return (
    <Row fullBleed>
      <Col
        colSize={{
          small: 0,
          medium: 0,
          large: 3,
        }}
        isNotInlineBlock
        className="hide-on-mobile hide-on-tablet"
      >
        {`${labels.lbl_overview_greeting} ${name}`}
      </Col>
      <Col
        colSize={{
          small: 0,
          medium: 5,
          large: 3,
        }}
        isNotInlineBlock
        className="hide-on-mobile"
      >
        placeholder
      </Col>
      <Col
        colSize={{
          small: 6,
          medium: 3,
          large: 3,
        }}
        isNotInlineBlock
      >
        <RewardsPoints
          tableView
          labels={{
            lbl_my_rewards_heading: 'My Rewards',
            lbl_my_rewards_current_points: 'Current Points',
            lbl_my_rewards_next_reward: 'Points to Next Reward',
          }}
          pointsToNextRewards={pointsToNextRewards}
          currentPoints={currentPoints}
          totalRewards={totalRewards}
        />
      </Col>
    </Row>
  );
};

AccountHeader.propTypes = {
  name: PropTypes.string,
  pointsToNextRewards: PropTypes.string,
  currentPoints: PropTypes.string,
  totalRewards: PropTypes.string,
  labels: PropTypes.shape({}),
};

AccountHeader.defaultProps = {
  name: '',
  pointsToNextRewards: '',
  currentPoints: '',
  totalRewards: '',
  labels: {},
};

export default AccountHeader;
