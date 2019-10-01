import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { CheckoutCartItemsListVanilla } from '../views/CheckoutCartItemsList.view';

const props = {
  itemsCount: 0,
  items: fromJS([
    {
      productInfo: {
        skuId: '',
        name: '',
        imagePath: '',
        color: {
          name: 'Clay',
        },
        fit: 'slim',
        size: '5S',
      },
      itemInfo: {
        quantity: 1,
        listPrice: 12,
        offerPrice: 10,
      },

      miscInfo: {
        store: '',
        storeAddress: {},
        orderItemType: 'BOPIS',
        bossStartDate: {
          day: '',
          month: '',
          date: '',
        },
        bossEndDate: {},
      },
    },
  ]),
  currencySymbol: '$',
  labels: {},
  bagPageLabels: {},
  className: '',
  gettingSortedItemList: jest.fn(),
};
describe('testing block for CheckoutCartItemsListVanilla', () => {
  it('CheckoutCartItemsListVanilla should be rendered correclty ', () => {
    const component = shallow(<CheckoutCartItemsListVanilla {...props} />);
    expect(component).toBeDefined();
  });
});

const bossprops = {
  itemsCount: 0,
  items: fromJS([
    {
      miscInfo: {
        store: '',
        storeAddress: {},
        orderItemType: 'BOSS',
        bossStartDate: {
          day: '',
          month: '',
          date: '',
        },
        bossEndDate: {},
      },
    },
  ]),
  currencySymbol: '$',
  labels: {},
  bagPageLabels: {},
  className: '',
  gettingSortedItemList: jest.fn(),
};
describe('testing block for CheckoutCartItemsListVanilla', () => {
  it('CheckoutCartItemsListVanilla should be rendered correclty ', () => {
    const component = shallow(<CheckoutCartItemsListVanilla {...bossprops} />);
    expect(component).toBeDefined();
  });
});
