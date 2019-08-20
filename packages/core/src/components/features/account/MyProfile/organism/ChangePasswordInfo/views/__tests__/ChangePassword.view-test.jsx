import React from 'react';
import { shallow } from 'enzyme';
import ChangePassword from '../ChangePassword.view';

describe('ChangePassword component', () => {
  it('should render correctly', () => {
    const labels = {
      lbl_profile_password: 'Password',
      lbl_profile_change_password: 'Change Password',
    };
    const component = shallow(<ChangePassword labels={labels} />);
    expect(component).toMatchSnapshot();
  });
});
