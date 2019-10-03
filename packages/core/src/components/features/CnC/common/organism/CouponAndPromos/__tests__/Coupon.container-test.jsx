import React from 'react';
import { shallow } from 'enzyme';
import { CouponContainer, mapDispatchToProps } from '../container/Coupon.container';
import CouponView from '../views/Coupon.view';
import MyOffersCoupons from '../../../../../account/common/organism/MyOffersCoupons/views/MyOffersCoupons.view';

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
        isCarouselView={false}
      />
    );
    expect(tree.find(CouponView)).toBeTruthy();
  });

  it('should render MyOffersCoupons section', () => {
    const tree = shallow(
      <CouponContainer
        labels={{}}
        isFetching={false}
        handleApplyCoupon={jest.fn()}
        handleApplyCouponFromList={jest.fn()}
        handleRemoveCoupon={jest.fn()}
        appliedCouponList={[]}
        availableCouponList={[]}
        isCarouselView
      />
    );
    expect(tree.find(MyOffersCoupons)).toBeTruthy();
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

  it('should return an action handleApplyCouponFromList which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.handleApplyCouponFromList();
    expect(dispatch.mock.calls).toHaveLength(0);
  });
});
