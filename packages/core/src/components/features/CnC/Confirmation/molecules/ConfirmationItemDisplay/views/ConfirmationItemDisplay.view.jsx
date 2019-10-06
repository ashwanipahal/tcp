import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import styles from '../styles/ConfirmationItemDisplay.styles';
import withStyles from '../../../../../../common/hoc/withStyles';

/**
 * @function ConfirmationItemDisplay
 * @description renders the order tile description component.
 */
const ConfirmationItemDisplay = ({ className, title, children, boldFont }) => {
  return (
    <div className={className}>
      <BodyCopy fontFamily="secondary" fontSize="fs14" fontWeight="extrabold" textAlign="center">
        {title}
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs16"
          fontWeight={boldFont ? 'extrabold' : 'regular'}
          textAlign="center"
        >
          {children}
        </BodyCopy>
      </BodyCopy>
    </div>
  );
};
ConfirmationItemDisplay.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  boldFont: PropTypes.bool,
};
ConfirmationItemDisplay.defaultProps = {
  className: '',
  title: '',
  children: null,
  boldFont: false,
};

export default withStyles(ConfirmationItemDisplay, styles);
export { ConfirmationItemDisplay as ConfirmationItemDisplayVanilla };
