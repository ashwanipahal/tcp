import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { MyRewardsVanilla } from '../MyRewards.view';
import DetailedCouponTile from '../../../../molecule/DetailedCouponTile';
import EmptyRewards from '../../../../molecule/EmptyRewards';

describe('MyRewards', () => {
  it('should render correctly', () => {
    const labels = {
      common: {},
      myPlaceRewards: {},
    };
    const tree = shallow(<MyRewardsVanilla labels={labels} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render EmptyRewards component if there is no coupon', () => {
    const labels = {
      common: {},
      myPlaceRewards: {},
    };
    const coupons = fromJS([]);
    const component = shallow(<MyRewardsVanilla labels={labels} coupons={coupons} />);
    expect(component.find(EmptyRewards)).toHaveLength(1);
  });

  it('should render DetailedCouponTile component equal to coupons size', () => {
    const labels = {
      common: {},
      myPlaceRewards: {},
    };
    const coupons = fromJS([{ id: '1234' }, { id: '4321' }]);
    const component = shallow(<MyRewardsVanilla labels={labels} coupons={coupons} />);
    expect(component.find(DetailedCouponTile)).toHaveLength(coupons.size);
  });
});
