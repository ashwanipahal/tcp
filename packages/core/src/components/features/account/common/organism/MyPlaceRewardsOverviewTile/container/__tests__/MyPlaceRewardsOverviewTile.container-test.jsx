import React from 'react';
import { shallow } from 'enzyme';
import { MyPlaceRewardsOverviewTile } from '../MyPlaceRewardsOverviewTile.container';
import MyPlaceRewardsOverviewTileComponent from '../../views/MyPlaceRewardsOverviewTile.view';

describe('MyPlaceRewardsOverviewTile container', () => {
  it('should render MyPlaceRewardsOverviewTile component', () => {
    const component = shallow(
      <MyPlaceRewardsOverviewTile labels={{ accountOverview: {} }} fetchCoupons={() => {}} />
    );
    expect(component.is(MyPlaceRewardsOverviewTileComponent)).toBeTruthy();
  });
});
