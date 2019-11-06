import React from 'react';
import { shallow } from 'enzyme';
import { AddressOverviewTile, mapDispatchToProps } from '../AddressOverviewTile.container';
import AddressOverviewTileComponent from '../../views/AddressOverviewTile.view';
import AddressOverviewTileSkelton from '../../skelton/AddressOverviewTileSkelton.view';

describe('AddressOverviewTile container', () => {
  it('should render AddressOverviewTile component', () => {
    const addressList = {};
    const component = shallow(
      <AddressOverviewTile
        labels={{ accountOverview: {} }}
        addressList={addressList}
        getAddressListAction={() => {}}
        isFetching={false}
      />
    );
    expect(component.is(AddressOverviewTileComponent)).toBeTruthy();
    expect(component.is(AddressOverviewTileSkelton)).not.toBeTruthy();
  });
  it('should render AddressOverviewTileSkelton component', () => {
    const addressList = {};
    const component = shallow(
      <AddressOverviewTile
        labels={{ accountOverview: {} }}
        addressList={addressList}
        getAddressListAction={() => {}}
        isFetching
      />
    );
    expect(component.is(AddressOverviewTileSkelton)).toBeTruthy();
    expect(component.is(AddressOverviewTileComponent)).not.toBeTruthy();
  });
});

describe('#mapDispatchToProps', () => {
  it('should return an action getAddressList which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getAddressListAction();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
