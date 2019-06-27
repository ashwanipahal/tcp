import React from 'react';
import { PropTypes } from 'prop-types';

import withStyles from '../../../hoc/withStyles';
import styles from '../BodyCopy.style';

const BodyCopy = ({ children, className, component: Component }) => {
  return <Component className={className}>{children}</Component>;
};

BodyCopy.defaultProps = {
  component: 'p',
  className: null,
  children: null,
  fontFamily: 'primary',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: 'normal',
  letterSpacing: 'normal',
  textAlign: 'left',
  color: 'text.primary',
};

BodyCopy.propTypes = {
  component: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
  // TODO: Need fix unused/proptypes eslint error
  /* eslint-disable */
  fontFamily: PropTypes.oneOf(['primary', 'secondary']),
  fontSize: PropTypes.oneOf([2, 3, 5, 6, 7, 8, 9, 11, 12, 13, 15, 16]),
  fontWeight: PropTypes.oneOf(['normal', 'semibold', 'extrabold', 'bold']),
  lineHeight: PropTypes.oneOf(['normal']),
  letterSpacing: PropTypes.oneOf([1, 2, 3, 4, 'normal']),
  textAlign: PropTypes.oneOf(['left', 'center']),
  color: PropTypes.oneOf(['text.primary', 'text.secondary', 'text.hint', 'text.disabled', 'white']),
  /* eslint-enable */
};

const StyledBodyCopy = withStyles(BodyCopy, styles);
StyledBodyCopy.defaultProps = BodyCopy.defaultProps;

export { BodyCopy as BodyCopyVanilla };
export default StyledBodyCopy;
