import React from 'react';
import { shallow } from 'enzyme';
import { MyRewardsVanilla } from '../MyRewards.view';

describe('MyRewards', () => {
  it('should render correctly', () => {
    const labels = {
      common: {},
      myPlaceRewards: {},
    };
    const tree = shallow(<MyRewardsVanilla labels={labels} />);
    expect(tree).toMatchSnapshot();
  });
});
