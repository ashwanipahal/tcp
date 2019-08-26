import React from 'react';
import { shallow } from 'enzyme';
import { CouponList } from '../CouponList.view.native';

describe('CouponList Component', () => {
  it('should render correctly', () => {
    const props = {
      coupons: [{}],
      labels: {},
      sliceCount: 2,
    };
    const tree = shallow(<CouponList {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
