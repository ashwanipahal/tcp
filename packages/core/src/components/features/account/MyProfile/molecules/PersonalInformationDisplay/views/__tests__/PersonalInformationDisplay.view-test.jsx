import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { PersonalInformationDisplay } from '../PersonalInformationDisplay.view';

describe('PersonalInformationDisplay', () => {
  it('should render correctly', () => {
    const props = {
      mailingAddress: fromJS({}),
      labels: {},
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
});
