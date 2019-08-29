import React from 'react';
import { shallow } from 'enzyme';
import { WalletContainer } from '../Wallet.container';

describe('PlaceRewardsContainer', () => {
  it('should render correctly', () => {
    const labels = {};
    const tree = shallow(<WalletContainer labels={labels} />);
    expect(tree).toMatchSnapshot();
  });
});
