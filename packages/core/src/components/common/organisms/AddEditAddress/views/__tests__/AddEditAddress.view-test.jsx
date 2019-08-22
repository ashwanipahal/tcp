import React from 'react';
import { shallow } from 'enzyme';
import { fromJS, List } from 'immutable';
import { AddEditAddress } from '../AddEditAddress.view';

const userEmail = 'test@abc.com';
describe('AddressBook component', () => {
  it('should renders correctly without any error', () => {
    const props = {
      submitAddAddressFormAction: () => {},
      userEmail,
      addressList: List(),
      addressFormLabels: {},
      verifyAddressLabels: {},
    };
    const component = shallow(<AddEditAddress {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when errors are present', () => {
    const props = {
      submitAddAddressFormAction: () => {},
      userEmail,
      addAddressResponse: fromJS({ errors: [{ errorKey: 'error' }] }),
      addressList: List(),
      addressFormLabels: {},
      verifyAddressLabels: {},
    };
    const component = shallow(<AddEditAddress {...props} />);
    expect(component).toMatchSnapshot();
  });
});
