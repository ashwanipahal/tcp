import React from 'react';
import { shallow } from 'enzyme';
import WalletView from '../Wallet.view.native';

describe('Wallet', () => {
  it('should render correctly', () => {
    const props = {
      heading: 'test',
      programDetailsCta: 'test',
      termsConditionCta: 'test',
      labels: {
        myPlaceRewards: {},
        common: {},
      },
      view: 'all',
    };
    const tree = shallow(<WalletView {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
