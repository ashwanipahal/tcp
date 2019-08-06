import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { CouponContainer } from '../Coupon.container';
import Coupon from '../../views/Coupon.view';

describe('Coupon container', () => {
  it('should render nothing if appliedCouponList & availableCouponList prop is not defined', () => {
    const component = shallow(
      <CouponContainer labels={[]} appliedCouponList={[]} availableCouponList={[]} />
    );
    expect(component.isEmptyRender()).toBeTruthy();
  });

  it('should render AddressView if addressList prop is of List type', () => {
    const list = List();
    const component = shallow(
      <CouponContainer appliedCouponList={list} availableCouponList={list} />
    );
    expect(component.is(Coupon)).toBeTruthy();
  });
});
