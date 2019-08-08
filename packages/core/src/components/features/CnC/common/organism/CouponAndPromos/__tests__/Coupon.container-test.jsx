import React from 'react';
import { shallow } from 'enzyme';
import { CouponContainer, mapDispatchToProps } from '../container/Coupon.container';
import CartItemTile from '../views/Coupon.view';

describe('Coupon Container', () => {
  it('should render CouponContainer section', () => {
    const tree = shallow(<CouponContainer isFetching={false} handleApplyCoupon={jest.fn()} />);
    expect(tree.is(CartItemTile)).toBeTruthy();
  });

  describe('mapDispatchToProps', () => {
    it('should return an action handleApplyCoupon which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.handleApplyCoupon();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
