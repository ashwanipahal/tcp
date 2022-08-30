import React from 'react';
import { shallow } from 'enzyme';
import { CouponIcon } from '../CouponIcon.view';
import { COUPON_REDEMPTION_TYPE } from '../../../../../../../../services/abstractors/CnC/CartItemTile';

const labels = {
  lbl_common_couponTypePlacecash: 'place cash',
  lbl_common_couponTypeReward: 'reward',
  lbl_common_couponTypeSaving: 'saving',
};

describe('CouponIcon', () => {
  it('should render correctly', () => {
    const props = {
      labels,
      coupon: {
        offerType: COUPON_REDEMPTION_TYPE.REWARDS,
      },
    };
    const tree = shallow(<CouponIcon {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
