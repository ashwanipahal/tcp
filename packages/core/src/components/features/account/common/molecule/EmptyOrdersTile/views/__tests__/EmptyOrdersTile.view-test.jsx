import React from 'react';
import { shallow } from 'enzyme';
import EmptyOrdersTile from '../EmptyOrdersTile.view';

const labels = {
  placeRewards: {
    lbl_my_rewards_shop_now: 'shop now',
    ACC_LBL_MY_REWARDS_NO_REWARDS_MSG: 'msg',
  },
};

describe('EmptyOrdersTile', () => {
  it('should render correctly', () => {
    const props = {
      labels,
    };
    const tree = shallow(<EmptyOrdersTile {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
