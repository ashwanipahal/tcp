import React from 'react';
import { shallow } from 'enzyme';
import PersonalInformation from '../PersonalInformation.view';

describe('PersonalInformation component', () => {
  it('should render correctly', () => {
    const labels = {
      lbl_profile_personal_information: 'Personal Information',
      lbl_profile_edit_personal_info: 'Edit personal Info',
    };
    const component = shallow(<PersonalInformation labels={labels} />);
    expect(component).toMatchSnapshot();
  });
});
