import React from 'react';
import { PropTypes } from 'prop-types';

import withStyles from '../../../hoc/withStyles';
import styles from '../Heading.style';

const headingTypes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const Heading = ({ children, className, component, kind }) => {
  const componentKind = headingTypes.indexOf(kind) !== -1 ? kind : 'h1';
  const Component = component || componentKind;
  return <Component className={className}>{children}</Component>;
};

Heading.defaultProps = {
  component: null,
  className: null,
  children: null,
  kind: 'h1',
  color: '#1a1a1a',
  mode: 'light',
  inverted: false,
  align: 'left',
};

Heading.propTypes = {
  component: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
  kind: PropTypes.oneOf(headingTypes),
  // TODO: Need fix unused/proptypes eslint error
  /* eslint-disable */
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'red',
    'darkgray',
    'gray',
    'lightgray',
  ]),
  mode: PropTypes.oneOf(['light', 'dark']),
  inverted: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'right', 'center', 'justify']),
  /* eslint-enable */
};

const StyledHeading = withStyles(Heading, styles);
StyledHeading.defaultProps = Heading.defaultProps;

export { Heading as HeadingVanilla };
export default StyledHeading;
