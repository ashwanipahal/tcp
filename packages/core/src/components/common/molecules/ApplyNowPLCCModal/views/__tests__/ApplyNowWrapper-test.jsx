import React from 'react';
import { shallow } from 'enzyme';
import { ApplyNowModalWrapperVanilla } from '../ApplyNowWrapper';

describe('ApplyNowModalWrapper component', () => {
  const props = {
    labels: {
      plcc_form_contact_info_header: 'contact information',
    },
    toggleModal: jest.fn(),
    className: 'demo',
    isModalOpen: true,
  };

  it('should renders correctly', () => {
    const component = shallow(<ApplyNowModalWrapperVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should call openModal', async () => {
    const component = shallow(<ApplyNowModalWrapperVanilla {...props} />);
    const spyOpenModal = jest.spyOn(component.instance(), 'openModal');
    component.instance().openModal({ preventDefault: jest.fn() });
    expect(spyOpenModal).toHaveBeenCalled();
  });

  it('should call closeModal', async () => {
    const component = shallow(<ApplyNowModalWrapperVanilla {...props} />);
    const spyCloseModal = jest.spyOn(component.instance(), 'closeModal');
    component.instance().closeModal();
    expect(spyCloseModal).toHaveBeenCalled();
  });
});
