import React from 'react';
import { shallow } from 'enzyme';
import { SignupWrapperVanilla } from '../views/EmailSignupModal.view';

describe('EmailSignupModal component', () => {
  it('renders correctly', () => {
    const props = {
      buttonConfig: {},
      className: '',
      formViewConfig: {},
      isSubscriptionValid: false,
      isEmailValid: false,
    };
    const component = shallow(<SignupWrapperVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly when button is clicked', () => {
    const props = {
      buttonConfig: {},
      className: '',
      formViewConfig: {},
      isSubscriptionValid: false,
      isEmailValid: true,
    };
    const component = shallow(<SignupWrapperVanilla {...props} />);
    component.setState({ isOpen: true });
    expect(component).toMatchSnapshot();
  });
});
