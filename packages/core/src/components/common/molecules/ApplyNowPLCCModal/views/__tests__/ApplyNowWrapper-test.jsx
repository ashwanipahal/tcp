import React from 'react';
import { shallow } from 'enzyme';
import ApplyNowModalWrapper from '../ApplyNowView/ApplyNowWrapper';

describe('ApplyNowModalWrapper component', () => {
  const props = {
    labels: {
      plcc_form_contact_info_header: 'contact information',
      referred: [],
    },
    toggleModal: jest.fn(),
    className: 'demo',
    isModalOpen: false,
    fetchModuleXContent: jest.fn(),
    resetPLCCApplicationStatus: jest.fn(),
    isPLCCModalOpen: true,
  };

  it('should renders correctly', () => {
    const component = shallow(<ApplyNowModalWrapper {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly for closed plccModal', () => {
    props.isPLCCModalOpen = false;
    props.labels.referred = null;
    const component = shallow(<ApplyNowModalWrapper {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should call openModal', async () => {
    const component = shallow(<ApplyNowModalWrapper {...props} />);
    const spyOpenModal = jest.spyOn(component.instance(), 'openModal');
    component.instance().openModal({ preventDefault: jest.fn() });
    expect(spyOpenModal).toHaveBeenCalled();
  });

  it('should call closeModal', async () => {
    const component = shallow(<ApplyNowModalWrapper {...props} />);
    const spyCloseModal = jest.spyOn(component.instance(), 'closeModal');
    component.instance().closeModal();
    expect(spyCloseModal).toHaveBeenCalled();
  });

  it('should call closePLCCModal', async () => {
    const component = shallow(<ApplyNowModalWrapper {...props} />);
    const spyClosePLCCModal = jest.spyOn(component.instance(), 'closePLCCModal');
    component.instance().closePLCCModal();
    expect(spyClosePLCCModal).toHaveBeenCalled();
  });

  it('should call openPLCCModal', async () => {
    const component = shallow(<ApplyNowModalWrapper {...props} />);
    const spyOpenPLCCModal = jest.spyOn(component.instance(), 'openPLCCModal');
    component.instance().openPLCCModal({ preventDefault: jest.fn() });
    expect(spyOpenPLCCModal).toHaveBeenCalled();
  });
});
