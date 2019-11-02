import React from 'react';
import { shallow } from 'enzyme';
import { WalletContainer, mapStateToProps, mapDispatchToProps } from '../Wallet.container';

describe('WalletContainer', () => {
  it('should render correctly', () => {
    const labels = {};
    const accountLabels = {};
    const tree = shallow(<WalletContainer labels={labels} accountLabels={accountLabels} />);
    expect(tree).toMatchSnapshot();
  });

  it('mapStateToProps should return label props', () => {
    const stateProps = mapStateToProps({
      Labels: {
        global: {
          lbl_profile_name: 'test',
        },
      },
    });
    expect(stateProps.labels).toBeDefined();
  });

  it('#fetchLabels should call on componentDidMount', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.fetchLabels();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
