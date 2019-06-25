import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import AddressList from '../AddressList.view';
import AddressTile from '../AddressTile.view';

const addresses = [
  {
    firstName: 'test',
    lastName: 'test',
    addressLine: ['addressline 1', 'addressline 2'],
    city: 'test city',
    country: 'test country',
    phone1: '1234567890',
  },
  {
    firstName: 'test1',
    lastName: 'test1',
    addressLine: ['addressline 1', 'addressline 2'],
    city: 'test city',
    country: 'test country',
    phone1: '1234567890',
  },
];

describe('AddressList component', () => {
  it('should renders correctly', () => {
    const props = {
      addresses: new List(addresses),
      labels: {},
    };
    const component = shallow(<AddressList {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders AddressList when addresses are present', () => {
    const props = {
      addresses: new List(addresses),
      labels: {},
    };
    const component = shallow(<AddressList {...props} />);
    expect(component.find(AddressTile)).toHaveLength(addresses.length);
  });
});
