import React from 'react';
import { shallow } from 'enzyme';
import { LogOutViewVanilla } from '../LogOut.view.native';
import BodyCopy from '../../../../../common/atoms/BodyCopy';

describe('LogOutView Page', () => {
  it('should render correctly', () => {
    const props = {
      className: '',
      labels: {
        CREATE_ACC_SIGN_OUT: 'hello',
      },
    };
    const tree = shallow(<LogOutViewVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('logout click', () => {
    const mocktriggerLogout = jest.fn();
    const props = {
      className: '',
      triggerLogout: mocktriggerLogout,
      labels: {},
    };
    const component = shallow(<LogOutViewVanilla {...props} />);
    component.find(BodyCopy).simulate('press', { preventDefault: jest.fn() });
    expect(mocktriggerLogout).toHaveBeenCalled();
  });
});
