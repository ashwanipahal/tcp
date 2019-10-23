import React from 'react';
import { shallow } from 'enzyme';
import { isCanada } from '@tcp/core/src/utils';
import ProductTileWrapper from '@tcp/core/src/components/features/CnC/CartItemTile/organisms/ProductTileWrapper/container/ProductTileWrapper.container';
import LoyaltyBanner from '@tcp/core/src/components/features/CnC/LoyaltyBanner';
import { MiniBagBodyVanilla } from '../views/MiniBagBody';
import EmptyMiniBag from '../../EmptyMiniBag/views/EmptyMiniBag';

jest.mock('@tcp/core/src/utils', () => ({
  ...jest.requireActual('@tcp/core/src/utils'),
  isCanada: jest.fn(),
}));

describe('MiniBagBody component', () => {
  it('isCanada true for Loyalty Banner', () => {
    const props = {
      labels: {
        viewBag: 'View bag',
        subTotal: 'Subtotal',
        currencySymbol: '$',
      },
      userName: 'Christine',
      cartItemCount: 1,
      subTotal: 112,
      isCartItemsUpdating: { isDeleting: true, isUpdating: false },
    };

    isCanada.mockImplementation(() => true);
    const component = shallow(<MiniBagBodyVanilla {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.find(LoyaltyBanner).length).toEqual(0);
  });
  it('isCanada false for Loyalty Banner', () => {
    const props = {
      labels: {
        viewBag: 'View bag',
        viewSaveForLater: 'save later',
        subTotal: 'Subtotal',
        currencySymbol: '$',
      },
      userName: 'Christine',
      cartItemCount: 1,
      subTotal: 112,
      isCartItemsUpdating: { isDeleting: true, isUpdating: false },
    };

    isCanada.mockImplementation(() => false);
    const component = shallow(<MiniBagBodyVanilla {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.find(LoyaltyBanner).length).toEqual(1);
  });
  it('renders main component correctly', () => {
    const props = {
      labels: {
        viewBag: 'View bag',
        viewSaveForLater: 'save later',
        subTotal: 'Subtotal',
        currencySymbol: '$',
      },
      userName: 'Christine',
      cartItemCount: 1,
      subTotal: 112,
      isCartItemsUpdating: { isDeleting: true, isUpdating: false },
      addedToBagError: 'something went wrong',
    };
    const component = shallow(<MiniBagBodyVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('renders EmptyMiniBag correctly', () => {
    const props = {
      labels: {
        viewBag: 'View bag empty',
        viewSaveForLater: 'later',
        subTotal: 'Sub',
        currencySymbol: '$',
      },
      userName: 'User1',
      cartItemCount: 12,
      subTotal: 23,
      isCartItemsUpdating: { isDeleting: false, isUpdating: true },
    };
    const tree = shallow(<MiniBagBodyVanilla {...props} />);
    expect(tree.find(ProductTileWrapper)).toBeTruthy();
  });
  it('renders correctly', () => {
    const props = {
      labels: {
        viewBag: 'View bag empty',
        viewSaveForLater: 'later',
        subTotal: 'Sub',
        currencySymbol: 'USD',
      },
      userName: 'User1',
      cartItemCount: 12,
      subTotal: 23,
      isCartItemsUpdating: {},
      addedToBagError: 'something went wrong',
    };
    const tree = shallow(<MiniBagBodyVanilla {...props} />);
    expect(tree.find(EmptyMiniBag)).toBeTruthy();
  });
});
