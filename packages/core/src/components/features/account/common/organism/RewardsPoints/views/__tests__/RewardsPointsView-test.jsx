import { shallow } from 'enzyme';
import React from 'react';
import { RewardsPointsViewVanilla } from '../RewardsPoints.view';

describe('My Account Layout View', () => {
  it('should render RewardsPointsViewVanilla Correctly', () => {
    const props = {
      pointsToNextReward: '10',
      currentPoints: '',
      totalRewards: '',
      labels: {
        lbl_my_rewards_current_points: 'Current Points',
        lbl_my_rewards_heading: 'My rewards',
        lbl_my_rewards_next_reward: 'Next Rewards',
        lbl_my_rewards_currency: '$',
      },
    };
    const tree = shallow(<RewardsPointsViewVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
