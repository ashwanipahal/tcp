import React from 'react';
import { shallow } from 'enzyme';
import { WalletContainer, mapDispatchToProps } from '../Wallet.container';

describe('WalletContainer', () => {
  it('should render correctly', () => {
    const labels = {};
    const accountLabels = {};
    const tree = shallow(<WalletContainer labels={labels} accountLabels={accountLabels} />);
    expect(tree).toMatchSnapshot();
  });

  it('#fetchLabels should call on componentDidMount', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.fetchLabels();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
