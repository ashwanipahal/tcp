import React from 'react';
import PropTypes from 'prop-types';
import RichText from '@tcp/core/src/components/common/atoms/RichText';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/PointsHistoryPage.view.style';

export const HistoryPointsRichText = ({ content, className }) => {
  return <RichText richTextHtml={content} dataLocator="points_history_rte" className={className} />;
};

HistoryPointsRichText.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
};

HistoryPointsRichText.defaultProps = {
  content: '',
  className: '',
};

export default withStyles(HistoryPointsRichText, styles);
