import React from 'react';
import { shallow } from 'enzyme';
import { MyWalletTile } from '../MyWalletTile.container';
import MyWalletTileComponent from '../../views/MyWalletTile.view';
import MyWalletTileSkelton from '../../skelton/MyWalletTileSkelton.view';

describe('MyWalletTile container', () => {
  it('should render MyWalletTile component', () => {
    const component = shallow(
      <MyWalletTile labels={{ accountOverview: {} }} fetchCoupons={() => {}} isFetching={false} />
    );
    expect(component.is(MyWalletTileComponent)).toBeTruthy();
    expect(component.is(MyWalletTileSkelton)).not.toBeTruthy();
  });

  it('should render MyWalletTileSkelton component', () => {
    const component = shallow(
      <MyWalletTile labels={{ accountOverview: {} }} fetchCoupons={() => {}} isFetching />
    );
    expect(component.is(MyWalletTileComponent)).not.toBeTruthy();
    expect(component.is(MyWalletTileSkelton)).toBeTruthy();
  });
});
