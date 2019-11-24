import React from 'react';
import { shallow } from 'enzyme';
import { EmailSignupFormVanilla } from '../views/EmailSignupForm';

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
});
