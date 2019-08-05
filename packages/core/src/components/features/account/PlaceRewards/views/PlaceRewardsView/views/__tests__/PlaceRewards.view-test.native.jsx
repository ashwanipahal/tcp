import React from 'react';
import { shallow } from 'enzyme';
import PlaceRewardsView from '../PlaceRewards.view';

describe('MyRewards', () => {
  it('should render correctly', () => {
    const labels = {
      common: {},
      myPlaceRewards: {},
    };
    const tree = shallow(<PlaceRewardsView labels={labels} />);
    expect(tree).toMatchSnapshot();
  });
});
