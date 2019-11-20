import React from 'react';
import { shallow } from 'enzyme';
import { SMSNotificationFormContainer } from '../SMSNotifications.container';
import SMSNotificationsForm from '../../views/SMSNotifications.view';

describe('SMSNotificationsFormContainer', () => {
  const userInformation = {
    firstName: 'Test',
    lastName: 'Test',
  };
  const props = {
    className: 'confirmation-create-account',
    isPromptForUserDetails: false,
    emailAddress: 'test@childrensplace.com',
    initialValues: {
      ...userInformation,
    },
    userInformation,
    labels: {},
    passwordLabels: {},
    createAccountSuccess: false,
    createAccountError: false,
  };

  it('should not render sms notification', () => {
    const tree = shallow(<SMSNotificationFormContainer {...props} />);
    expect(tree.is(SMSNotificationsForm)).toBeTruthy();
  });
});
