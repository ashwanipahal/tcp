import React from 'react';
import { shallow } from 'enzyme';
import { AddEditPersonalInformationForm } from '../AddEditPersonalInformationForm.view.native';

describe('AddEditPersonalInformationForm component', () => {
  it('should renders correctly in initial state', () => {
    const props = {
      labels: {},
      monthArray: [],
      yearArray: [],
      successMessage: '',
      errorMessage: '',
      birthMonthOptionsMap: [],
      birthYearOptionsMap: [],
      initialValues: {
        isEmployee: false,
        userBirthMonth: '',
        userBirthYear: '',
      },
      birthMonthOptionsArr: [
        {
          id: '',
          displayName: 'Year',
        },
      ],
      isEmployee: true,
    };
    const component = shallow(<AddEditPersonalInformationForm {...props} />);
    expect(component).toMatchSnapshot();
  });
});
