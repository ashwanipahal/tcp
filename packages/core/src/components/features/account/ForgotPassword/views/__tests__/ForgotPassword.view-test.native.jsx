import React from 'react';
import { shallow } from 'enzyme';

import { ForgotPasswordViewVanilla } from '../ForgotPassword.view.native';

describe('ForgotPasswordView component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        password: {},
      },
      handleSubmit: () => {},
      onSubmit: () => {},
      showNotification: '',
      resetForgotPasswordErrorResponse: '',
      successFullResetEmail: '',
    };
    const component = shallow(<ForgotPasswordViewVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
