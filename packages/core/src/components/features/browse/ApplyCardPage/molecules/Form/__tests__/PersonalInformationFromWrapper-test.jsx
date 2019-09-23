import React from 'react';
import { shallow } from 'enzyme';
import PersonalInformationFormWrapper from '../PersonalInformationFormWrapper';

describe('ContactInformationFormWrapper component', () => {
  const props = {
    dispatch: jest.fn(),
    labels: {
      lbl_PLCCForm_personalInfo: 'personal information',
      lbl_PLCCForm_dob: 'Date of Birth',
      lbl_PLCCForm_ssn: 'ssn',
    },
  };

  it('should renders correctly', () => {
    const component = shallow(<PersonalInformationFormWrapper {...props} />);
    expect(component).toMatchSnapshot();
  });
});
