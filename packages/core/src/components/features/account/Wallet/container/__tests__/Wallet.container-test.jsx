import React from 'react';
import { shallow } from 'enzyme';
import { WalletContainer, mapStateToProps } from '../Wallet.container';

describe('WalletContainer', () => {
  it('should render correctly', () => {
    const labels = {};
    const tree = shallow(<WalletContainer labels={labels} />);
    expect(tree).toMatchSnapshot();
  });

  it('mapStateToProps should return label props', () => {
    const stateProps = mapStateToProps({
      Labels: {
        account: {
          lbl_profile_name: 'test',
        },
      },
    });
    expect(stateProps.labels).toBeDefined();
  });
});
