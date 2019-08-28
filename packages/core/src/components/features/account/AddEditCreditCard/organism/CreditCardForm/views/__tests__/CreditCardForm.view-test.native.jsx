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
      onFileAddresskey: '12345',
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
});
