import React from 'react';
import { shallow } from 'enzyme';
import { CouponContainer, mapDispatchToProps } from '../container/Coupon.container';
import CouponView from '../views/Coupon.view';

describe('Coupon Container', () => {
  it('should render CouponContainer section', () => {
    const tree = shallow(
      <CouponContainer
        labels={{}}
        isFetching={false}
        handleApplyCoupon={jest.fn()}
        handleApplyCouponFromList={jest.fn()}
        handleRemoveCoupon={jest.fn()}
        appliedCouponList={[]}
        availableCouponList={[]}
      />
    );
    expect(tree.is(CouponView)).toBeTruthy();
  });

  it('should return an action handleApplyCoupon which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.handleApplyCoupon();
    expect(dispatch.mock.calls).toHaveLength(1);
  });

  it('should return an action handleRemoveCoupon which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.handleRemoveCoupon();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
