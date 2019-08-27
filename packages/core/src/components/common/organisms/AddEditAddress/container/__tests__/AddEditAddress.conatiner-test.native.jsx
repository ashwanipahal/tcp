import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { AddEditAddressContainer, mapDispatchToProps } from '../AddEditAddress.container.native';

const address = {
  firstName: 'test',
  lastName: 'test',
  addressLine: ['test 1', 'test 2'],
  city: 'city',
  state: 'state',
  zipCode: '12345',
  country: 'US',
  phone1: '1234567890',
  primary: 'true',
  nickName: '123',
};

const initialValue = {
  addressLine2: 'foo',
  primary: false,
  country: 'US',
};
const formPayload = {
  firstName: 'test',
  lastName: 'test',
  addressLine1: 'test 1',
  addressLine2: 'test 2',
  city: 'city',
  state: 'state',
  zipCode: '12345',
  country: 'US',
  phoneNumber: '1234567890',
  primary: true,
};
const labels = {
  addressFormLabels: {},
};

describe('AddEditAddressContainer', () => {
  it('should render correctly', () => {
    const component = shallow(
      <AddEditAddressContainer
        submitAddAddressFormAction={() => {}}
        addressList={List()}
        labels={labels}
        address={address}
      />
    );
    expect(component).toMatchSnapshot();
  });

  describe('should render AddEditAddress component', () => {
    it('with isMakeDefaultDisabled as true if there is no address present', () => {
      const component = shallow(
        <AddEditAddressContainer
          submitAddAddressFormAction={() => {}}
          addressList={List([{}])}
          labels={labels}
          address={address}
        />
      );
      expect(component.prop('isMakeDefaultDisabled')).toBeTruthy();
    });

    it('with isMakeDefaultDisabled as false if addresses are present', () => {
      const component = shallow(
        <AddEditAddressContainer
          submitAddAddressFormAction={() => {}}
          addressList={List([])}
          labels={labels}
          address={address}
        />
      );
      expect(component.prop('isMakeDefaultDisabled')).toBeFalsy();
    });

    it('with isMakeDefaultDisabled as true if in edit mode only one address is present', () => {
      const component = shallow(
        <AddEditAddressContainer
          submitAddAddressFormAction={() => {}}
          address={address}
          addressList={List([{}])}
          labels={labels}
        />
      );
      expect(component.prop('isMakeDefaultDisabled')).toBeTruthy();
    });

    it('with initialValues in edit address mode', () => {
      const addressList = List([address]);
      const component = shallow(
        <AddEditAddressContainer
          submitAddAddressFormAction={() => {}}
          address={address}
          addressList={addressList}
          labels={labels}
        />
      );
      expect(component.prop('initialValues')).toStrictEqual(
        component.instance().getInitialValues(addressList, address)
      );
    });

    it('with initialValues in add new address mode', () => {
      const addressList = List([initialValue]);
      const component = shallow(
        <AddEditAddressContainer
          submitAddAddressFormAction={() => {}}
          addressList={addressList}
          address={null}
          labels={labels}
        />
      );
      expect(component.prop('initialValues')).toStrictEqual(
        component.instance().getInitialValues(addressList)
      );
    });
  });

  describe('instances', () => {
    let instance;
    let verifyAddressSpy;
    let submitEditAddressFormActionSpy;
    let submitNewAddressFormActionSpy;
    beforeEach(() => {
      verifyAddressSpy = jest.fn();
      submitEditAddressFormActionSpy = jest.fn();
      submitNewAddressFormActionSpy = jest.fn();
      const component = shallow(
        <AddEditAddressContainer
          submitEditAddressFormAction={submitEditAddressFormActionSpy}
          submitNewAddressFormAction={submitNewAddressFormActionSpy}
          verifyAddressAction={verifyAddressSpy}
          addressList={List()}
          address={address}
          labels={labels}
        />
      );
      instance = component.instance();
    });
    it('#verifyAddress should call verifyAddressAction prop', () => {
      instance.verifyAddress(formPayload);
      expect(verifyAddressSpy).toBeCalled();
    });
    it('#submitAddressForm should call submitNewAddressFormAction prop in add new address mode', () => {
      const wrapper = shallow(
        <AddEditAddressContainer
          submitEditAddressFormAction={submitEditAddressFormActionSpy}
          submitNewAddressFormAction={submitNewAddressFormActionSpy}
          verifyAddressAction={verifyAddressSpy}
          addressList={List()}
          address={null}
          labels={labels}
        />
      );
      const componentInstance = wrapper.instance();

      componentInstance.submitAddressForm(address);
      expect(submitNewAddressFormActionSpy).toBeCalled();
    });
    it('#submitAddressForm should call submitEditAddressFormAction prop in edit mode', () => {
      instance.submitAddressForm(address);
      expect(submitEditAddressFormActionSpy).toBeCalled();
    });
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action submitNewAddressFormAction which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.submitNewAddressFormAction();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action submitEditAddressFormAction which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.submitEditAddressFormAction();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action verifyAddressAction which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.verifyAddressAction();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action getAddressListAction which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.getAddressListAction();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action resetFormState which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.resetFormState();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
