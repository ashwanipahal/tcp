import React from 'react';
import { shallow } from 'enzyme';
import { PlaceRewardsSectionVanilla } from '../PlaceRewards.section';

describe('MyRewards', () => {
  it('should render correctly', () => {
    const labels = {
      common: {},
      myPlaceRewards: {},
    };
    const tree = shallow(<PlaceRewardsSectionVanilla labels={labels} />);
    expect(tree).toMatchSnapshot();
  });
});
