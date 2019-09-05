import React from 'react';
import { shallow } from 'enzyme';
import { MyRewardsContainer, mapDispatchToProps } from '../MyRewards.container';
import MyRewards from '../../views/MyRewards.view';
import CouponDetailModal from '../../../../../../CnC/common/organism/CouponAndPromos/views/CouponDetailModal.view';

describe('MyRewards container', () => {
  it('should render MyRewards component', () => {
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

    const component = shallow(
      <MyRewardsContainer {...props} onViewCouponDetails={jest.fn()} fetchCoupons={jest.fn()} />
    );
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

  it('should return an action onApplyCouponToBag which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.onApplyCouponToBag();
    expect(dispatch.mock.calls).toHaveLength(1);
  });

  it('should return an action onRemove which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.onRemove();
    expect(dispatch.mock.calls).toHaveLength(1);
  });

  it('should return an action onApplyCouponToBagFromList which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.onApplyCouponToBagFromList();
    expect(dispatch.mock.calls).toHaveLength(0);
  });
});
