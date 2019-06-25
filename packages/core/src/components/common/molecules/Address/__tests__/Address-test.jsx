import React from 'react';
import { shallow } from 'enzyme';
import Address from '../views/Address';

describe('Address component', () => {
  it('should renders correctly', () => {
    const props = {
      className: 'sample-class',
      address: {
        firstName: 'test',
        lastName: 'test',
        addressLine: ['addressline 1', 'addressline 2'],
        city: 'test city',
        country: 'test country',
        phone1: '1234567890',
        zipCode: '111-111',
      },
    };
    const component = shallow(<Address {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when optional fields are not present', () => {
    const props = {
      className: 'sample-class',
      address: {
        firstName: 'test',
        lastName: 'test',
        addressLine: ['addressline 1', 'addressline 2'],
      },
    };
    const component = shallow(<Address {...props} />);
    expect(component).toMatchSnapshot();
  });
});
