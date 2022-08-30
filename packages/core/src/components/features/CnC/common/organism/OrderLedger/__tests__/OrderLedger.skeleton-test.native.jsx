import React from 'react';
import { shallow } from 'enzyme';
import OrderSummarySkeleton from '../skeleton/OrderSummarySkeleton.view.native';

describe('Order Ledger Skeleton', () => {
  it('Order Ledger Skeleton should render properly', () => {
    const props = {
      className: 'sample-className',
    };
    const component = shallow(<OrderSummarySkeleton {...props} />);
    expect(component).toMatchSnapshot();
  });
});
