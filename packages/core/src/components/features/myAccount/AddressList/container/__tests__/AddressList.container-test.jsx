import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { AddressListContainer, mapDispatchToProps } from '../AddressList.container';
import AddressBookComponent from '../../views/AddressBook.view';

describe('AddressList container', () => {
  it('should render nothing if addressList prop is not defined', () => {
    const component = shallow(<AddressListContainer getAddressListAction={() => {}} />);
    expect(component.isEmptyRender()).toBeTruthy();
  });

  it('should render AddressBookComponent if addressList prop is of List type', () => {
    const addressList = List();
    const component = shallow(
      <AddressListContainer addressList={addressList} getAddressListAction={() => {}} />
    );
    expect(component.is(AddressBookComponent)).toBeTruthy();
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action getAddressListAction which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.getAddressListAction();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
