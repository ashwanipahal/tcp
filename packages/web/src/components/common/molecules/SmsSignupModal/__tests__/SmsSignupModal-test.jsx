import React from 'react';
import { shallow } from 'enzyme';
import { SmsSignupModalVanilla } from '../views/SmsSignupModal.view';

describe('SMSSignupModal component', () => {
  it('renders correctly', () => {
    const props = {
      buttonConfig: {},
      className: '',
      formViewConfig: {},
      subscription: { success: false },
      isEmailValid: false,
    };
    const component = shallow(<SmsSignupModalVanilla {...props} />);
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
    const component = shallow(<SmsSignupModalVanilla {...props} />);
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
    const component = shallow(<SmsSignupModalVanilla {...props} />);
    component.setProps({ isModalOpen: true });
    expect(component).toMatchSnapshot();
  });
});
