import React from 'react';
import PropTypes from 'prop-types';
import { getIconPath } from '../../../../../utils';
import styles from '../Notification.style';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';

const Notification = ({ className, status, message }) => {
  const successIcon = getIconPath('circle-check-fill');
  const errorIcon = getIconPath('circle-error-fill');
  return (
    <div className={`${className} elem-pt-SM elem-pr-LRG elem-pb-SM elem-pl-LRG elem-mb-LRG`}>
      <img
        alt={status === 'success' ? 'success icon' : 'error icon'}
        src={status === 'success' ? successIcon : errorIcon}
        className="elem-mr-MED"
      />
      <BodyCopy fontSize="fs14" fontWeight="extrabold">
        {message}
      </BodyCopy>
    </div>
  );
};

Notification.propTypes = {
  className: PropTypes.string,
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

Notification.defaultProps = {
  className: '',
};

export default withStyles(Notification, styles);
export { Notification as NotificationVanilla };
