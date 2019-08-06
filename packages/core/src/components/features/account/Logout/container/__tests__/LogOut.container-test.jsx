import React from 'react';
import { shallow } from 'enzyme';
import { LogOutPageContainer, mapDispatchToProps } from '../LogOut.container';
import LogOutView from '../../views/LogOut.view';

describe('Logout container', () => {
  it('should render logout view section', () => {
    const tree = shallow(<LogOutPageContainer triggerLogout={jest.fn()} />);
    expect(tree.is(LogOutView)).toBeTruthy();
  });
  describe('#mapDispatchToProps', () => {
    it('should return an action logout which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.triggerLogout();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
