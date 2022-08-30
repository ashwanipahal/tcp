import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import MyRewards from '../MyRewards.view.native';
import EmptyRewards from '../../../../molecule/EmptyRewards';

describe('MyRewards', () => {
  it('should render correctly', () => {
    const labels = {
      common: {},
      placeRewards: {},
    };
    const coupons = fromJS([]);
    const tree = shallow(<MyRewards labels={labels} coupons={coupons} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render carousel if coupons are avalable', () => {
    const labels = {
      common: {},
      placeRewards: {},
    };
    const coupons = fromJS([{ id: '1234' }, { id: '4321' }]);
    const tree = shallow(<MyRewards labels={labels} coupons={coupons} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render EmptyRewards component if there is no coupon', () => {
    const labels = {
      common: {},
      placeRewards: {},
    };
    const coupons = fromJS([]);
    const component = shallow(<MyRewards labels={labels} coupons={coupons} />);
    expect(component.find(EmptyRewards)).toHaveLength(1);
  });

  it('should render DetailedCouponTile component equal to coupons size', () => {
    const labels = {
      common: {},
      placeRewards: {},
    };
    const coupons = fromJS([{ id: '1234' }, { id: '4321' }]);
    const component = shallow(<MyRewards labels={labels} coupons={coupons} />);
    expect(component.find(Carousel)).toHaveLength(1);
  });
});
