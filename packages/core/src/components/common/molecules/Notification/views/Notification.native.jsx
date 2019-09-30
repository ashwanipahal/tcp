import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { NotificationWrapper, SectionStyle } from '../Notification.style.native';
import withStyles from '../../../hoc/withStyles.native';
import { BodyCopy, Image } from '../../../atoms';

const successImg = require('../../../../../assets/circle-check-fill.png');
const infoImg = require('../../../../../assets/circle-info-fill.png');

// Notification component will show error on the top of the page for form level or api error
const Notification = ({ message, children, status }) => {
  return (
    <View>
      <NotificationWrapper status={status}>
        {status === 'success' && <Image height="25px" width="25px" source={successImg} />}
        {status === 'info' && <Image height="25px" width="25px" source={infoImg} />}
        {message ? (
          <ViewWithSpacing spacingStyles="padding-XXS">
            <BodyCopy
              fontSize="fs14"
              mobilefontFamily={['secondary']}
              fontWeight="regular"
              text={message}
            />
          </ViewWithSpacing>
        ) : null}
        {children || null}
      </NotificationWrapper>
    </View>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  children: PropTypes.node,
  status: PropTypes.string,
};

Notification.defaultProps = {
  children: null,
  status: 'error',
};

export default withStyles(Notification, SectionStyle);
export { Notification as NotificationVanilla };
