import React from 'react';
import { shallow } from 'enzyme';
import { MyRewardsContainer } from '../MyRewards.container';
import MyRewards from '../../views/MyRewards.view';
import CouponDetailModal from '../../../../../../CnC/common/organism/CouponAndPromos/views/CouponDetailModal.view';

describe('MyProfile container', () => {
  it('should render MyProfile component', () => {
    const props = {
      coupons: [
        {
          id: 'Y0250544MBZOF9',
          status: 'available',
          labelStatus: 'APPLY',
          isExpiring: false,
          title: '25% OFF',
        },
      ],
      view: 'all',
      rewardCoupons: [
        {
          id: 'Y0250544MBZOF9',
          status: 'available',
          labelStatus: 'APPLY',
          isExpiring: false,
          title: '25% OFF',
        },
      ],
      couponsLabels: {},
      labels: {},
    };

    const component = shallow(<MyRewardsContainer {...props} fetchCoupons={jest.fn()} />);
    component.setState({ selectedCoupon: [] });
    expect(component.find(MyRewards)).toHaveLength(1);
    expect(component.find(CouponDetailModal)).toHaveLength(1);
  });

  it('should render empty MyProfile component', () => {
    const props = {
      coupons: [],
      view: '',
      rewardCoupons: [],
      couponsLabels: {},
      labels: {},
    };
    const component = shallow(<MyRewardsContainer {...props} fetchCoupons={jest.fn()} />);
    expect(component.find(MyRewards)).toHaveLength(1);
    expect(component.find(CouponDetailModal)).toHaveLength(0);
  });
});
