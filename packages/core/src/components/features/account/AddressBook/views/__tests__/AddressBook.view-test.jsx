import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import AddressBook from '../AddressView/views/Address.view';

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
});
