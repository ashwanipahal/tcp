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
});
