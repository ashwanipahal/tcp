import React from 'react';
import { shallow } from 'enzyme';
import EmptyOrderTile from '../EmptyOrdersTile.view.native';

const labels = {
  orders: {
    lbl_ordersTile_noOrderYet: 'shop now',
    lbl_orders_shopNow: 'msg',
  },
};

describe('EmptyOrderTile', () => {
  it('should render correctly', () => {
    const props = {
      labels,
      navigateToNestedRoute: () => {},
    };
    const tree = shallow(<EmptyOrderTile {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
