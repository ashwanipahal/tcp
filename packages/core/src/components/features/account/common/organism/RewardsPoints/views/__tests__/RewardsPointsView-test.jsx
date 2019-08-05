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
        ACC_LBL_MY_REWARDS_CURRENT_POINTS: 'Current Points',
        ACC_LBL_MY_REWARDS_HEADING: 'My rewards',
        ACC_LBL_MY_REWARDS_NEXT_REWARD: 'Next Rewards',
      },
    };
    const tree = shallow(<RewardsPointsViewVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
