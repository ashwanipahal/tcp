import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { AddAddress } from '../AddAddress.view';

const userEmail = 'test@abc.com';
describe('AddressBook component', () => {
  it('should renders correctly without any error', () => {
    const props = {
      submitAddAddressFormAction: () => {},
      userEmail,
    };
    const component = shallow(<AddAddress {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when errors are present', () => {
    const props = {
      submitAddAddressFormAction: () => {},
      userEmail,
      addAddressResponse: fromJS({ errors: [{ errorKey: 'error' }] }),
    };
    const component = shallow(<AddAddress {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('submitAddAddressForm should call submitAddAddressFormAction with correct payload', () => {
    const props = {
      submitAddAddressFormAction: jest.fn(),
      userEmail,
    };
    const payload = {
      firstName: 'test',
    };
    const component = shallow(<AddAddress {...props} />);
    component.instance().submitAddAddressForm(payload);
    expect(props.submitAddAddressFormAction).toBeCalledWith({
      ...payload,
      ...{ email: userEmail },
    });
  });
});
