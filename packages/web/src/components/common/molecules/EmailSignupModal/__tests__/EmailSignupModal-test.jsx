import React from 'react';
import { shallow } from 'enzyme';
import { Modal } from '@tcp/core/src/components/common/molecules';
import { EmailSignupModalVanilla } from '../views/EmailSignupModal.view';

describe('EmailSignupModal component', () => {
  it('renders correctly', () => {
    const props = {
      buttonConfig: {},
      className: '',
      formViewConfig: {},
      subscription: { success: false },
      isEmailValid: false,
    };
    const component = shallow(<EmailSignupModalVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly when button is clicked and show confirmation view', () => {
    const props = {
      buttonConfig: {},
      className: '',
      formViewConfig: {},
      subscription: { success: false },
      isEmailValid: 'invalid',
    };
    const modalRefMock = { focus: jest.fn() };
    const component = shallow(<EmailSignupModalVanilla {...props} />);

    component
      .find(Modal)
      .props()
      .contentRef(modalRefMock);
    component.setProps({ isModalOpen: true, subscription: { success: true } });
    expect(modalRefMock.focus).toHaveBeenCalledTimes(1);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly when button is clicked', () => {
    const props = {
      buttonConfig: {},
      className: '',
      formViewConfig: {},
      isSubscriptionValid: { success: false },
      isEmailValid: 'valid',
    };
    const component = shallow(<EmailSignupModalVanilla {...props} />);
    component.setProps({ isModalOpen: true });
    expect(component).toMatchSnapshot();
  });

  it('should close the modal when close button clicked', () => {
    const props = {
      buttonConfig: {},
      className: '',
      formViewConfig: {},
      isSubscriptionValid: { success: false },
      isEmailValid: 'valid',
      closeModal: jest.fn(),
      clearEmailSignupForm: jest.fn(),
    };

    const component = shallow(<EmailSignupModalVanilla {...props} />);
    component
      .find(Modal)
      .props()
      .onRequestClose();

    expect(props.closeModal).toHaveBeenCalledTimes(1);
    expect(props.clearEmailSignupForm).toHaveBeenCalledTimes(1);
  });
});
