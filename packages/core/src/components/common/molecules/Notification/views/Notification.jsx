import React from 'react';
import PropTypes from 'prop-types';
import { getIconPath } from '../../../../../utils';
import styles from '../Notification.style';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';

/**
 *
 * @param {String} className -  classname for the parent container
 * @param {String} status - to show error or success message
 * @param {String} message - error message
 * @param {node} children - notification child nodes.
 */
const Notification = ({ className, status, message, children }) => {
  const successIcon = getIconPath('circle-check-fill');
  const errorIcon = getIconPath('circle-error-fill');
  return (
    <div className={`${className} elem-pt-SM elem-pr-LRG elem-pb-SM elem-pl-LRG elem-mb-LRG`}>
      <img
        alt={status === 'success' ? 'success icon' : 'error icon'}
        src={status === 'success' ? successIcon : errorIcon}
        className="elem-mr-MED"
      />
      <BodyCopy fontSize="fs14" fontWeight="extrabold" fontFamily="secondary">
        {message}
        {children}
      </BodyCopy>
    </div>
  );
};

Notification.propTypes = {
  className: PropTypes.string,
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Notification.defaultProps = {
  className: '',
  children: null,
};

export default withStyles(Notification, styles);
export { Notification as NotificationVanilla };
