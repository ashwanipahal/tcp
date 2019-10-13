import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { getCreditCardExpirationOptionMap } from '@tcp/core/src/components/features/account/AddEditCreditCard/container/AddEditCreditCard.utils';
import { CreditCardForm } from '../CreditCardForm.view.native';

describe('CreditCardForm component', () => {
  it('should renders correctly with address dropdown', () => {
    const props = {
      labels: {
        paymentGC: {},
        common: {},
      },
      addressLabels: {},
      addressList: List([
        {
          addressId: '12345',
          firstName: 'test',
          lastName: 'test',
          primary: 'true',
        },
      ]),
      onFileAddressKey: '12345',
      initialValues: {},
      expMonthOptionsMap: getCreditCardExpirationOptionMap().monthsMap,
      expYearOptionsMap: getCreditCardExpirationOptionMap().yearsMap,
      handleSubmit: jest.fn(),
      dispatch: jest.fn(),
    };
    const component = shallow(<CreditCardForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with addressForm', () => {
    const props = {
      labels: {
        paymentGC: {},
        common: {},
      },
      addressLabels: {},
      addressList: List([
        {
          addressId: '12345',
          firstName: 'test',
          lastName: 'test',
          primary: 'true',
        },
      ]),
      pristine: true,
      initialValues: {},
      expMonthOptionsMap: getCreditCardExpirationOptionMap().monthsMap,
      expYearOptionsMap: getCreditCardExpirationOptionMap().yearsMap,
      handleSubmit: jest.fn(),
      dispatch: jest.fn(),
    };
    const component = shallow(<CreditCardForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly in mailingAddress view', () => {
    const props = {
      labels: {
        paymentGC: {},
        common: {},
      },
      addressLabels: {},
      addressList: List([
        {
          addressId: '12345',
          firstName: 'test',
          lastName: 'test',
          primary: 'true',
        },
      ]),
      pristine: true,
      initialValues: {},
      mailingAddress: true,
      expMonthOptionsMap: getCreditCardExpirationOptionMap().monthsMap,
      expYearOptionsMap: getCreditCardExpirationOptionMap().yearsMap,
      handleSubmit: jest.fn(),
      dispatch: jest.fn(),
    };
    const component = shallow(<CreditCardForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  describe('#instances', () => {
    let component;
    let dispatchSpy;
    beforeEach(() => {
      dispatchSpy = jest.fn();
      const props = {
        labels: {
          paymentGC: {},
          common: {},
          addressBook: {},
        },
        addressLabels: {},
        addressList: List([
          {
            addressId: '12345',
            firstName: 'test',
            lastName: 'test',
            primary: 'true',
          },
          {
            addressId: '54321',
            firstName: 'test',
            lastName: 'test',
          },
        ]),
        pristine: true,
        initialValues: {},
        mailingAddress: true,
        expMonthOptionsMap: getCreditCardExpirationOptionMap().monthsMap,
        expYearOptionsMap: getCreditCardExpirationOptionMap().yearsMap,
        handleSubmit: jest.fn(),
        dispatch: dispatchSpy,
      };
      component = shallow(<CreditCardForm {...props} />);
    });

    it('#showAddressDropdown should return true if mailingAddress and addressList contain more than 1 address', () => {
      expect(component.instance().showAddressDropdown([{}, {}])).toBeTruthy();
    });

    it('#showAddressDropdown should return false if mailingAddress is false and addressList is not present', () => {
      expect(component.instance().showAddressDropdown(false)).toBeFalsy();
    });

    it('#toggleModal should toggle showAddressForm to false if mailingAddress is present', () => {
      component.instance().toggleModal();
      expect(component.state('showAddressForm')).toBeFalsy();
    });
  });
});
