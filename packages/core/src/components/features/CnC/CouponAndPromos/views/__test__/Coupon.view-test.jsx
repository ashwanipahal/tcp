import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import CouponView from '../Coupon.view';

describe('Coupon component', () => {
  it('should renders correctly when Coupon are not present', () => {
    const props = {
      couponList: new List(),
      labels: { APPLIED_REWARDS_HEADING: 'Applied', AVAILABLE_REWARDS_HEADING: 'Available' },
    };
    const component = shallow(<CouponView {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when Coupon are present', () => {
    const props = {
      couponList: new List([
        {
          id: 'R5VALIDFS',
          status: 'available',
          isExpiring: false,
          title: 'FREE GROUND SHIPPING',
          detailsOpen: false,
          expirationDate: '7/17/20',
          effectiveDate: '5/9/13',
          details: null,
          legalText: '',
          isStarted: true,
          error: '',
          promotionType: 'public',
          expirationDateTimeStamp: '2020-07-17T18:29:00.001Z',
        },
      ]),
      labels: { addressBook: {}, common: {} },
    };
    const component = shallow(<CouponView {...props} />);
    expect(component).toMatchSnapshot();
  });
});
