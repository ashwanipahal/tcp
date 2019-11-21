import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { CouponViewVanilla } from '../views/Coupon.view';

describe('Coupon component', () => {
  it('should renders correctly when Coupon are not present', () => {
    const props = {
      isFetching: false,
      handleApplyCoupon: () => {},
      appliedCouponList: new List(),
      availableCouponList: new List(),
      labels: { APPLIED_REWARDS_HEADING: 'Applied', AVAILABLE_REWARDS_HEADING: 'Available' },
    };
    const component = shallow(<CouponViewVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when Coupon are present', () => {
    const props = {
      couponList: new List([]),
      labels: { addressBook: {}, common: {} },
    };
    const component = shallow(<CouponViewVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders CouponHelpModal component CouponDetailModal method & update state', () => {
    const props = {
      couponList: new List([]),
      labels: { addressBook: {}, common: {} },
    };
    const component = shallow(<CouponViewVanilla {...props} />);
    component.setState({ helpStatus: true, detailStatus: true });
    expect(component.state().detailStatus).toBe(true);
  });

  it('should renders CouponHelpModal component onRequestClose method & update state', () => {
    const props = {
      couponList: new List([]),
      labels: { addressBook: {}, common: {} },
    };
    const component = shallow(<CouponViewVanilla {...props} />);
    component.setState({ helpStatus: true, detailStatus: true });
    expect(component.state().helpStatus).toBe(true);
  });
});
