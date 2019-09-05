import React from 'react';
import { shallow } from 'enzyme';
import { getAboutYouSurvey } from '@tcp/core/src/components/features/account/MyProfile/molecules/AboutYouSurvey/container/AboutYouSurvey';
import { AboutYouInformationContainer, mapDispatchToProps } from '../AboutYouInformation.container';
import { AboutYouInformation } from '../../views/AboutYouInformation.view';

describe('AboutYouInformationContainer', () => {
  const props = {
    clasName: 'sc-cIShpX dVDvCi sc-fYxtnH fCCVQb sc-gGBfsJ RixGJ sc-bbmXgH kaiKft',
    labels: {},
    setSurveyAnswersAction: jest.fn(),
    successMessage: 'Success',
  };

  let tree;
  beforeEach(() => {
    tree = shallow(<AboutYouInformationContainer {...props} />);
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('should render AboutYouInformation view section', () => {
    expect(tree.find(AboutYouInformation)).toHaveLength(1);
  });

  it('calling updateAboutYouInformation method', () => {
    const componentInstance = tree.instance();
    componentInstance.updateAboutYouInformation({ answer1: 'Parent', answer2: 'Girl' });
    expect(props.setSurveyAnswersAction).toBeCalled();
  });

  it('calling setInitialOptions method', () => {
    const componentInstance = tree.instance();
    componentInstance.setInitialOptions(getAboutYouSurvey(props.labels));
    expect(tree).toMatchSnapshot();
  });

  it('calling setInitialValues method', () => {
    const componentInstance = tree.instance();
    componentInstance.setInitialValues();
    expect(componentInstance.initialValues).toBeDefined();
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
