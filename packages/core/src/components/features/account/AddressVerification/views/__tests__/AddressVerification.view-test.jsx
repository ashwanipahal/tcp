import React from 'react';
import { shallow } from 'enzyme';
import { AddressVerification } from '../AddressVerification.view';

describe('AddressVerification component', () => {
  describe('for valid address', () => {
    let component;
    let onSuccessSpy;
    let resetVerifyAddressActionSpy;
    const userAddress = {
      firstName: 'test',
      lastName: 'test',
      addressLine: ['test line 1', 'test line 2', ''],
      city: 'test city',
      state: 'test state',
      zipCode: '11111',
    };

    beforeEach(() => {
      onSuccessSpy = jest.fn();
      resetVerifyAddressActionSpy = jest.fn();
      const props = {
        heading: 'Add Address',
        userAddress,
        suggestedAddress: userAddress,
        verificationResult: '',
        labels: {},
        onSuccess: onSuccessSpy,
        resetVerifyAddressAction: resetVerifyAddressActionSpy,
      };
      component = shallow(<AddressVerification {...props} />);
      component.setProps({
        verificationResult: 'AS01',
      });
    });

    it('should not render anything', () => {
      expect(component.isEmptyRender()).toBeTruthy();
    });

    it('should call onSuccess prop with user address', () => {
      expect(onSuccessSpy.mock.calls[0][0]).toEqual(userAddress);
    });

    it('should call resetVerifyAddressAction props', () => {
      expect(resetVerifyAddressActionSpy).toBeCalled();
    });
  });
});
