import React from 'react';
import { shallow } from 'enzyme';
import { ResetPasswordTopSection } from '../views/ResetPasswordTopSection.view';

describe('ResetPasswordTopSection component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        lbl_ResetPassword_backLogin: 'back to login',
        lbl_ResetPassword_requirementNote: 'note:',
        lbl_ResetPassword_requirementTips_1: 'requirement tip 1',
        lbl_ResetPassword_requirementTips_2: 'requirement tip 2',
        lbl_ResetPassword_requirementTips_3: 'requirement tip 3',
      },
      onBack: () => {},
    };
    const component = shallow(<ResetPasswordTopSection {...props} />);
    expect(component).toMatchSnapshot();
  });
});
