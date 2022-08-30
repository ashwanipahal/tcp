import React from 'react';
import { shallow } from 'enzyme';
import { Address } from '../views/Address';

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
        state: 'test state',
      },
    };
    const component = shallow(<Address {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when optional fields are not present', () => {
    const props = {
      className: 'test-class',
      address: {
        firstName: 'test',
        lastName: 'test',
        addressLine: ['addressline 1', 'addressline 2'],
        city: 'test city',
        state: 'state',
        zipCode: '111-111',
      },
    };
    const component = shallow(<Address {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when different addressLine are coming', () => {
    const props = {
      className: 'sample-class',
      address: {
        firstName: 'test',
        lastName: 'test',
        addressLine1: 'test addressline 1',
        addressLine2: 'test addressline 2',
        city: 'test city',
        state: 'state',
        zipCode: '111-111',
      },
      dataLocatorPrefix: 'test',
    };
    const component = shallow(<Address {...props} />);
    expect(component).toMatchSnapshot();
  });
});
