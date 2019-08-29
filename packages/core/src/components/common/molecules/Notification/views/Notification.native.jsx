import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { NotificationWrapper, SectionStyle } from '../Notification.style.native';
import withStyles from '../../../hoc/withStyles.native';
import BodyCopy from '../../../atoms/BodyCopy';

// Notification component will show error on the top of the page for form level or api error
const Notification = ({ message, children }) => {
  return (
    <View>
      <NotificationWrapper>
        {message ? (
          <BodyCopy
            fontSize="fs14"
            mobilefontFamily={['secondary']}
            fontWeight="regular"
            text={message}
          />
        ) : null}
        {children || null}
      </NotificationWrapper>
    </View>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Notification.defaultProps = {
  children: null,
};

export default withStyles(Notification, SectionStyle);
export { Notification as NotificationVanilla };
