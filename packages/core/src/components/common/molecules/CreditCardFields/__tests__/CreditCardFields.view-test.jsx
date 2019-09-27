import React from 'react';
import { shallow } from 'enzyme';
import {
  CreditCardFieldsVanilla,
  handleEditCreditCardNumber,
} from '../views/CreditCardFields.view';

describe('CreditCardFields component', () => {
  it('should renders correctly when isExpirationRequired is true', () => {
    const props = {
      isExpirationRequired: true,
      creditFieldLabels: {
        creditCardNumber: '',
        expMonth: '',
        expYear: '',
        cvvCode: '',
      },
      cardNumbProps: {
        colSize: {
          small: 6,
          medium: 8,
          large: 6,
        },
      },
      expMonthProps: {
        colSize: {
          small: 2,
          medium: 3,
          large: 2,
        },
      },
      expYearProps: {
        colSize: {
          small: 2,
          medium: 3,
          large: 2,
        },
      },
      cvvProps: {
        colSize: {
          small: 2,
          medium: 2,
          large: 2,
        },
      },
      cardNumberInnerProps: {
        colSize: {
          small: 6,
          medium: 4,
          large: 12,
        },
      },
    };
    const component = shallow(<CreditCardFieldsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when isExpirationRequired is false', () => {
    const props = {
      isExpirationRequired: false,
      creditFieldLabels: {
        creditCardNumber: '',
        expMonth: '',
        expYear: '',
        cvvCode: '',
      },
    };
    const component = shallow(<CreditCardFieldsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when cardNumberWrapper is true', () => {
    const props = {
      isExpirationRequired: false,
      creditFieldLabels: {
        creditCardNumber: '',
        expMonth: '',
        expYear: '',
        cvvCode: '',
      },
      cardNumberWrapper: true,
    };
    const component = shallow(<CreditCardFieldsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should empty credit card number which starts with "*" field while editing', () => {
    const inputValue = '**************6789';
    const outputValue = '';
    expect(handleEditCreditCardNumber(inputValue)).toStrictEqual(outputValue);
  });

  it('should NOT empty credit card number which starts with "*" field while editing', () => {
    const inputValue = '123456789123456';
    const outputValue = '123456789123456';
    expect(handleEditCreditCardNumber(inputValue)).toStrictEqual(outputValue);
  });
});
