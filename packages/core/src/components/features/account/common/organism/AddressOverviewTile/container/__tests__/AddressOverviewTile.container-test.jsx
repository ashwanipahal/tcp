import React from 'react';
import { shallow } from 'enzyme';
import { AddressOverviewTile, mapDispatchToProps } from '../AddressOverviewTile.container';
import AddressOverviewTileComponent from '../../views/AddressOverviewTile.view';

describe('AddressOverviewTile container', () => {
  it('should render AddressOverviewTile component', () => {
    const addressList = {};
    const component = shallow(
      <AddressOverviewTile labels={{ accountOverview: {} }} addressList={addressList} />
    );
    expect(component.is(AddressOverviewTileComponent)).toBeTruthy();
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
