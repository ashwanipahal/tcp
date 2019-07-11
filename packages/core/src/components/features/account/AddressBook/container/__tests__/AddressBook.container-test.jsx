import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { AddressBookContainer, mapDispatchToProps } from '../AddressBook.container';
import AddressBookComponent from '../../views/AddressBook.view';

describe('AddressList container', () => {
  it('should render nothing if addressList prop is not defined', () => {
    const component = shallow(
      <AddressBookContainer getAddressListAction={() => {}} getUserInfoAction={() => {}} />
    );
    expect(component.isEmptyRender()).toBeTruthy();
  });
  it('should render loader', () => {
    const component = shallow(
      <AddressBookContainer
        isFetching
        getAddressListAction={() => {}}
        getUserInfoAction={() => {}}
      />
    );
    expect(component.find('p').text()).toBe('Loading...');
  });

  it('should render AddressBookComponent if addressList prop is of List type', () => {
    const addressList = List();
    const component = shallow(
      <AddressBookContainer
        addressList={addressList}
        getAddressListAction={() => {}}
        getUserInfoAction={() => {}}
      />
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
  });
});
