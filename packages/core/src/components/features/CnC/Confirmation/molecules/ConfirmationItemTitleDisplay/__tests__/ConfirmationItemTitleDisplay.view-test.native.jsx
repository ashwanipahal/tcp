import React from 'react';
import { shallow } from 'enzyme';
import ConfirmationItemTitleDisplay from '../views/ConfirmationItemTitleDisplay.view.native';

describe('ConfirmationItemTitleDisplay', () => {
  it('should render null if center is not present', () => {
    const tree = shallow(<ConfirmationItemTitleDisplay />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly', () => {
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
      },
      labels: {},
    };
    const tree = shallow(<ConfirmationItemTitleDisplay {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly without shipping full name', () => {
    const props = {
      center: {
        storeName: 'union',
        storeLink: { asPath: '/', to: '/' },
        todayOpenRange: '',
        tomorrowOpenRange: '',
        phoneNumber: 23456789023,
        orderType: 'BOPIS',
      },
      labels: {},
    };
    const tree = shallow(<ConfirmationItemTitleDisplay {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
