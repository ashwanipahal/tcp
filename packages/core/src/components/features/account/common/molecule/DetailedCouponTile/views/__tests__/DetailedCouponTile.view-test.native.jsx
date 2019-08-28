import React from 'react';
import { shallow } from 'enzyme';
import { DetailedCouponTile } from '../DetailedCouponTile.view';

import { COUPON_STATUS } from '../../../../../../../../services/abstractors/CnC/CartItemTile';

const labels = {
  lbl_coupon_expiringSoon: 'expiring soon',
  lbl_coupon_couponValid: 'valid',
  lbl_coupon_couponUseBy: 'use by',
  lbl_coupon_detailsLink: 'details',
  lbl_coupon_viewPrint: 'view & print',
  lbl_coupon_removeFromBag: 'remove from bag',
  lbl_coupon_applyToBag: 'apply',
};

describe('DetailedCouponTile', () => {
  it('should render correctly', () => {
    const props = {
      labels,
      coupon: {},
      isMobile: false,
    };
    const tree = shallow(<DetailedCouponTile {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render expiring soon notification if coupon isExpiring is true', () => {
    const props = {
      labels,
      coupon: {
        isExpiring: true,
      },
    };

    const tree = shallow(<DetailedCouponTile {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly for applied coupon', () => {
    const props = {
      labels,
      coupon: {
        status: COUPON_STATUS.APPLIED,
      },
    };

    const tree = shallow(<DetailedCouponTile {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
