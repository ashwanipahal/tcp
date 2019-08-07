import React from 'react';
import { shallow } from 'enzyme';
import { MyPlaceRewardsOverviewTile } from '../MyPlaceRewardsOverviewTile.view';

describe('MyPlaceRewardsOverviewTile component', () => {
  it('should render correctly', () => {
    const component = shallow(<MyPlaceRewardsOverviewTile />);
    expect(component).toMatchSnapshot();
  });
});
