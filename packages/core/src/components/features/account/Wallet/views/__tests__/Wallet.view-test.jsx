import React from 'react';
import { shallow } from 'enzyme';
import WalletView from '../Wallet.view';

describe('WalletView component', () => {
  it('should render correctly', () => {
    const props = {
      heading: 'test',
      programDetailsCta: 'test',
      termsConditionCta: 'test',
      labels: {
        placeRewards: {},
      },
    };
    const component = shallow(<WalletView {...props} />);
    expect(component).toMatchSnapshot();
  });
});
