import React from 'react';
import { shallow } from 'enzyme';
import { SurveyQuestion } from '../SurveyQuestion.view';

describe('SurveyQuestion', () => {
  it('should render correctly', () => {
    const props = {
      clasName: 'sc-cIShpX dVDvCi sc-fYxtnH fCCVQb sc-gGBfsJ RixGJ sc-bbmXgH kaiKft',
      labels: {
        lbl_profile_survey_select_one: 'SELECT ONE',
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
        {
          id: 'shopper3',
          value: 'Gifting for others',
          selected: false,
        },
        {
          id: 'shopper4',
          value: 'Prefer not to answer',
          selected: false,
        },
      ],
      onSelection: () => {},
      questionId: 'question1',
    };
    const tree = shallow(<SurveyQuestion {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
