import React from 'react';
import { shallow } from 'enzyme';
import { PickUpReviewSection } from '../views/PickUpReviewSection.native';

const props = {
  enablePickUpAlternateForm: 'false',
  isHasPickUpAlternatePerson: 'false',
  pickUpContactPerson: {
    emailAddress: 'TESTS@YOPMAIL.COM',
    firstName: 'ok',
    lastName: 'ok',
    phoneNumber: '9122343456',
  },
  pickUpAlternatePerson: {},
  cartStores: [
    {
      address: {
        address: '5816 Bergenline Ave.',
        addressId: 2042844,
        addressLine1: '5816 Bergenline Ave.',
        addressLine2: '',
        addressLine3: '',
        city: 'West New York',
        country: 'US',
        state: 'NJ',
        zipCode: '07093',
      },
      itemsCount: 2,
      orderType: 'BOPIS',
      stLocId: '111287',
      storeName: 'Bergenline Ave.',
    },
    {
      address: {
        address: '5815 Bergenline Ave.',
        addressId: 2042844,
        addressLine1: '5815 Bergenline Ave.',
        addressLine2: '',
        addressLine3: '',
        city: 'West New York',
        country: 'US',
        state: 'NJ',
        zipCode: '07093',
      },
      itemsCount: 1,
      orderType: 'BOSS',
      stLocId: '111257',
      storeName: 'Beenie Ave.',
      bossEndDate: {
        day: 'Fri',
        date: 9,
        month: 'Aug',
      },
      bossStartDate: {},
    },
  ],
};

const differentBopisBossStores = [
  {
    store: 'Junes',
    storeId: 1224,
    storeAddress: {
      addressLine1: 'Junes Ave',
    },
    storeItemsCount: 2,
    orderType: 'BOPIS',
  },
  {
    store: 'Newport',
    storeId: 1234,
    storeAddress: {
      addressLine1: 'Newport Ave bopis',
    },
    storeItemsCount: 2,
    bossStartDate: {
      day: 'Fri',
      month: 'Oct',
      date: 3,
    },
    bossEndDate: {
      day: 'Sun',
      month: 'Oct',
      date: 5,
    },
    orderType: 'BOSS',
  },
];

const sameBopisBossStores = [
  {
    store: 'Newport',
    storeId: 1234,
    storeAddress: {
      addressLine1: 'Newport Ave boss',
    },
    storeItemsCount: 2,
    orderType: 'BOPIS',
  },
  {
    store: 'Newport',
    storeId: 1234,
    storeAddress: {
      addressLine1: 'Newport Ave',
    },
    storeItemsCount: 2,
    bossStartDate: {
      day: 'Fri',
      month: 'Oct',
      date: 3,
    },
    bossEndDate: {
      day: 'Sun',
      month: 'Oct',
      date: 5,
    },
    orderType: 'BOSS',
  },
];

const sameBopisBossResult = [
  {
    store: 'Newport',
    storeId: 1234,
    storeAddress: {
      addressLine1: 'Newport Ave boss',
    },
    bopisItems: 2,
    bossItems: 2,
    bossStartDate: {
      day: 'Fri',
      month: 'Oct',
      date: 3,
    },
    bossEndDate: {
      day: 'Sun',
      month: 'Oct',
      date: 5,
    },
    orderType: 'MIX',
    storeItemsCount: 2,
  },
];

const differentBopisBossResult = [
  {
    store: 'Junes',
    storeId: 1224,
    storeAddress: {
      addressLine1: 'Junes Ave',
    },
    storeItemsCount: 2,
    orderType: 'BOPIS',
  },
  {
    store: 'Newport',
    storeId: 1234,
    storeAddress: {
      addressLine1: 'Newport Ave bopis',
    },
    storeItemsCount: 2,
    bossStartDate: {
      day: 'Fri',
      month: 'Oct',
      date: 3,
    },
    bossEndDate: {
      day: 'Sun',
      month: 'Oct',
      date: 5,
    },
    orderType: 'BOSS',
  },
];

describe('PickUp Review Section', () => {
  it('should be defined', () => {
    expect(PickUpReviewSection).toBeDefined();
  });

  it('should render the component correctly with same store', () => {
    const component = shallow(<PickUpReviewSection {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should work correctly with same bopis and boss store', () => {
    const component = shallow(<PickUpReviewSection {...props} />)
      .instance()
      .generateStoreDetails(sameBopisBossStores);
    expect(component).toEqual(sameBopisBossResult);
  });

  it('should work correctly with different bopis and boss store', () => {
    const component = shallow(<PickUpReviewSection {...props} />)
      .instance()
      .generateStoreDetails(differentBopisBossStores);
    expect(component).toEqual(differentBopisBossResult);
  });
});
