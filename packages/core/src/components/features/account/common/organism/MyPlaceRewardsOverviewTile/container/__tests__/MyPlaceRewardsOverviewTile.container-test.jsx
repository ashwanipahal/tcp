import React from 'react';
import { shallow } from 'enzyme';
import { MyPlaceRewardsOverviewTile } from '../MyPlaceRewardsOverviewTile.container';
import MyPlaceRewardsOverviewTileComponent from '../../views/MyPlaceRewardsOverviewTile.view';
import MyPlaceRewardsOverviewTileSkelton from '../../skelton/MyPlaceRewardsOverviewTileSkelton.view';

describe('MyPlaceRewardsOverviewTile container', () => {
  it('should render MyPlaceRewardsOverviewTile component', () => {
    const component = shallow(
      <MyPlaceRewardsOverviewTile
        labels={{ accountOverview: {} }}
        fetchCoupons={() => {}}
        isFetching={false}
      />
    );
    expect(component.is(MyPlaceRewardsOverviewTileComponent)).toBeTruthy();
    expect(component.is(MyPlaceRewardsOverviewTileSkelton)).not.toBeTruthy();
  });

  it('should render MyPlaceRewardsOverviewTileSkelton component', () => {
    const component = shallow(
      <MyPlaceRewardsOverviewTile
        labels={{ accountOverview: {} }}
        fetchCoupons={() => {}}
        isFetching
      />
    );
    expect(component.is(MyPlaceRewardsOverviewTileComponent)).not.toBeTruthy();
    expect(component.is(MyPlaceRewardsOverviewTileSkelton)).toBeTruthy();
  });
});
