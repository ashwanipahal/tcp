import React from 'react';
import { shallow } from 'enzyme';
import { CouponList } from '../CouponList.view';

describe('CouponList Component', () => {
  it('should render correctly', () => {
    const props = {
      coupons: [{}],
      labels: {},
      sliceCount: 1,
    };
    const tree = shallow(<CouponList {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
