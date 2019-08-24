import React from 'react';
import { shallow } from 'enzyme';
import { AddEditPersonalInformationContainer } from '../AddEditPersonalInformation.container';
import ChangePasswordComponent from '../../views';

describe('ChangePassword container', () => {
  let messageSateChangeActionSpy;
  let changePasswordActionSpy;
  let component;
  beforeEach(() => {
    messageSateChangeActionSpy = jest.fn();
    changePasswordActionSpy = jest.fn();
    const props = {
      successMessage: '',
      errorMessage: '',
      messageSateChangeAction: messageSateChangeActionSpy,
      changePasswordAction: changePasswordActionSpy,
      labels: {},
    };
    component = shallow(<AddEditPersonalInformationContainer {...props} />);
  });
  it('should render ChangePassword component', () => {
    expect(component.is(ChangePasswordComponent)).toBeTruthy();
  });

  it('changePassword should call changePasswordAction with correct params', () => {
    component.instance().changePassword({
      password: 'test',
      currentPassword: 'test',
      confirmPassword: 'test',
    });
    expect(changePasswordActionSpy).toBeCalledWith({
      currentPassword: 'test',
      newPassword: 'test',
      newPasswordVerify: 'test',
    });
  });

  it('backHandler should call messageSateChangeAction', () => {
    expect(messageSateChangeActionSpy.mock.calls.length).toBe(0);
    component.unmount();
    expect(messageSateChangeActionSpy.mock.calls.length).toBe(1);
  });
});
