import React from 'react';
import { shallow } from 'enzyme';
import SmsSignupModal from '../views/SmsSignupModal.view';

describe('SMSSignupModal component', () => {
  it('renders correctly', () => {
    const props = {
      buttonConfig: {},
      className: '',
      formViewConfig: {},
      subscription: { success: false },
      isEmailValid: false,
    };
    const component = shallow(<SmsSignupModal {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly when button is clicked', () => {
    const props = {
      buttonConfig: {},
      className: '',
      formViewConfig: {},
      subscription: { success: true },
      isEmailValid: true,
    };
    const component = shallow(<SmsSignupModal {...props} />);
    component.setProps({ isModalOpen: true });
    expect(component).toMatchSnapshot();
  });

  it('renders correctly when button is clicked', () => {
    const props = {
      buttonConfig: {},
      className: '',
      formViewConfig: {},
      subscription: { success: false },
      isEmailValid: true,
    };
    const component = shallow(<SmsSignupModal {...props} />);
    component.setProps({ isModalOpen: true });
    expect(component).toMatchSnapshot();
  });
});
