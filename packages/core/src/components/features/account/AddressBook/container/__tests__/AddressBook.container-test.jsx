import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { AddressBookContainer, mapDispatchToProps } from '../AddressBook.container';
import AddressView from '../../views/AddressView';

describe('AddressList container', () => {
  it('should render nothing if addressList prop is not defined', () => {
    const component = shallow(
      <AddressBookContainer getAddressListAction={() => {}} getUserInfoAction={() => {}} />
    );
    expect(component.isEmptyRender()).toBeTruthy();
  });

  it('should render AddressView if addressList prop is of List type', () => {
    const addressList = List();
    const component = shallow(
      <AddressBookContainer
        addressList={addressList}
        getAddressListAction={() => {}}
        getUserInfoAction={() => {}}
      />
    );
    expect(component.is(AddressView)).toBeTruthy();
  });

  it('should call clearAddressBookNotification on unmounting of addressBook container', () => {
    const addressList = List();
    const clearAddressBookNotification = jest.fn();
    const component = shallow(
      <AddressBookContainer
        addressList={addressList}
        getAddressListAction={() => {}}
        getUserInfoAction={() => {}}
        clearAddressBookNotification={clearAddressBookNotification}
      />
    );
    component.unmount();
    expect(clearAddressBookNotification).toBeCalled();
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action getAddressListAction which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.getAddressListAction();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
    it('should return an action onDefaultShippingAddressClick which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.onDefaultShippingAddressClick();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action onDeleteAddress which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.onDeleteAddress();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action setDeleteModalMountState which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.setDeleteModalMountState();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action getUserInfo which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.getUserInfoAction();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action clearAddressBookNotification which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.clearAddressBookNotification();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
