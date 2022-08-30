import React from 'react';
import { shallow } from 'enzyme';
import { AddEditPersonalInformation } from '../AddEditPersonalInformation.view';

describe('AddEditPersonalInformation.view component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        lbl_profile_personal_info_back: 'back to profile',
        lbl_profile_heading: 'update Profile',
      },
      successMessage: 'SUCCESS',
      errorMessage: 'ERROR',
      onSubmit: () => {},
      onBack: () => {},
      birthMonthOptionsMap: [],
      birthYearOptionsMap: [],
      initialValues: {},
    };
    const component = shallow(<AddEditPersonalInformation {...props} />);
    expect(component).toMatchSnapshot();
  });
});
