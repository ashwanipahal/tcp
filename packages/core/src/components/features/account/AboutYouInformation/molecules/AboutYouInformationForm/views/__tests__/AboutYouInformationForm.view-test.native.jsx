import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '@tcp/core/src/components/common/atoms';
import { AboutYouInformationForm } from '../AboutYouInformationForm.view.native';

describe('AboutYouInformationForm', () => {
  const props = {
    labels: {
      lbl_profile_survey_header: '',
      lbl_profile_survey_select_one: 'SELECT ONE',
      lbl_profile_survey_describe_yourself: 'Yourself?',
      lbl_profile_survey_save: 'SAVE',
      lbl_profile_survey_question1: 'Question 1',
      lbl_profile_survey_question2: 'Question 2',
    },
    onSubmit: jest.fn(),
    onClose: jest.fn(),
    initialValues: {
      options1: [
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
          selected: true,
        },
        {
          id: 'shopper4',
          value: 'Prefer not to answer',
          selected: false,
        },
      ],
      options2: [
        {
          id: 'shopper1',
          value: 'Girl',
          selected: true,
        },
        {
          id: 'shopper2',
          value: 'Boy',
          selected: false,
        },
        {
          id: 'shopper3',
          value: 'Toddler Girl',
          selected: true,
        },
        {
          id: 'shopper4',
          value: 'Toddler Boy',
          selected: false,
        },
        {
          id: 'shopper5',
          value: 'Baby',
          selected: false,
        },
      ],
    },
    pristine: true,
  };

  const tree = shallow(<AboutYouInformationForm {...props} />);

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('should render LabeledRadioButton correctly', () => {
    expect(tree.find('[name="question1"]')).toHaveLength(4);
  });

  it('should render Button correctly', () => {
    expect(tree.find(Button)).toHaveLength(2);
  });

  it('calling onUpdate method', () => {
    const componentInstance = tree.instance();
    componentInstance.onUpdate();
    expect(props.onSubmit).toBeCalled();
  });

  it('calling onSelectOption method', () => {
    const componentInstance = tree.instance();
    componentInstance.onSelectOption(true, 'Parent');
    expect(tree.state('options1')).toBeDefined();
  });
});
