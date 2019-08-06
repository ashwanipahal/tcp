import { shallow } from 'enzyme';
import React from 'react';
import { RewardsPointsContainer } from '../container/RewardsPoints.container';

describe('Rewards Points Container View', () => {
  it('should render Rewards Points Container Correctly', () => {
    const tree = shallow(<RewardsPointsContainer />);
    expect(tree).toMatchSnapshot();
  });
});
