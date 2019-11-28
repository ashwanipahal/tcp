import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { CouponSkeletonVanilla } from '../skeleton/CouponSkeleton.view';

describe('Coupon Skeleton', () => {
  it('Coupon Skeleton  should render properly', () => {
    const props = {
      className: 'sample-className',
      heading: 'sample-heading',
      couponList: new List([]),
      labels: { HELP_APPLYING: 'apply' },
    };
    const component = shallow(<CouponSkeletonVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
