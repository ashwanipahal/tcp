import React from 'react';
import { shallow } from 'enzyme';
import { MyWalletTile } from '../MyWalletTile.container';
import MyWalletTileComponent from '../../views/MyWalletTile.view';

describe('MyWalletTile container', () => {
  it('should render MyWalletTile component', () => {
    const component = shallow(
      <MyWalletTile labels={{ accountOverview: {} }} fetchCoupons={() => {}} />
    );
    expect(component.is(MyWalletTileComponent)).toBeTruthy();
  });
});
