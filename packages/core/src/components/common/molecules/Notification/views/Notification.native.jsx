import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { NotificationWrapper, SectionStyle } from '../Notification.style.native';
import withStyles from '../../../hoc/withStyles.native';
import BodyCopy from '../../../atoms/BodyCopy';

// Notification component will show error on the top of the page for form level or api error
const Notification = ({ message }) => {
  return (
    <View>
      <NotificationWrapper>
        <BodyCopy
          fontSize="fs14"
          mobilefontFamily={['secondary']}
          fontWeight="regular"
          text={message}
        />
      </NotificationWrapper>
    </View>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default withStyles(Notification, SectionStyle);
export { Notification as NotificationVanilla };
