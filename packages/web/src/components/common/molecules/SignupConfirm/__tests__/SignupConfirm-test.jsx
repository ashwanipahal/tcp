import React from 'react';
import { shallow } from 'enzyme';
import { SignupConfirmVanilla } from '../views/SignupConfirm';

describe('EmailSignupModal component', () => {
  it('renders correctly', () => {
    const props = {
      className: '',
      formViewConfig: {},
    };
    const component = shallow(<SignupConfirmVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
