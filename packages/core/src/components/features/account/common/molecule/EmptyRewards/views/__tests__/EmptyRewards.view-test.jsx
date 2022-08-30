import React from 'react';
import { shallow } from 'enzyme';
import { EmptyRewards } from '../EmptyRewards.view';

const labels = {
  placeRewards: {
    lbl_my_rewards_shop_now: 'shop now',
    ACC_LBL_MY_REWARDS_NO_REWARDS_MSG: 'msg',
  },
};

describe('EmptyRewards', () => {
  it('should render correctly', () => {
    const props = {
      labels,
    };
    const tree = shallow(<EmptyRewards {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
