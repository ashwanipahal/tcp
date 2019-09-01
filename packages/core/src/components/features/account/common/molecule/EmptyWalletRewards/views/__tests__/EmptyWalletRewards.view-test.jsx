import React from 'react';
import { shallow } from 'enzyme';
import { EmptyWalletRewards } from '../EmptyWalletRewards.view';

const labels = {
  myPlaceRewards: {
    lbl_my_rewards_shop_now: 'shop now',
    ACC_LBL_MY_REWARDS_NO_REWARDS_MSG: 'msg',
  },
};

describe('EmptyWalletRewards', () => {
  it('should render correctly', () => {
    const props = {
      labels,
    };
    const tree = shallow(<EmptyWalletRewards {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
