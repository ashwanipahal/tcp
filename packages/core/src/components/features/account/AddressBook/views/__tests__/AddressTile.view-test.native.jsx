import React from 'react';
import { shallow } from 'enzyme';
import { AddressBookTileVanilla } from '../AddressTile.view.native';

const address = {
  firstName: 'test',
  lastName: 'test',
  addressLine: ['addressline 1', 'addressline 2'],
  city: 'test city',
  country: 'test country',
  phone1: '1234567890',
  primary: 'true',
};

const labels = {
  addressBook: {},
  common: {},
};

describe('AddressTile component', () => {
  it('should renders correctly', () => {
    const props = {
      address,
      labels,
    };
    const component = shallow(<AddressBookTileVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
