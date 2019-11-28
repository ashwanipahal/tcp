import React from 'react';
import { shallow } from 'enzyme';
import ApplyNowModalWrapper from '../ApplyNowView/ApplyNowWrapper.native';

describe('ApplyNowWrapper', () => {
  const mockedsubmitAcceptOrDeclinePlcc = jest.fn();
  const mockedresetPLCCApplicationStatus = jest.fn();
  const mockedsetIsRTPSFlow = jest.fn();
  const props = {
    submitAcceptOrDeclinePlcc: mockedsubmitAcceptOrDeclinePlcc,
    resetPLCCApplicationStatus: mockedresetPLCCApplicationStatus,
    navigation: { goBack: jest.fn() },
    toggleModal: jest.fn(),
    setIsRTPSFlow: mockedsetIsRTPSFlow,
    labels: {},
    plccBenefitsList: {},
    isPLCCModalOpen: true,
    isModalOpen: false,
    isRtpsFlow: false,
    rtpsOptOutMsg: 'opt out msg',
    rtpsCongratsMsg: 'congrats msg',
  };
  it('should render correctly', () => {
    props.isPLCCModalOpen = true;
    const component = shallow(<ApplyNowModalWrapper {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should render correctly if isModalOpen', () => {
    props.isModalOpen = true;
    props.isPLCCModalOpen = false;
    const component = shallow(<ApplyNowModalWrapper {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should render correctly if isModalOpen and isRtps is true', () => {
    props.isModalOpen = true;
    props.isPLCCModalOpen = false;
    props.isRtpsFlow = true;
    const component = shallow(<ApplyNowModalWrapper {...props} />);
    component.instance().toggleApplyCardModal();
    expect(mockedsubmitAcceptOrDeclinePlcc).toBeCalled();
    component.instance().closeModal();
    expect(mockedresetPLCCApplicationStatus).toBeCalled();
    component.instance().closePlccModal();
    expect(mockedsetIsRTPSFlow).toBeCalled();
    expect(component).toMatchSnapshot();
  });
});
