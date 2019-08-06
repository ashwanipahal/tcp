import React from 'react';
import { List } from 'immutable';
import { shallow } from 'enzyme';
import { MoneyCardsVanilla } from '../views/MoneyCards.native';

describe('MoneyCards Component', () => {
  it('should render correctly', () => {
    const props = {
      labels: {
        creditCardHeading: 'heading',
        paymentGC: {},
        common: {},
      },
      className: 'abc',
      creditCardList: List(),
    };
    const tree = shallow(<MoneyCardsVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly if list is present', () => {
    const props = {
      labels: {
        creditCardHeading: 'heading',
        paymentGC: {},
        common: {},
      },
      className: 'abc',
      creditCardList: List([
        {
          accountNo: '************1111',
          billingAddressId: 160685,
          addressDetails: {
            addressLine1: '111 3rd Ave',
            addressLine2: '',
            city: 'New York',
            country: 'US',
            firstName: 'new',
            lastName: 'address',
            phone1: '9878909876',
            state: 'NY',
            zipCode: '10003',
          },
          ccBrand: 'Visa',
          ccType: 'COMPASSVISA',
          creditCardId: 73501,
          defaultInd: false,
          expMonth: '5 ',
          expYear: '2024',
          nameOnAccount: '.',
          properties: null,
        },
      ]),
    };
    const tree = shallow(<MoneyCardsVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
