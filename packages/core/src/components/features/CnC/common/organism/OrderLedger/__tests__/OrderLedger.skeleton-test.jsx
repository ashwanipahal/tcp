import React from 'react';
import { shallow } from 'enzyme';
import { OrderSummarySkeletonVanilla } from '../skeleton/OrderSummarySkeleton.view';

describe('Order Ledger Skeleton', () => {
  it('Order Ledger Skeleton should render properly', () => {
    const props = {
      className: 'sample-className',
    };
    const component = shallow(<OrderSummarySkeletonVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
