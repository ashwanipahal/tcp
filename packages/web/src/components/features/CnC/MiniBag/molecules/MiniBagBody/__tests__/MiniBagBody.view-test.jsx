import React from 'react';
import { shallow } from 'enzyme';
import MiniBagBody from '../views/MiniBagBody';
import ProductTileWrapper from '../../../container/ProductTileWrapperContainer.container';
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
    };
    const component = shallow(<MiniBagBody {...props} />);
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
    };
    const tree = shallow(<MiniBagBody {...props} />);
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
    };
    const tree = shallow(<MiniBagBody {...props} />);
    expect(tree.find(EmptyMiniBag)).toBeTruthy();
  });
});
