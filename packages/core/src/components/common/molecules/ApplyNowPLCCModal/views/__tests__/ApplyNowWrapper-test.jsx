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
    component.instance().openModal({ preventDefault: jest.fn() });
  });

  it('should call closeModal', async () => {
    const component = shallow(<ApplyNowModalWrapperVanilla {...props} />);
    component.instance().closeModal();
  });
});
