import React from 'react';
import { shallow } from 'enzyme';
import ProductTileWrapper from '@tcp/core/src/components/features/CnC/CartItemTile/organisms/ProductTileWrapper/container/ProductTileWrapper.container';
import { MiniBagBodyVanilla } from '../views/MiniBagBody';
import EmptyMiniBag from '../../EmptyMiniBag/views/EmptyMiniBag';

describe('MiniBagBody component', () => {
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
    };
    const tree = shallow(<MiniBagBodyVanilla {...props} />);
    expect(tree.find(EmptyMiniBag)).toBeTruthy();
  });
});
