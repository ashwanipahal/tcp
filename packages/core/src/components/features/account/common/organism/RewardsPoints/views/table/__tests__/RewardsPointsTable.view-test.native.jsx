import React from 'react';
import { shallow } from 'enzyme';
import RewardsPointsTable from '../RewardsPointsTable.view';

describe('RewardsPointsTable Component', () => {
  let component;
  let props = {
    pointsToNextReward: 90,
    currentPoints: 10,
    totalRewards: 0,
    labels: {
      lbl_common_currency: '$',
      lbl_common_heading: 'My Rewards',
      lbl_common_current_points: 'Current Points',
      lbl_common_next_reward_points: 'Points to Next Reward',
    },
  };
  component = shallow(<RewardsPointsTable {...props} />);
  beforeEach(() => {
    component = shallow(<RewardsPointsTable {...props} />);
  });

  it('should render correctly', () => {
    component = shallow(<RewardsPointsTable {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly with values', () => {
    props = {
      pointsToNextReward: 90,
      currentPoints: 10,
      totalRewards: 0,
      labels: {
        lbl_common_current_points: 'Current Points',
        lbl_common_next_reward_points: 'Points to Next Reward',
      },
    };
    component = shallow(<RewardsPointsTable {...props} />);
    expect(component).toMatchSnapshot();
  });
});
