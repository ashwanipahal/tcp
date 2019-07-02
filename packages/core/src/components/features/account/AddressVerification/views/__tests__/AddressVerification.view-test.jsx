import React from 'react';
import { shallow } from 'enzyme';
import { AddressVerification } from '../AddressVerification.view';
import CONSTANTS from '../../AddressVerification.constants';

describe('AddressVerification component', () => {
  it('should renders modal component if verification result is not valid', () => {
    const props = {
      heading: 'Add Address',
      userAddress: {
        firstName: 'test',
        lastName: 'test',
        addressLine: ['test line 1', 'test line 2', ''],
        city: 'test city',
        state: 'test state',
        zipCode: '11111'
      },
      suggestedAddress: {
        firstName: 'suggested firstName',
        lastName: 'suggested lastName',
        addressLine: ['test suggested','',  ''],
        city: 'test suggested city',
        state: 'test suggested state',
        zipCode: '11111'
      },
      verificationResult: {
        result: CONSTANTS.VERIFY_ADDRESS_RESULT.INVALID_ERROR,
        status: 'AE'
      }
    };
    const component = shallow(<AddressVerification {...props} />);
    expect(component).toMatchSnapshot();
  });
});
