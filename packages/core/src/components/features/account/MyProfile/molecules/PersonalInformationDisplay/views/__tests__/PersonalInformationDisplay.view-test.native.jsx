import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { PersonalInformationDisplay } from '../PersonalInformationDisplay.view.native';

describe('PersonalInformationDisplay', () => {
  it('should render correctly', () => {
    const props = {
      mailingAddress: fromJS({}),
      labels: {
        lbl_profile_edit_birthday_heading: 'Edit Birthday Heading',
        lbl_profile_my_place_rewards_info: '567567874',
        lbl_profile_air_miles: '65678457675',
      },
      userBirthday: 'feb 2019',
      UserEmail: 'test',
      UserFullName: 'test',
      UserPhoneNumber: 'test',
      airMiles: 'XXXXXXX',
      MyPlaceNumber: 'XXXXXXX',
    };
    const tree = shallow(<PersonalInformationDisplay {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render empty correctly', () => {
    const props = {
      mailingAddress: fromJS({}),
      labels: {},
      userBirthday: '',
      UserEmail: '',
      UserFullName: '',
      UserPhoneNumber: '',
      airMiles: '',
      MyPlaceNumber: '',
    };
    const tree = shallow(<PersonalInformationDisplay {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
