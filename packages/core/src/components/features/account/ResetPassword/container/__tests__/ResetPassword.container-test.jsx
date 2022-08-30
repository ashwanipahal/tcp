import React from 'react';
import { shallow } from 'enzyme';
import { ResetPasswordContainer } from '../ResetPassword.container';
import ResetPasswordComponent from '../../views';

describe('ResetPassword container', () => {
  let resetStateActionSpy;
  let resetPasswordActionSpy;
  let showLoginSpy;
  const queryParams = {
    em: '1234567890',
    logonPasswordOld: '!@#qwer',
  };
  let component;
  beforeEach(() => {
    resetStateActionSpy = jest.fn();
    resetPasswordActionSpy = jest.fn();
    showLoginSpy = jest.fn();
    const props = {
      successMessage: '',
      errorMessage: '',
      resetStateAction: resetStateActionSpy,
      resetPasswordAction: resetPasswordActionSpy,
      backToLoginAction: () => {},
      labels: {},
      queryParams,
      showLogin: showLoginSpy,
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
    component.instance().backHandler({
      preventDefault: () => {},
    });
    expect(resetStateActionSpy).toBeCalled();
  });

  it('onBackClick should call showLoginSpy', () => {
    component.instance().onBackClick();
    expect(showLoginSpy).toBeCalled();
  });

  it('test onPwdHideShowClick', () => {
    component.instance().onPwdHideShowClick(true);
    expect(component.state('hideShowPwd')).toBe(true);
  });

  it('test onConfirmPwdHideShowClick', () => {
    component.instance().onConfirmPwdHideShowClick(true);
    expect(component.state('confirmHideShowPwd')).toBe(true);
  });
});
