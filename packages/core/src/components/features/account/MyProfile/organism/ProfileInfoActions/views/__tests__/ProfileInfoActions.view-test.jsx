import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { ProfileInfoActions } from '../ProfileInfoActions.view';

describe('ProfileInfoActions', () => {
  it('should render correctly for empty state', () => {
    const props = {
      labels: {},
      profileCompletion: '',
      className: '',
      mailingAddress: fromJS({}),
      defaultStore: '',
      userBirthday: '',
      userSurvey: fromJS([]),
      percentageIncrement: {
        percentageMailingAddress: '20',
        percentageFavStore: '20',
        percentageUserBirthday: '20',
        percentageUserSurvey: '20',
      },
    };
    const tree = shallow(<ProfileInfoActions {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly for filled state', () => {
    const props = {
      labels: {},
      profileCompletion: '100',
      className: '',
      mailingAddress: fromJS({
        isComplete: true,
      }),
      defaultStore: '12345',
      userBirthday: '1212',
      userSurvey: fromJS([['test'], ['test']]),
      percentageIncrement: {
        percentageMailingAddress: '20',
        percentageFavStore: '20',
        percentageUserBirthday: '20',
        percentageUserSurvey: '20',
      },
    };
    const tree = shallow(<ProfileInfoActions {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
