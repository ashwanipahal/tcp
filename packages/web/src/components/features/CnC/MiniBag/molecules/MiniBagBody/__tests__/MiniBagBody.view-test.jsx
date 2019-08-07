import React from 'react';
import { shallow } from 'enzyme';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import MiniBagBody from '../views/MiniBagBody';
import ProductTileWrapper from '../../../container/ProductTileWrapperContainer.container';

describe('MiniBagBody component', () => {
  it('renders main component correctly', () => {
    const props = {
      labels: {
        viewBag: 'View bag',
        viewSaveForLater: 'save later',
        subTotal: 'Subtotal',
      },
      userName: 'Christine',
      cartItemCount: 1,
      subTotal: 112,
    };
    const component = shallow(<MiniBagBody {...props} />);
    expect(component).toMatchSnapshot();
  });
});

describe('MiniBagBody product tile render component', () => {
  it('renders correctly', () => {
    const props = {
      labels: {
        viewBag: 'View bag empty',
        viewSaveForLater: 'later',
        subTotal: 'Sub',
      },
      userName: 'User1',
      cartItemCount: 12,
      subTotal: 23,
    };
    const tree = shallow(<MiniBagBody {...props} />);

    expect(tree.find(ProductTileWrapper)).toBeTruthy();
  });
});

describe('MiniBagBody anchor tile render component', () => {
  it('renders correctly', () => {
    const props = {
      labels: {
        viewBag: 'View bags',
        viewSaveForLater: 'save',
        subTotal: 'total',
      },
      userName: 'User2',
      cartItemCount: 11,
      subTotal: 12,
    };
    const tree = shallow(<MiniBagBody {...props} />);
    expect(tree.find(Anchor)).toBeTruthy();
  });
});
