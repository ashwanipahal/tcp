import React from 'react';
import { PropTypes } from 'prop-types';

import withStyles from '../../../hoc/withStyles';
import styles from '../BodyCopy.style';

const BodyCopy = ({ children, className, component: Component, ...others }) => {
  return (
    <Component className={className} {...others}>
      {children}
    </Component>
  );
};

BodyCopy.defaultProps = {
  component: 'p',
  className: null,
  children: null,
  fontFamily: 'primary',
  fontSize: 12,
  fontWeight: 'regular',
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
  fontFamily: PropTypes.oneOfType([PropTypes.Array, PropTypes.oneOf(['primary', 'secondary'])]),
  fontSize: PropTypes.oneOfType([
    PropTypes.Array,
    PropTypes.oneOf([
      'fs48',
      'fs42',
      'fs36',
      'fs32',
      'fs28',
      'fs24',
      'fs22',
      'fs18',
      'fs16',
      'fs14',
      'fs12',
      'fs10',
    ]),
  ]),
  fontWeight: PropTypes.oneOfType([
    PropTypes.Array,
    PropTypes.oneOf(['regular', 'semibold', 'extrabold', 'black']),
  ]),
  lineHeight: PropTypes.oneOf(['normal']),
  letterSpacing: PropTypes.oneOfType([
    PropTypes.Array,
    PropTypes.oneOf(['ls271', 'ls257', 'ls222', 'ls167', 'normal']),
  ]),
  textAlign: PropTypes.oneOfType([PropTypes.Array, PropTypes.oneOf(['left', 'center', 'right'])]),
  color: PropTypes.oneOfType([
    PropTypes.Array,
    PropTypes.oneOf(['text.primary', 'text.secondary', 'text.hint', 'text.disabled', 'white']),
  ]),
  dataLocator: PropTypes.string,
  /* eslint-enable */
};

const StyledBodyCopy = withStyles(BodyCopy, styles);
StyledBodyCopy.defaultProps = BodyCopy.defaultProps;

export { BodyCopy as BodyCopyVanilla };
export default StyledBodyCopy;
