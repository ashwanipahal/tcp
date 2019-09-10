import React from 'react';
import { shallow } from 'enzyme';
import { AddressVerificationVanilla } from '../AddressVerification.view.native';
import AddressOption from '../../../../molecules/AddressOption';

const userAddress = {
  firstName: 'test',
  lastName: 'test',
  address1: 'test line 1',
  address2: '',
  city: 'test city',
  state: 'test state',
  zip: '11111',
};

const suggestedAddress = Object.assign({}, userAddress, {
  address1: 'suggested line 1',
  isCommercialAddress: false,
});

const heading = 'Add Address';

describe('AddressVerification component', () => {
  describe('for valid address', () => {
    let component;
    let onSuccessSpy;
    let resetVerifyAddressActionSpy;
    beforeEach(() => {
      onSuccessSpy = jest.fn();
      resetVerifyAddressActionSpy = jest.fn();
      const props = {
        heading,
        userAddress,
        suggestedAddress: userAddress,
        verificationResult: '',
        labels: { verifyAddressLabels: {} },
        onSuccess: onSuccessSpy,
        resetVerifyAddressAction: resetVerifyAddressActionSpy,
      };
      component = shallow(<AddressVerificationVanilla {...props} />);
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
  });

  describe('for invalid address', () => {
    let component;
    let onSuccessSpy;
    let resetVerifyAddressActionSpy;

    beforeEach(() => {
      onSuccessSpy = jest.fn();
      resetVerifyAddressActionSpy = jest.fn();
      const props = {
        heading,
        userAddress,
        suggestedAddress,
        verificationResult: 'AE',
        labels: { verifyAddressLabels: {} },
        onSuccess: onSuccessSpy,
        resetVerifyAddressAction: resetVerifyAddressActionSpy,
      };
      component = shallow(<AddressVerificationVanilla {...props} />);
      component.setProps({
        verificationResult: 'AE10',
      });
    });

    it('should show both user address and suggested address', () => {
      expect(component.find(AddressOption)).toHaveLength(2);
    });
  });

  describe('for invalid address with no suggestion', () => {
    let component;
    let onSuccessSpy;
    let resetVerifyAddressActionSpy;

    beforeEach(() => {
      onSuccessSpy = jest.fn();
      resetVerifyAddressActionSpy = jest.fn();
      const props = {
        heading,
        userAddress,
        verificationResult: 'AE',
        labels: { verifyAddressLabels: {} },
        onSuccess: onSuccessSpy,
        resetVerifyAddressAction: resetVerifyAddressActionSpy,
      };
      component = shallow(<AddressVerificationVanilla {...props} />);
      component.setProps({
        verificationResult: 'AE10',
      });
    });

    it('should show only user address', () => {
      expect(component.find(AddressOption)).toHaveLength(2);
    });

    it('should show input radio', () => {
      expect(component.instance().showInput).toEqual(true);
    });
  });

  describe('#instances', () => {
    let component;
    let toggleAddressModalSpy;
    let resetVerifyAddressActionSpy;

    beforeEach(() => {
      toggleAddressModalSpy = jest.fn();
      resetVerifyAddressActionSpy = jest.fn();
      const props = {
        heading,
        userAddress,
        suggestedAddress: userAddress,
        verificationResult: '',
        labels: { verifyAddressLabels: {} },
        toggleAddressModal: toggleAddressModalSpy,
        resetVerifyAddressAction: resetVerifyAddressActionSpy,
      };
      component = shallow(<AddressVerificationVanilla {...props} />);
    });

    it('#onClose should call toggleAddressModal if prop is present', () => {
      component.instance().onClose();
      expect(toggleAddressModalSpy).toBeCalled();
    });

    it('#onClose should call resetVerifyAddressAction if toggleAddressModal prop is not present', () => {
      component.setProps({
        toggleAddressModal: false,
      });
      component.instance().onClose();
      expect(resetVerifyAddressActionSpy).toBeCalled();
    });

    it('#handleUserAddress should set selectAddress to userAddress', () => {
      component.instance().handleUserAddress();
      expect(component.state('selectAddress')).toBe('userAddress');
    });

    it('#handleSuggestAddress should set selectAddress to suggestedAddress', () => {
      component.instance().handleSuggestAddress();
      expect(component.state('selectAddress')).toBe('suggestedAddress');
    });
  });
});
