import React from 'react';
import { shallow } from 'enzyme';
import { AccountDrawerBottomLinksVanilla } from '../AccountDrawerBottomLinks';

describe('AccountDrawerBottomLinks', () => {
  it('should render correctly', () => {
    const labels = {
      CREATE_ACC_MY_FAV: 'My Favorites',
      CREATE_ACC_MY_PLACE_REWARDS_CC: 'My Place Rewards Credit Card',
      CREATE_ACC_WALLET: 'Wallet',
      CREATE_ACC_ORDERS: 'Orders',
      CREATE_ACC_SIGN_OUT: 'Sign Out',
    };
    const tree = shallow(<AccountDrawerBottomLinksVanilla labels={labels} />);
    expect(tree).toMatchSnapshot();
  });
});
