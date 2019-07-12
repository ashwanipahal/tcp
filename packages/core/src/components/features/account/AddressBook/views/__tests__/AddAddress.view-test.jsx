import React from 'react';
import { shallow } from 'enzyme';
import { fromJS, List } from 'immutable';
import { AddAddress } from '../AddAddress.view';

const userEmail = 'test@abc.com';
describe('AddressBook component', () => {
  it('should renders correctly without any error', () => {
    const props = {
      submitAddAddressFormAction: () => {},
      userEmail,
      addressList: List(),
    };
    const component = shallow(<AddAddress {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when errors are present', () => {
    const props = {
      submitAddAddressFormAction: () => {},
      userEmail,
      addAddressResponse: fromJS({ errors: [{ errorKey: 'error' }] }),
      addressList: List(),
    };
    const component = shallow(<AddAddress {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('submitAddAddressForm should call submitAddAddressFormAction with correct payload', () => {
    const props = {
      submitAddAddressFormAction: jest.fn(),
      userEmail,
      addressList: List(),
    };
    const payload = {
      firstName: 'test',
      addressLine1: 'test',
      addressLine2: '',
      zipCode: '12345',
      primary: true,
    };
    const component = shallow(<AddAddress {...props} />);
    component.instance().submitAddAddressForm(component.instance().formatPayload(payload));
    expect(props.submitAddAddressFormAction).toBeCalledWith({
      firstName: 'test',
      email: userEmail,
      address1: payload.addressLine1,
      address2: payload.addressLine2,
      zip: payload.zipCode,
      primary: 'true',
    });
  });
});
