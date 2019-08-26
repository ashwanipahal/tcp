import React from 'react';
import { shallow } from 'enzyme';
import PersonalInformationFormWrapper from '../PersonalInformationFormWrapper';

describe('ContactInformationFormWrapper component', () => {
  const props = {
    dispatch: jest.fn(),
    labels: {
      plcc_form_personal_info: 'personal information',
      plcc_form_dob: 'Date of Birth',
      plcc_form_ssn: 'ssn',
    },
  };

  it('should renders correctly', () => {
    const component = shallow(<PersonalInformationFormWrapper {...props} />);
    expect(component).toMatchSnapshot();
  });
});
