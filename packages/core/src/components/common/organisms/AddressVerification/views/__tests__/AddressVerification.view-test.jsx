import React from 'react';
import { shallow } from 'enzyme';
import { AddressVerification } from '../AddressVerification.view';
import Modal from '../../../../molecules/Modal';
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
        verificationResult: '',
        labels: { verifyAddressLabels: {} },
        onSuccess: onSuccessSpy,
        resetVerifyAddressAction: resetVerifyAddressActionSpy,
      };
      component = shallow(<AddressVerification {...props} />);
      component.setProps({
        verificationResult: 'AE10',
      });
    });

    it('should render Modal component', () => {
      expect(component.is(Modal)).toBeTruthy();
    });

    it('should show both user address and suggested address', () => {
      expect(component.find(AddressOption)).toHaveLength(2);
    });
  });

  describe('for address with apartment missing', () => {
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
        verificationResult: '',
        labels: { verifyAddressLabels: {} },
        onSuccess: onSuccessSpy,
        resetVerifyAddressAction: resetVerifyAddressActionSpy,
      };
      component = shallow(<AddressVerification {...props} />);
      component.setProps({
        verificationResult: 'AE09',
      });
    });

    it('should render Modal', () => {
      expect(component.is(Modal)).toBeTruthy();
    });

    it('should show user address', () => {
      expect(component.find(AddressOption)).toHaveLength(1);
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
        verificationResult: '',
        labels: { verifyAddressLabels: {} },
        onSuccess: onSuccessSpy,
        resetVerifyAddressAction: resetVerifyAddressActionSpy,
      };
      component = shallow(<AddressVerification {...props} />);
      component.setProps({
        verificationResult: 'AE',
      });
    });

    it('should render Modal', () => {
      expect(component.is(Modal)).toBeTruthy();
    });

    it('should show only user address', () => {
      expect(component.find(AddressOption)).toHaveLength(1);
    });

    it('should not show input radio', () => {
      expect(component.instance().showInput).toEqual(false);
    });
  });
});
