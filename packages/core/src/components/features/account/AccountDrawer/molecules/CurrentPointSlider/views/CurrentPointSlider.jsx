import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/CurrentPointSlider.style';

const CurrentPointSlider = className => {
  return <div className={className}>This is CurrentPointSlider</div>;
};

CurrentPointSlider.propTypes = {
  labels: PropTypes.shape({}),
};

CurrentPointSlider.defaultProps = {
  labels: {
    CREATE_ACC_LBL_HIDE: 'hide',
  },
};

export default withStyles(CurrentPointSlider, styles);
export { CurrentPointSlider as CurrentPointSliderVanilla };
