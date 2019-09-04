import React from 'react';
import { shallow } from 'enzyme';
import { AboutYouSurveyModalVanilla } from '../AboutYouSurveyModal.view';

describe('AboutYouSurveyModal', () => {
  const props = {
    openState: true,
    labels: {
      lbl_profile_survey_header:
        'Take a 5-second survey to make your shopping experience even better.',
      lbl_profile_survey_select_one: 'SELECT ONE',
      lbl_profile_survey_describe_yourself: 'How would you best describe yourself?',
      lbl_profile_survey_save: 'SAVE',
    },
    userSurvey: [[''], ['']],
    className: 'sc-fkyLDJ frNTkL sc-jGxEUC hdIxqp',
    setModalMountState: jest.fn(),
  };

  it('should render correctly', () => {
    const tree = shallow(<AboutYouSurveyModalVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('calling onClose method', () => {
    const tree = shallow(<AboutYouSurveyModalVanilla {...props} />);
    const componentInstance = tree.instance();
    componentInstance.onClose();
    expect(props.setModalMountState).toBeCalled();
  });
});
