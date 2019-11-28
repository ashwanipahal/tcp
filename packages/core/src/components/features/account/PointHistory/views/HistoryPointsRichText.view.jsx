import React from 'react';
import PropTypes from 'prop-types';
import Espot from '@tcp/core/src/components/common/molecules/Espot';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/PointsHistoryPage.view.style';

export const HistoryPointsRichText = ({ content, className }) => {
  return <Espot richTextHtml={content} dataLocator="points_history_rte" className={className} />;
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
