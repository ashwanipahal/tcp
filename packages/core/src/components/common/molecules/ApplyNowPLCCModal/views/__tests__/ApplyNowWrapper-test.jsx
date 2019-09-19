import React from 'react';
import { shallow } from 'enzyme';
import ApplyNowModalWrapper from '../ApplyNowView/ApplyNowWrapper';

describe('ApplyNowModalWrapper component', () => {
  const props = {
    labels: {
      plcc_form_contact_info_header: 'contact information',
    },
    toggleModal: jest.fn(),
    className: 'demo',
    isModalOpen: true,
    fetchModuleXContent: jest.fn(),
  };

  it('should renders correctly', () => {
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
});
