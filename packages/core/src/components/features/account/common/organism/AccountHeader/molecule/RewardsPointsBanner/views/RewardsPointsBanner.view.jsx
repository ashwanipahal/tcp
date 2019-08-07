import React from 'react';
import PropTypes from 'prop-types';

import RichText from '../../../../../../../../common/atoms/RichText';

export const RewardsPointsBanner = ({ content, className }) => {
  return <RichText richTextHtml={content} className={className} />;
};

RewardsPointsBanner.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
};

RewardsPointsBanner.defaultProps = {
  content: '',
  className: '',
};

export default RewardsPointsBanner;
