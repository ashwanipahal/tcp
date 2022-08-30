import React from 'react';
import { shallow } from 'enzyme';
import { SMSNotificationsVanilla } from '../SMSNotifications.view.native';

describe('SMSNotificationsVanilla', () => {
  it('should render correctly', () => {
    const props = {
      labels: {},
      handleSubmit: jest.fn(),
      smsNotificationSubmit: jest.fn(),
      resetNotificationErrorState: jest.fn(),
    };
    const tree = shallow(<SMSNotificationsVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with props', () => {
    const props = {
      labels: {},
      handleSubmit: jest.fn(),
      smsNotificationSubmit: jest.fn(),
      resetNotificationErrorState: jest.fn(),
      smsNotificationSuccess: true,
      isGymboree: true,
      isCanada: true,
      isTCP: true,
      smsNotificationError: 'test',
    };
    const tree = shallow(<SMSNotificationsVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
