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
      lbl_rewardPoints_currency: '$',
      lbl_rewardPoints_heading: 'My Rewards',
      lbl_rewardPoints_currentPoints: 'Current Points',
      lbl_rewardPoints_nextReward: 'Points to Next Reward',
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
        lbl_rewardPoints_currentPoints: 'Current Points',
        lbl_rewardPoints_nextReward: 'Points to Next Reward',
      },
    };
    component = shallow(<RewardsPointsTable {...props} />);
    expect(component).toMatchSnapshot();
  });
});
