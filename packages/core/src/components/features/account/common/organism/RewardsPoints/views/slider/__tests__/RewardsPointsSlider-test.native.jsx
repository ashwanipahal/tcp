import { shallow } from 'enzyme';
import React from 'react';
import { RewardsPointsSliderVanilla } from '../RewardsPointsSlider.view.native';

describe('RewardsPoints Slider View', () => {
  it('should render RewardsPointsViewVanilla Correctly', () => {
    const props = {
      pointsToNextReward: '10',
      currentPoints: '',
      totalRewards: '',
      labels: {
        lbl_rewardPoints_currentPoints: 'Current Points',
        lbl_rewardPoints_heading: 'My rewards',
        lbl_rewardPoints_nextReward: 'Next Rewards',
        lbl_rewardPoints_currency: '$',
      },
    };
    const tree = shallow(<RewardsPointsSliderVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
