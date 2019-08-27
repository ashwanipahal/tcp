import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import MyRewards from '../MyRewards.view.native';
import EmptyRewards from '../../../../molecule/EmptyRewards';

describe('MyRewards', () => {
  it('should render EmptyRewards component if there is no coupon', () => {
    const labels = {
      common: {},
      myPlaceRewards: {},
    };
    const coupons = fromJS([]);
    const component = shallow(<MyRewards labels={labels} coupons={coupons} />);
    expect(component.find(EmptyRewards)).toHaveLength(1);
  });
});
