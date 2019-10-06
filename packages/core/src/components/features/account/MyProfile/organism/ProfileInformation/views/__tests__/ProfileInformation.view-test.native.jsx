import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { ProfileInformation } from '../ProfileInformation.view.native';

describe('ProfileInformation', () => {
  const props = {
    labels: {
      profile: {},
    },
    labelsObj: {
      profile: {},
    },
    handleComponentChange: () => {},
    userSurvey: fromJS({ answers1: [], answers2: [] }),
    componentProps: {},
  };

  it('should render correctly', () => {
    const tree = shallow(<ProfileInformation {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('calling toggleModalState method', () => {
    const tree = shallow(<ProfileInformation {...props} />);
    const componentInstance = tree.instance();
    componentInstance.toggleModalState('mountSurveyModal');
    expect(tree.state('mountSurveyModal')).toBeTruthy();
  });

  it('toggleMailingAddressModal should set mountMailingAddressModal to true', () => {
    const tree = shallow(<ProfileInformation {...props} />);
    const componentInstance = tree.instance();
    componentInstance.toggleMailingAddressModal();
    expect(tree.state('mountMailingAddressModal')).toBeTruthy();
  });
});
