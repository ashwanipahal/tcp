// @flow
import React from 'react';
import Col from '../../../atoms/Col';
import styles from '../Notification.style';
import withStyles from '../../../hoc/withStyles';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';

type Props = {
  colSize: Object,
  className: String,
  status: String,
  message: String,
};
// Notification component will be modified after Body Copy component is changed
const Notification = ({ colSize, className, status, message }: Props) => {
  return (
    <Col colSize={colSize} className={className}>
      <BodyCopy
        bodySize="five"
        bodyColor={status === 'success' ? 'darkGray' : 'white'}
        className="notification"
      >
        {message}
      </BodyCopy>
    </Col>
  );
};

export default withStyles(Notification, styles);
export { Notification as NotificationVanilla };
