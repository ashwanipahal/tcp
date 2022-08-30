import React from 'react';
import { List } from 'immutable';
import { shallow } from 'enzyme';
import { VenmoCardsVanilla } from '../views/VenmoCards.native';

describe('VenmoCardList Component', () => {
  it('should render correctly', () => {
    const props = {
      labels: {
        paymentGC: {},
        common: {},
      },
      className: 'abc',
      venmoCardList: List(),
    };
    const tree = shallow(<VenmoCardsVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly if list is present', () => {
    const props = {
      labels: {
        paymentGC: {},
        common: {},
      },
      className: 'abc',
      venmoCardList: List([
        {
          accountNo: '',
          billingAddressId: null,
          addressDetails: null,
          ccBrand: 'VENMO',
          ccType: 'VENMO',
          creditCardId: 74530,
          defaultInd: false,
          expMonth: '11',
          expYear: '2037',
          nameOnAccount: '.',
          properties: {
            venmoUserId: 'Testaccount1',
          },
        },
      ]),
    };
    const tree = shallow(<VenmoCardsVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
