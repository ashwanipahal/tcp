import React from 'react';
import { shallow } from 'enzyme';
import { AddressOverviewTile } from '../AddressOverviewTile.container';
import AddressOverviewTileComponent from '../../views/AddressOverviewTile.view';

describe('AddressOverviewTile container', () => {
  it('should render AddressOverviewTile component', () => {
    const addressList={};
    const component = shallow(<AddressOverviewTile labels={{ accountOverview: {} }} addressList={addressList} />);
    expect(component.is(AddressOverviewTileComponent)).toBeTruthy();
  });
});
