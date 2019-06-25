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
  kind: 'p1',
  color: '#1a1a1a',
  inverted: false,
  align: 'left',
  weight: 'normal',
  size: 16,
};

BodyCopy.propTypes = {
  component: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
  // TODO: Need fix unused/proptypes eslint error
  /* eslint-disable */
  kind: PropTypes.oneOf(['p1', 'p2']),
  size: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  weight: PropTypes.oneOf(['normal', 'semibbold', 'extrabold', 'bold']),
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'red',
    'darkgray',
    'gray',
    'lightgray',
  ]),
  inverted: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'right', 'center', 'justify']),
  /* eslint-enable */
};

const StyledBodyCopy = withStyles(BodyCopy, styles);
StyledBodyCopy.defaultProps = BodyCopy.defaultProps;

export { BodyCopy as BodyCopyVanilla };
export default StyledBodyCopy;
