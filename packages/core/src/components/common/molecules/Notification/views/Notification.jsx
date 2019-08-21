import React from 'react';
import { getIconPath } from '../../../../../utils';
import Col from '../../../atoms/Col';
import styles from '../Notification.style';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';

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
      {status === 'success' && <img alt="success icon" src={successIcon} />}
      <BodyCopy
        fontSize="fs12"
        color={status === 'success' ? 'darkGray' : 'white'}
        className="notification"
        component="span"
      >
        {message}
      </BodyCopy>
    </Col>
  );
};

export default withStyles(Notification, styles);
export { Notification as NotificationVanilla };
