import React from 'react';
import { shallow } from 'enzyme';
import { LogOutViewVanilla } from '../LogOut.view';
import Anchor from '../../../../../common/atoms/Anchor';

describe('LogOutView Page', () => {
  it('should render correctly', () => {
    const props = {
      className: '',
    };
    const tree = shallow(<LogOutViewVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should call delete address click', () => {
    const mocktriggerLogout = jest.fn();
    const props = {
      className: '',
      triggerLogout: mocktriggerLogout,
    };
    const component = shallow(<LogOutViewVanilla {...props} />);
    component.find(Anchor).simulate('click', { preventDefault: jest.fn() });
    expect(mocktriggerLogout).toHaveBeenCalled();
  });
});
