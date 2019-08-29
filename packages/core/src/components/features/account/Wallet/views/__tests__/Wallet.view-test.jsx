import React from 'react';
import { shallow } from 'enzyme';
import WalletView from '../Wallet.view';

describe('WalletView component', () => {
  it('should render correctly', () => {
    const component = shallow(<WalletView />);
    expect(component).toMatchSnapshot();
  });
});
