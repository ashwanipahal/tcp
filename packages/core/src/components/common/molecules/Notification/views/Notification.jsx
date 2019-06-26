import React from 'react';
import { getIconPath } from '@tcp/web/src/utils'; //eslint-disable-line
import Col from '../../../atoms/Col';
import styles from '../Notification.style';
import withStyles from '../../../hoc/withStyles';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';

// @flow

type Props = {
  colSize: Object,
  className: String,
  status: String,
  message: String,
};

// Notification component will be modified after Body Copy component is changed
// TODO: Will add error icon when available
const Notification = ({ colSize, className, status, message }: Props) => {
  const successIcon = getIconPath('icon-done');
  return (
    <Col colSize={colSize} className={className}>
      <img
        alt={status === 'success' ? 'success icon' : 'error icon'}
        src={status === 'success' ? successIcon : ''}
      />
      <BodyCopy
        bodySize="five"
        bodyColor={status === 'success' ? 'darkGray' : 'white'}
        className="notification"
        tag="span"
      >
        {message}
      </BodyCopy>
    </Col>
  );
};

export default withStyles(Notification, styles);
export { Notification as NotificationVanilla };
