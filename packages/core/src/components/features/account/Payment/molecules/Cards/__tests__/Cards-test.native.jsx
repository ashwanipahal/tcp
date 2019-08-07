import React from 'react';
import { List } from 'immutable';
import { shallow } from 'enzyme';
import { CardsVanilla } from '../views/Cards.native';

describe('CardList Component', () => {
  it('should render correctly', () => {
    const props = {
      labels: {
        paymentGC: {},
        common: {},
      },
      className: 'abc',
      cardList: List(),
      heading: '',
      cardImage: '',
      emptyLabel: '',
      description: '',
      emptyBtnLabel: '',
      addBtnLabel: '',
      setDefaultPaymentMethod: jest.fn(),
    };
    const tree = shallow(<CardsVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly if list is present', () => {
    const props = {
      labels: {
        paymentGC: {},
        common: {},
      },
      className: 'abc',
      cardList: List([
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
      heading: '',
      cardImage: '',
      emptyLabel: '',
      description: '',
      emptyBtnLabel: '',
      addBtnLabel: '',
      setDefaultPaymentMethod: jest.fn(),
    };
    const tree = shallow(<CardsVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
