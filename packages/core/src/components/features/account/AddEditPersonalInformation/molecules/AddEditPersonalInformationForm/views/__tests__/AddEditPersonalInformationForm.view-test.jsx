import React from 'react';
import { shallow } from 'enzyme';
import { AddEditPersonalInformationForm } from '../AddEditPersonalInformationForm.view';

describe('AddEditPersonalInformationForm component', () => {
  it('should renders correctly in initial state', () => {
    const props = {
      labels: {},
      pristine: false,
      successMessage: '',
      errorMessage: '',
      birthMonthOptionsMap: [],
      birthYearOptionsMap: [],
      isEmployee: false
    };
    const component = shallow(<AddEditPersonalInformationForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with success and error', () => {
    const props = {
      labels: {},
      pristine: false,
      successMessage: 'success',
      errorMessage: 'error',
    };
    const component = shallow(<AddEditPersonalInformationForm {...props} />);
    expect(component).toMatchSnapshot();
  });
});
