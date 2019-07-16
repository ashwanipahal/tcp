import React from 'react';
import { PropTypes } from 'prop-types';

import withStyles from '../../../hoc/withStyles';
import styles from '../Heading.style';

const headingVariants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'nav', 'listMenu'];
const Heading = ({ children, className, component, variant, ...others }) => {
  let componentVariant = headingVariants.indexOf(variant) !== -1 ? variant : 'h1';
  componentVariant = componentVariant === 'listMenu' ? 'li' : componentVariant;
  const Component = component || componentVariant;
  return (
    <Component className={className} {...others}>
      {children}
    </Component>
  );
};

Heading.defaultProps = {
  component: null,
  className: null,
  children: null,
  variant: 'h1',
  color: 'text.primary',
  textAlign: 'left',
};

Heading.propTypes = {
  component: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.oneOf(headingVariants),
  // TODO: Need fix unused/proptypes eslint error
  /* eslint-disable */
  color: PropTypes.string,
  textAlign: PropTypes.oneOf(['left', 'center']),
  dataLocator: PropTypes.string,
  /* eslint-enable */
};

const StyledHeading = withStyles(Heading, styles);
StyledHeading.defaultProps = Heading.defaultProps;

export { Heading as HeadingVanilla };
export default StyledHeading;
