import React from 'react';
import { shallow } from 'enzyme';
import PickupStoreDisplay from '../views/PickUpStoreDisplay';

export const bopisPickup = {
  orderType: 'BOPIS',
  store: {
    bossEndDate: {},
    bossStartDate: null,
    orderType: 'BOPIS',
    store: 'Newport Center',
    storeAddress: {
      address: '30 Mall Drive West',
      addressId: 2141180,
      addressLine1: '30 Mall Drive West',
      addressLine2: '',
      addressLine3: '',
      city: 'Jersey City',
      country: 'US',
      state: 'NJ',
      zipCode: '07310',
    },
    storeId: '110715',
    storeItemsCount: 1,
  },
};

export const bossPickup = {
  orderType: 'BOSS',
  store: {
    bossEndDate: {
      date: 4,
      day: 'Fri',
      month: 'Jan',
    },
    bossStartDate: {
      date: 3,
      day: 'Thu',
      month: 'Jan',
    },
    orderType: 'BOSS',
    store: 'Fulton Street',
    storeAddress: {
      address: '471-485 Fulton Street',
      addressId: 2141181,
      addressLine1: '471-485 Fulton Street',
      addressLine2: '',
      addressLine3: '',
      city: 'Brooklyn',
      country: 'US',
      state: 'NY',
      zipCode: '11201',
    },
    storeId: '110850',
    storeItemsCount: 1,
  },
};
describe('testing block for PickupStoreDisplay', () => {
  it('PickupStoreDisplay should be rendered correclty when order type is BOPIS', () => {
    const component = shallow(<PickupStoreDisplay {...bopisPickup} />);
    expect(component).toMatchSnapshot();
  });

  it('PickupStoreDisplay should be rendered correclty when order type is BOSS', () => {
    const component = shallow(<PickupStoreDisplay {...bossPickup} />);
    expect(component).toMatchSnapshot();
  });
});
