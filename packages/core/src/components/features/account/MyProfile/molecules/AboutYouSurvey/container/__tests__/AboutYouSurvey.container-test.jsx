import React from 'react';
import { shallow } from 'enzyme';
import { AboutYouSurveyContainer, mapDispatchToProps } from '../AboutYouSurvey.container';
import { AboutYouSurvey } from '../../views/AboutYouSurvey.view';

describe('AboutYouSurveyContainer', () => {
  const props = {
    clasName: 'sc-cIShpX dVDvCi sc-fYxtnH fCCVQb sc-gGBfsJ RixGJ sc-bbmXgH kaiKft',
    labels: {},
    onSubmit: jest.fn(),
    setSurveyQuestionsAction: jest.fn(),
    setSurveyAnswersAction: jest.fn(),
    userSurvey: null,
    toggleModalState: jest.fn(),
  };

  it('should render correctly', () => {
    const tree = shallow(<AboutYouSurveyContainer {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should not render AboutYouSurvey view section', () => {
    const tree = shallow(<AboutYouSurveyContainer {...props} />);
    expect(tree.is(AboutYouSurvey)).toBeFalsy();
  });

  it('calling onClose method', () => {
    const tree = shallow(<AboutYouSurveyContainer {...props} />);
    const componentInstance = tree.instance();
    componentInstance.saveSurveyData({ answer1: 'Parent', answer2: '' });
    expect(props.setSurveyAnswersAction).toBeCalled();
  });
});

describe('#mapDispatchToProps', () => {
  it('should return an action setSurveyAnswersAction which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.setSurveyAnswersAction();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
