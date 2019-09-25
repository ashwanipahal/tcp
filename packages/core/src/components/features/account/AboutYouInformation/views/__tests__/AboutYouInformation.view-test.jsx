import React from 'react';
import { shallow } from 'enzyme';
import AboutYouInformationForm from '@tcp/core/src/components/features/account/AboutYouInformation/molecules/AboutYouInformationForm';
import { AboutYouInformation } from '../AboutYouInformation.view';

describe('AboutYouInformation', () => {
  const props = {
    labels: {
      lbl_profile_survey_header: '',
      lbl_profile_survey_save: 'SAVE',
    },
    initialValues: {
      options1: [],
      options2: [],
    },
  };

  it('should render correctly', () => {
    const tree = shallow(<AboutYouInformation {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render SurveyQuestion correctly', () => {
    const tree = shallow(<AboutYouInformation {...props} />);
    expect(tree).toMatchSnapshot();
    expect(tree.find(AboutYouInformationForm)).toHaveLength(1);
  });
});
