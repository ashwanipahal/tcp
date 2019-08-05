import { shallow } from 'enzyme';
import React from 'react';
import { RewardsPointsSliderVanilla } from '../RewardsPointsSlider.view';

describe('RewardsPoints Slider View', () => {
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
    const tree = shallow(<RewardsPointsSliderVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
