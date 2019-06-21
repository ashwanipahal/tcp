import React from 'react';
import { PropTypes } from 'prop-types';

import withStyles from '../../../hoc/withStyles';

import styles from '../Heading.style';

const Heading = ({ children, className, component: Component }) => (
  <Component className={className}>{children}</Component>
);

Heading.defaultProps = {
  component: 'h1',
  className: null,
  children: null,
};

Heading.propTypes = {
  component: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default withStyles(Heading, styles);
export { Heading as HeadingVanilla };
