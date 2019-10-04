import React, { useEffect } from 'react';
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
const Notification = ({ className, status, alt, message, children, scrollIntoView }) => {
  const successIcon = getIconPath('circle-check-fill');
  const errorIcon = getIconPath('circle-error-fill');
  const infoIcon = getIconPath('circle-info-fill');

  let imageAlt = '';
  let imageSrc = '';
  if (status === 'success') {
    imageSrc = successIcon;
    imageAlt = alt || 'success icon';
  }
  if (status === 'error') {
    imageSrc = errorIcon;
    imageAlt = alt || 'error icon';
  }
  if (status === 'info') {
    imageSrc = infoIcon;
    imageAlt = alt || 'info icon';
  }

  // For window scroll up to top once component gets loaded.
  useEffect(() => {
    if (scrollIntoView) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <div className={`${className} elem-pt-SM elem-pr-LRG elem-pb-SM elem-pl-LRG elem-mb-LRG`}>
      <img alt={imageAlt} src={imageSrc} className="notification__image elem-mr-MED" />
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
  alt: PropTypes.string,
  children: PropTypes.node,
  scrollIntoView: PropTypes.bool,
};

Notification.defaultProps = {
  className: '',
  children: null,
  alt: '',
  scrollIntoView: false,
};

export default withStyles(Notification, styles);
export { Notification as NotificationVanilla };
