import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { ProfileInformation } from '../ProfileInformation.view.native';

describe('ProfileInformation', () => {
  const props = {
    labels: {},
    handleComponentChange: () => {},
    userSurvey: fromJS({ answers1: [], answers2: [] }),
  };

  it('should render correctly', () => {
    const tree = shallow(<ProfileInformation {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('calling toggleModalState method', () => {
    const tree = shallow(<ProfileInformation {...props} />);
    const componentInstance = tree.instance();
    componentInstance.toggleModalState();
    expect(tree.state('mountSurveyModal')).toBeTruthy();
  });
});
