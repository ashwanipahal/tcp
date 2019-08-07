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
        lbl_common_current_points: 'Current Points',
        lbl_common_heading: 'My rewards',
        lbl_common_next_reward: 'Next Rewards',
        lbl_common_currency: '$',
      },
    };
    const tree = shallow(<RewardsPointsSliderVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
