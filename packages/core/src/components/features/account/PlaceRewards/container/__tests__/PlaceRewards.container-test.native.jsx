import React from 'react';
import { shallow } from 'enzyme';
import PlaceRewardsContainer from '../PlaceRewards.container.native';

describe('PlaceRewardsContainer', () => {
  it('should render correctly', () => {
    const labels = {
      common: {},
      myPlaceRewards: {},
    };
    const tree = shallow(<PlaceRewardsContainer labels={labels} />);
    expect(tree).toMatchSnapshot();
  });
});
