import React from 'react';
import { shallow } from 'enzyme';
import { EmailSignupFormVanilla } from '../views/EmailSignupForm';
import SignupConfirm from '../../../molecules/SignupConfirm';

describe('EmailSignupModal component', () => {
  it('renders correctly', () => {
    const props = {
      buttonConfig: {},
      className: '',
      formViewConfig: {},
      subscription: { success: false },
      isEmailValid: false,
    };
    const component = shallow(<EmailSignupFormVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly when button is clicked', () => {
    const props = {
      buttonConfig: {},
      className: '',
      formViewConfig: {},
      isSubscriptionValid: { success: true },
      isEmailValid: 'invalid',
    };
    const component = shallow(<EmailSignupFormVanilla {...props} />);
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
    const component = shallow(<EmailSignupFormVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('render confirmation on success email id submit', () => {
    const props = {
      subscription: {
        success: true,
      },
      noModal: true,
      formViewConfig: {},
    };
    const component = shallow(<EmailSignupFormVanilla {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.find(SignupConfirm)).toHaveLength(1);
  });
});
