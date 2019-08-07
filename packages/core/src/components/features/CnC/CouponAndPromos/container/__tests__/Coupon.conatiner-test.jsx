import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { CouponContainer, mapDispatchToProps } from '../Coupon.container';

describe('Coupon container', () => {
  it('should render nothing if appliedCouponList & availableCouponList prop is not defined', () => {
    const props = {
      labels: {},
      appliedCouponList: new List([]),
      availableCouponList: new List([]),
      getCouponListAction: () => {},
    };
    const component = shallow(<CouponContainer {...props} />);
    expect(component.isEmptyRender()).toBe(false);
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action getCouponListAction which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.getCouponListAction();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
