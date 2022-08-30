import React from 'react';
import { shallow } from 'enzyme';
import { PersonalInformation } from '../PersonalInformation.view.native';

describe('PersonalInformation component', () => {
  it('should render correctly', () => {
    const props = {
      labels: {
        llbl_profile_personal_information: 'Personal Information',
        lbl_profile_edit_personal_info: 'Edit personal Info',
        lbl_profile_mailing_address: 'Mailing Information',
        lbl_profile_edit_mailing_info: 'Edit mailing Info',
      },
      userBirthday: 'feb 2019',
      UserEmail: 'test',
      UserFullName: 'test',
      UserPhoneNumber: 'test',
      airMiles: 'XXXXXXX',
      MyPlaceNumber: 'XXXXXXX',
      address: {
        firstName: 'test',
        lastName: 'test',
        addressLine: ['addressline 1', 'addressline 2'],
        city: 'test city',
        state: 'test state',
        zipCode: '111-111',
        country: 'USA',
        isComplete: true,
      },
      handleComponentChange: () => {},
    };
    const component = shallow(<PersonalInformation {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render emptyu correctly', () => {
    const props = {
      labels: {},
      userBirthday: '',
      UserEmail: '',
      UserFullName: '',
      UserPhoneNumber: '',
      airMiles: '',
      MyPlaceNumber: '',
      address: {
        firstName: '',
        lastName: '',
        addressLine: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        isComplete: false,
      },
      handleComponentChange: () => {},
    };
    const component = shallow(<PersonalInformation {...props} />);
    expect(component).toMatchSnapshot();
  });
});
