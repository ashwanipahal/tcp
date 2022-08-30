import React from 'react';
import { List } from 'immutable';
import { shallow } from 'enzyme';
import { GiftCardListVanilla } from '../GiftCardList.view';

describe('GiftCardList Component', () => {
  it('should render correctly', () => {
    const props = {
      labels: {
        giftCardHeading: 'heading',
        paymentGC: {},
        common: {},
      },
      className: 'abc',
      giftCardList: List(),
    };
    const tree = shallow(<GiftCardListVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly if list is present', () => {
    const props = {
      labels: {
        giftCardHeading: 'heading',
        paymentGC: {},
        common: {},
      },
      className: 'abc',
      giftCardList: List([
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
    const tree = shallow(<GiftCardListVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
