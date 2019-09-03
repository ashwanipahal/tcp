import React from 'react';
import { shallow } from 'enzyme';
import Address from '../views/Address.native';

let props;

describe('Address component', () => {
  beforeEach(() => {
    props = {
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
  });
  it('should renders correctly', () => {
    const component = shallow(<Address {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when optional fields are not present', () => {
    props.address.addressLine = null;
    props.address.addressLine1 = 'addressLine1';
    props.address.addressLine2 = 'addressLine2';
    const component = shallow(<Address {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when address Line 1 and 2 are not present', () => {
    props.address.addressLine = null;
    props.address.addressLine1 = null;
    props.address.addressLine2 = null;
    const component = shallow(<Address {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when city is not present', () => {
    props.address.city = null;
    const component = shallow(<Address {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when city & state are not present', () => {
    props.address.city = null;
    props.address.state = null;
    const component = shallow(<Address {...props} showName />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when showName is switched off', () => {
    const component = shallow(<Address {...props} showName={false} />);
    expect(component).toMatchSnapshot();
  });
});
