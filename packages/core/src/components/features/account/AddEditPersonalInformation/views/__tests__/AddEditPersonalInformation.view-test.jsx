import React from 'react';
import { shallow } from 'enzyme';
import { ChangePassword } from '../AddEditPersonalInformation.view';

describe('ChangePassword.view component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        lbl_changePassword_back: 'back to login',
        lbl_changePassword_heading: 'Password Chanage',
        lbl_changePassword_password_info: 'Your password must be at least 8 characters long',
        lbl_ResetPassword_requirementTips_1: 'requirement tip 1',
        lbl_ResetPassword_requirementTips_2: 'requirement tip 2',
        lbl_ResetPassword_requirementTips_3: 'requirement tip 3',
      },
      successMessage: 'SUCCESS',
      errorMessage: 'ERROR',
      onSubmit: () => {},
      onBack: () => {},
    };
    const component = shallow(<ChangePassword {...props} />);
    expect(component).toMatchSnapshot();
  });
});
