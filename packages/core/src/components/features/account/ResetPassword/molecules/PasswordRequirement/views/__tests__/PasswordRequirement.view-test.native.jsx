import React from 'react';
import { shallow } from 'enzyme';
import PasswordRequirements from '../PasswordRequirement.view';

describe('PasswordRequirement component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        lbl_resetPassword_requirementHeading: 'Requirement Heading',
        lbl_resetPassword_requirementNote: 'note:',
        lbl_resetPassword_requirementTips_1: 'requirement tip line1 ',
        lbl_resetPassword_requirementTips_2: 'requirement tip line 2',
        lbl_resetPassword_requirementTips_3: 'requirement tip line 3',
      },
    };
    const component = shallow(<PasswordRequirements {...props} />);
    expect(component).toMatchSnapshot();
  });
});
