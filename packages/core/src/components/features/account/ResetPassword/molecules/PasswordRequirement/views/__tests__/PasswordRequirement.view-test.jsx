import React from 'react';
import { shallow } from 'enzyme';
import { PasswordRequirement } from '../PasswordRequirement.view';

describe('PasswordRequirement component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        lbl_ResetPassword_backLogin: 'back to login',
        lbl_ResetPassword_requirementNote: 'note:',
        lbl_ResetPassword_requirementTips_1: 'requirement tip 1',
        lbl_ResetPassword_requirementTips_2: 'requirement tip 2',
        lbl_ResetPassword_requirementTips_3: 'requirement tip 3',
      },
    };
    const component = shallow(<PasswordRequirement {...props} />);
    expect(component).toMatchSnapshot();
  });
});
