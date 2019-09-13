import React from 'react';
import PropTypes from 'prop-types';
import RichText from '@tcp/core/src/components/common/atoms/RichText';

export const HistoryPointsRichText = ({ content, className }) => {
  return <RichText richTextHtml={content} className={className} />;
};

HistoryPointsRichText.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
};

HistoryPointsRichText.defaultProps = {
  content: '',
  className: '',
};

export default HistoryPointsRichText;
