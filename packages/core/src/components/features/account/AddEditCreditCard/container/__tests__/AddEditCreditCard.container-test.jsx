import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { AddEditCreditCard } from '../AddEditCreditCard.container';

describe('AddEditCreditCardContainer', () => {
  let getAddressListActionSpy;
  let addCreditCardActionSpy;
  let editCreditCardActionSpy;
  let showSuccessNotificationSpy;

  beforeEach(() => {
    getAddressListActionSpy = jest.fn();
    addCreditCardActionSpy = jest.fn();
    editCreditCardActionSpy = jest.fn();
    showSuccessNotificationSpy = jest.fn();
  });

  it('should render null if addressList is not defined', () => {
    const props = {
      getAddressListAction: getAddressListActionSpy,
      addCreditCardAction: addCreditCardActionSpy,
      editCreditCardAction: editCreditCardActionSpy,
      showSuccessNotification: showSuccessNotificationSpy,
      addressList: null,
    };

    const component = shallow(<AddEditCreditCard {...props} />);
    expect(component.isEmptyRender()).toBeTruthy();
  });

  it('should render AddEditCreditCardComponent with default InitialValues in new mode', () => {
    const props = {
      getAddressListAction: getAddressListActionSpy,
      addCreditCardAction: addCreditCardActionSpy,
      editCreditCardAction: editCreditCardActionSpy,
      showSuccessNotification: showSuccessNotificationSpy,
      addressList: List([
        {
          addressId: '12345',
          primary: 'true',
        },
      ]),
    };

    const component = shallow(<AddEditCreditCard {...props} />);

    const initialValuesProp = component.prop('initialValues');
    expect(initialValuesProp.onFileAddressKey).toEqual('12345');
  });

  it('should render AddEditCreditCardComponent with default InitialValues in edit mode', () => {
    const props = {
      getAddressListAction: getAddressListActionSpy,
      addCreditCardAction: addCreditCardActionSpy,
      editCreditCardAction: editCreditCardActionSpy,
      showSuccessNotification: showSuccessNotificationSpy,
      addressList: List([
        {
          addressId: '12345',
          primary: 'true',
        },
      ]),
      creditCard: {
        billingAddressId: 11111,
        ccBrand: 'visa',
        expYear: '20',
        expMonth: '6',
      },
    };

    const component = shallow(<AddEditCreditCard {...props} />);

    const initialValuesProp = component.prop('initialValues');
    expect(initialValuesProp.onFileAddressKey).toEqual('11111');
  });

  it('onCreditCardFormSubmit should call addCreditCardAction with payload if creditCard is not passed', () => {
    const props = {
      getAddressListAction: getAddressListActionSpy,
      addCreditCardAction: addCreditCardActionSpy,
      editCreditCardAction: editCreditCardActionSpy,
      showSuccessNotification: showSuccessNotificationSpy,
      addressList: List([
        {
          addressId: '12345',
          primary: 'true',
        },
      ]),
    };

    const component = shallow(<AddEditCreditCard {...props} />);

    component.instance().onCreditCardFormSubmit({});
    expect(addCreditCardActionSpy.mock.calls).toHaveLength(1);
  });

  it('onCreditCardFormSubmit should call editCreditCardAction with payload if creditCard is present', () => {
    const props = {
      getAddressListAction: getAddressListActionSpy,
      addCreditCardAction: addCreditCardActionSpy,
      editCreditCardAction: editCreditCardActionSpy,
      showSuccessNotification: showSuccessNotificationSpy,
      addressList: List([
        {
          addressId: '12345',
          primary: 'true',
        },
      ]),
    };

    const component = shallow(<AddEditCreditCard {...props} />);

    component.setProps({
      creditCard: {
        billingAddressId: 11111,
        ccBrand: 'visa',
        expYear: '20',
        expMonth: '6',
        creditCardId: '12345',
      },
    });

    component.instance().onCreditCardFormSubmit({});
    expect(editCreditCardActionSpy.mock.calls).toHaveLength(1);
  });
});
