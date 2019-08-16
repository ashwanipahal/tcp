import React from 'react';
import { shallow } from 'enzyme';
import { CouponTile } from '../CouponTile.view';

describe('CouponTile Component', () => {
  it('should render correctly', () => {
    const props = {
      coupon: {},
      labels: {
        lbl_overview_couponTypeSaving: '',
        lbl_overview_couponUseBy: '',
      },
    };
    const tree = shallow(<CouponTile {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
