import React from 'react';
import { shallow } from 'enzyme';
import { LogOutPageContainerVanilla, mapDispatchToProps } from '../LogOut.container';
import { LogOutViewVanilla } from '../../views/LogOut.view';

describe('Logout container', () => {
  it('should render logout view section', () => {
    const mocktriggerLogout = jest.fn();
    const props = {
      triggerLogout: mocktriggerLogout,
      labels: {
        CREATE_ACC_SIGN_OUT: 'hello',
      },
    };
    const tree = shallow(<LogOutPageContainerVanilla {...props} />);
    expect(tree.is(LogOutViewVanilla)).toBeTruthy();
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
