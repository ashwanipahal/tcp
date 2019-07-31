import React from 'react';
import { View } from 'react-native';
import { NotificationWrapper, SectionStyle } from '../Notification.style.native';
import withStyles from '../../../hoc/withStyles.native';

// @flow

type Props = {
  className: String,
  status: String,
  message: String,
};

// Notification component will be modified after Body Copy component is changed
// TODO: Will add error icon when available
const Notification = ({ className, status, message }: Props) => {
  return (
    <View className={className}>
      {status === 'success' && <img alt="success icon" />}
      <NotificationWrapper>{message}</NotificationWrapper>
    </View>
  );
};

export default withStyles(Notification, SectionStyle);
export { Notification as NotificationVanilla };
