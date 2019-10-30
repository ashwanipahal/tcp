import React from 'react';
import { shallow } from 'enzyme';
import { LogOutViewVanilla } from '../LogOut.view';
import Button from '../../../../../common/atoms/Button';

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
    component.find(Button).simulate('click', { preventDefault: jest.fn() });
    expect(mocktriggerLogout).toHaveBeenCalled();
  });
});
