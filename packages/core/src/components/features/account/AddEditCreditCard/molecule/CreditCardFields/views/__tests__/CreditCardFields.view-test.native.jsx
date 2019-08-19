import React from 'react';
import { shallow } from 'enzyme';
import { CreditCardFields } from '../CreditCardFields.view.native';
import { getCreditCardExpirationOptionMap } from '../../../../container/AddEditCreditCard.utils';

describe('CreditCardFields component', () => {
  it('should render correctly', () => {
    const props = {
      isExpirationRequired: false,
      labels: {
        paymentGC: {},
        common: {},
      },
      expMonthOptionsMap: getCreditCardExpirationOptionMap().monthsMap,
      expYearOptionsMap: getCreditCardExpirationOptionMap().yearsMap,
    };
    const component = shallow(<CreditCardFields {...props} />);
    expect(component).toMatchSnapshot();
  });
});
