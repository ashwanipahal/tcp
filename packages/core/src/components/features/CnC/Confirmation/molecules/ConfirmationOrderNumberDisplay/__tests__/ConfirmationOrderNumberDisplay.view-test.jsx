import React from 'react';
import { shallow } from 'enzyme';
import { ConfirmationOrderNumberDisplayVanilla } from '../views/ConfirmationOrderNumberDisplay.view';
import { getDateInformation } from '../../../../../../../utils';

jest.mock('../../../../../../../utils', () => ({
  getDateInformation: jest.fn(),
}));

describe('ConfirmationOrderNumberDisplayVanilla', () => {
  it('should render correctly', () => {
    getDateInformation.mockImplementation(() => '');
    const props = {
      center: {
        storeName: 'union',
        storeLink: { asPath: '/', to: '/' },
        address: {
          addressLine1: '1123 ab',
          addressLine2: 'adf',
          city: 'AC',
          state: 'AD',
          zipCode: '10001',
        },
        shippingFullname: 'name',
        todayOpenRange: '',
        tomorrowOpenRange: '',
        phoneNumber: 23456789023,
        orderType: 'BOSS',
        orderDate: {
          toLocaleDateString: jest.fn(),
        },
        bossMaxDate: 12,
        bossMinDate: 23,
        orderTotal: 23.34,
      },
      labels: {},
    };
    const tree = shallow(<ConfirmationOrderNumberDisplayVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with BOPIS', () => {
    const props = {
      center: {
        storeName: 'union',
        storeLink: { asPath: '/', to: '/' },
        address: {
          addressLine1: '1123 ab',
          addressLine2: 'adf',
          city: 'AC',
          state: 'AD',
          zipCode: '10001',
        },
        shippingFullname: 'name',
        todayOpenRange: '',
        tomorrowOpenRange: '',
        phoneNumber: 23456789023,
        orderType: 'BOPIS',
        orderDate: {
          toLocaleDateString: jest.fn(),
        },
        productsCount: 2,
        orderTotal: 23,
        bossMaxDate: '',
        bossMinDate: '',
      },
      labels: {},
      isGuest: false,
    };
    const tree = shallow(<ConfirmationOrderNumberDisplayVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
