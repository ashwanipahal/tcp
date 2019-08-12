import React from 'react';
import { shallow } from 'enzyme';
import { LoginSectionVanilla } from '../LoginSection.view';
import ForgotPasswordContainer from '../../../../../ForgotPassword/container/ForgotPassword.container';
import ResetPassword from '../../../../../ResetPassword';

describe('LoginSection component', () => {
  it('should renders correctly', () => {
    const props = {
      onSubmit: () => {},
      labels: {
        login: {},
      },
      initialValues: {},
    };
    const component = shallow(<LoginSectionVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render ForgotPasswordContainer if currentForm prop is forgotPassword', () => {
    const props = {
      onSubmit: () => {},
      labels: {
        login: {},
      },
      initialValues: {},
      currentForm: 'forgotPassword',
    };
    const component = shallow(<LoginSectionVanilla {...props} />);
    expect(component.find(ForgotPasswordContainer)).toHaveLength(1);
  });

  it('should render ResetPassword if currentForm props is resetPassword', () => {
    const props = {
      onSubmit: () => {},
      labels: {
        login: {},
      },
      initialValues: {},
      currentForm: 'resetPassword',
    };
    const component = shallow(<LoginSectionVanilla {...props} />);
    expect(component.find(ResetPassword)).toHaveLength(1);
  });
});
