import React from 'react';
import { shallow } from 'enzyme';
import WalletContainer from '../Wallet.container';

describe('WalletContainer', () => {
  it('should render correctly', () => {
    const tree = shallow(<WalletContainer />);
    expect(tree).toMatchSnapshot();
  });
});
