import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { ProfileInformation } from '../ProfileInformation.view.native';

describe('ProfileInformation', () => {
  it('should render correctly', () => {
    const props = {
      labels: {},
      handleComponentChange: () => {},
      userSurvey: fromJS({ answers1: [], answers2: [] }),
    };
    const tree = shallow(<ProfileInformation {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
