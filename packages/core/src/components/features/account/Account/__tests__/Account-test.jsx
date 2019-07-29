import { shallow } from 'enzyme';
import React from 'react';
import { Account, mapDispatchToProps } from '../container/Account';

describe('Account View', () => {
  it('should render Account Correctly', () => {
    const router = {
      query: {
        id: 'accountOverview',
      },
    };
    const tree = shallow(<Account router={router} getAccountNavigationAction={() => {}} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render Account container Correctly', () => {
    const router = {
      query: {
        id: 'accountOverview',
      },
    };
    const tree = shallow(<Account router={router} getAccountNavigationAction={() => {}} />);
    tree.setProps({ router: { query: { id: 'addressBook' } } });
    expect(tree).toMatchSnapshot();
  });

  it('should return an action getAccountNavigationAction which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getAccountNavigationAction();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
