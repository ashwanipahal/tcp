import React from 'react';
import { shallow } from 'enzyme';
import { ResetPasswordContainer } from '../ResetPassword.container';
import ResetPasswordComponent from '../../views';

describe('ResetPassword container', () => {
  let resetStateActionSpy;
  let resetPasswordActionSpy;
  const queryParams = {
    em: '1234567890',
    logonPasswordOld: '!@#qwer',
  };
  let component;
  beforeEach(() => {
    resetStateActionSpy = jest.fn();
    resetPasswordActionSpy = jest.fn();
    const props = {
      successMessage: '',
      errorMessage: '',
      resetStateAction: resetStateActionSpy,
      resetPasswordAction: resetPasswordActionSpy,
      backToLoginAction: () => {},
      labels: {},
      queryParams,
    };
    component = shallow(<ResetPasswordContainer {...props} />);
  });
  it('should render ResetPassword component', () => {
    expect(component.is(ResetPasswordComponent)).toBeTruthy();
  });

  it('resetPassword should call resetPasswordAction with correct params', () => {
    component.instance().resetPassword({
      password: 'test',
      confirmPassword: 'test',
    });
    expect(resetPasswordActionSpy).toBeCalledWith({
      newPassword: 'test',
      logonPasswordVerify: 'test',
      ...queryParams,
    });
  });

  it('backHandler should call resetStateAction', () => {
    component.instance().backHandler();
    expect(resetStateActionSpy).toBeCalled();
  });
});
