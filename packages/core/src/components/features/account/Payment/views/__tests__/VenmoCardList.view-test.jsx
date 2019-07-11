import React from 'react';
import { List } from 'immutable';
import { shallow } from 'enzyme';
import { VenmoCardListVanilla } from '../VenmoCardList.view';

describe('VenmoCardList Component', () => {
  it('should render correctly', () => {
    const props = {
      labels: {
        giftCardHeading: 'heading',
      },
      className: 'abc',
      venmoCardList: List(),
    };
    const tree = shallow(<VenmoCardListVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly if list is present', () => {
    const props = {
      labels: {
        VenmoCardHeading: 'heading',
      },
      className: 'abc',
      venmoCardList: List([
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
          ccBrand: 'VENMO',
          ccType: 'VENMO',
          creditCardId: 73501,
          defaultInd: false,
          expMonth: '5 ',
          expYear: '2024',
          nameOnAccount: '.',
          properties: {
            venmoUserId: '1234',
          },
        },
      ]),
    };
    const tree = shallow(<VenmoCardListVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
