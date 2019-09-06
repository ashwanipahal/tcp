import React from 'react';
import { shallow } from 'enzyme';
import { Button, Image } from '@tcp/core/src/components/common/atoms';
import SurveyQuestion from '@tcp/core/src/components/features/account/MyProfile/molecules/SurveyQuestion';
import { AboutYouSurvey } from '../AboutYouSurvey.view.native';

describe('AboutYouSurvey', () => {
  const props = {
    labels: {
      lbl_profile_survey_header: '',
      lbl_profile_survey_select_one: 'SELECT ONE',
      lbl_profile_survey_describe_yourself: 'Yourself?',
      lbl_profile_survey_save: 'SAVE',
    },
    className: '',
    userSurvey: null,
    userSurveyQuestions: [
      {
        id: 'answer1',
        statement: 'Describe yourself?',
        multiSelect: false,
        answers: [],
        optionsMap: {
          shopper1: 'Parent',
          shopper2: 'Grandparent',
        },
        options: [
          {
            id: 'shopper1',
            value: 'Parent',
            selected: false,
          },
          {
            id: 'shopper2',
            value: 'Grandparent',
            selected: false,
          },
        ],
      },
      {
        id: 'answer2',
        statement: 'Who are you shopping for in TCP?',
        multiSelect: true,
        answers: [],
        optionsMap: {
          shopper1: 'Girl',
          shopper2: 'Boy',
        },
        options: [
          {
            id: 'shopper1',
            value: 'Girl',
            selected: false,
          },
          {
            id: 'shopper2',
            value: 'Boy',
            selected: false,
          },
        ],
      },
    ],
    userFirstName: 'TCP',
    saveSurveyData: jest.fn(),
  };

  it('should render correctly', () => {
    const tree = shallow(<AboutYouSurvey {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render SurveyQuestion correctly', () => {
    const tree = shallow(<AboutYouSurvey {...props} />);
    expect(tree).toMatchSnapshot();
    expect(tree.find(SurveyQuestion)).toHaveLength(1);
  });

  it('should render Image correctly', () => {
    const tree = shallow(<AboutYouSurvey {...props} />);
    expect(tree.find(Image)).toHaveLength(3);
    expect(tree.find(Button)).toHaveLength(1);
  });

  it('calling updateSurvey method', () => {
    const tree = shallow(<AboutYouSurvey {...props} />);
    const componentInstance = tree.instance();
    componentInstance.updateSurvey(true);
    expect(props.saveSurveyData).toBeCalled();
  });

  it('calling onSelection method', () => {
    const tree = shallow(<AboutYouSurvey {...props} />);
    const componentInstance = tree.instance();
    componentInstance.onSelection('Parent', 'question1');
    expect(tree.state('savedStageSelected')).toBeTruthy();
  });

  it('calling selectFirstStage method', () => {
    const tree = shallow(<AboutYouSurvey {...props} />);
    const componentInstance = tree.instance();
    componentInstance.selectFirstStage();
    expect(tree.state('savedStageSelected')).toBeTruthy();
  });
});
