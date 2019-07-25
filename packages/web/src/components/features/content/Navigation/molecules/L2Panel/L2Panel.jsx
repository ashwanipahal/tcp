import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from './L2Panel.style';

const L2Panel = props => {
  const { openPanel, className, panelData } = props;
  return (
    <div className={`${className} nav-bar-l2-panel`}>
      {openPanel && panelData.map(data => data)}
    </div>
  );
};

L2Panel.propTypes = {
  className: PropTypes.string.isRequired,
  openPanel: PropTypes.bool.isRequired,
  panelData: PropTypes.shape([]).isRequired,
};

export default withStyles(L2Panel, style);
