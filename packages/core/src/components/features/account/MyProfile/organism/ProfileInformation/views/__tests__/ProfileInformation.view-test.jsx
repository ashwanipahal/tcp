import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { ProfileInformationvanilla } from '../ProfileInformation.view';
import ProfileInfoActions from '../../../ProfileInfoActions/views';
import ChangePasswordInfo from '../../../ChangePasswordInfo/views';
import BirthdaySaving from '../../../BirthdaySaving/views';
import AboutYouInfo from '../../../AboutYouInfo';
import MyFavoriteStore from '../../../MyFavoriteStore';
import PersonalInformation from '../../../PersonalInformation/views';

const props = {
  className: '',
  labels: {},
  profileCompletion: '',
  mailingAddress: {},
  profileInfoTile: {},
  userBirthday: '',
  userEmail: '',
  userFullName: '',
  userPhoneNumber: '',
  airMiles: '',
  myPlaceNumber: '',
  percentageIncrement: {},
  defaultStore: 'store',
  successMessage: '',
  childrenBirthdays: fromJS([]),
  userSurvey: fromJS([[[]]]),
};

describe('ProfileInformation component', () => {
  it('should render correctly', () => {
    const component = shallow(<ProfileInformationvanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should render ChangePasswordInfo component', () => {
    const component = shallow(<ProfileInformationvanilla {...props} />);
    expect(component.find(ChangePasswordInfo)).toHaveLength(1);
  });

  it('should render BirthdaySaving component', () => {
    const component = shallow(<ProfileInformationvanilla {...props} />);
    expect(component.find(BirthdaySaving)).toHaveLength(1);
  });

  it('should render ProfileInfoActions component', () => {
    const component = shallow(<ProfileInformationvanilla {...props} />);
    expect(component.find(ProfileInfoActions)).toHaveLength(1);
  });

  it('should render AboutYouInfo component', () => {
    const component = shallow(<ProfileInformationvanilla {...props} />);
    expect(component.find(AboutYouInfo)).toHaveLength(1);
  });

  it('should render MyFavoriteStore component', () => {
    const component = shallow(<ProfileInformationvanilla {...props} />);
    expect(component.find(MyFavoriteStore)).toHaveLength(1);
  });

  it('should render PersonalInformation component', () => {
    const component = shallow(<ProfileInformationvanilla {...props} />);
    expect(component.find(PersonalInformation)).toHaveLength(1);
  });
});
