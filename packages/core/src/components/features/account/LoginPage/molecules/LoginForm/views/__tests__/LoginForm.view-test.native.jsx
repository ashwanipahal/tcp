import React from 'react';
import { shallow } from 'enzyme';
import { LoginFormVanilla } from '../LoginForm.view.native';

describe('LoginForm component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        login: {},
        handleSubmit: () => {},
        onSubmit: () => {},
        loginErrorMessage: '',
        showForgotPasswordForm: () => {},
        resetForm: () => {},
      },
      handleSubmit: () => {},
      onSubmit: () => {},
      loginErrorMessage: '',
    };
    const component = shallow(<LoginFormVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
