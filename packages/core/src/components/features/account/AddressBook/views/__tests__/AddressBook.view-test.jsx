import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { AddressBook } from '../AddressBook.view';
import EmptyAddressListComponent from '../EmptyAddressList.view';
import AddressListComponent from '../AddressList.view';

describe('AddressBook component', () => {
  it('should renders correctly when addresses are not present', () => {
    const props = {
      addresses: new List(),
      labels: {},
    };
    const component = shallow(<AddressBook {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when addresses are present', () => {
    const props = {
      addresses: new List([
        {
          firstName: 'test',
          lastName: 'test',
          addressLine: ['addressline 1', 'addressline 2'],
          city: 'test city',
          country: 'test country',
          phone1: '1234567890',
        },
      ]),
      labels: {},
    };
    const component = shallow(<AddressBook {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders EmptyAddressList when addresses are not present', () => {
    const props = {
      addresses: new List(),
      labels: {},
    };
    const component = shallow(<AddressBook {...props} />);
    expect(component.find(EmptyAddressListComponent)).toHaveLength(1);
  });
  it('should renders AddressList when addresses are present', () => {
    const props = {
      addresses: new List([
        {
          firstName: 'test',
          lastName: 'test',
          addressLine: ['addressline 1', 'addressline 2'],
          city: 'test city',
          country: 'test country',
          phone1: '1234567890',
        },
      ]),
      labels: {},
    };
    const component = shallow(<AddressBook {...props} />);
    expect(component.find(AddressListComponent)).toHaveLength(1);
  });
});
