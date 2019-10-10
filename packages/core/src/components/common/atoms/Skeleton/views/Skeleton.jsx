import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import style from '../Skeleton.style';

// To render the loader or skeleton
const Skeleton = ({ className, tagName: CustomTag, ...otherprops }) => {
  return <CustomTag className={className} {...otherprops} />;
};

Skeleton.propTypes = {
  className: PropTypes.string.isRequired,
  tagName: PropTypes.string,
  otherprops: PropTypes.shape({}),
};

Skeleton.defaultProps = {
  tagName: 'div',
  otherprops: {},
};

export default withStyles(Skeleton, style);
export { Skeleton as SkeletonVanilla };
