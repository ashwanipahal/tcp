import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '../../../../../atoms';

const QuickViewSkeleton = ({ inheritedStyles }) => {
  return <Spinner inheritedStyles={inheritedStyles} />;
};

QuickViewSkeleton.propTypes = {
  inheritedStyles: PropTypes.shape({}),
};

QuickViewSkeleton.defaultProps = {
  inheritedStyles: {},
};

export default QuickViewSkeleton;
