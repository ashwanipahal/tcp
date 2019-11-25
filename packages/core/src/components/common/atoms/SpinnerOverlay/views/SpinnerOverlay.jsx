import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import Spinner from '../../Spinner';
import styles from '../SpinnerOverlay.style';

const SpinnerOverlay = ({ className }) => {
  return (
    <div className={className}>
      <div id="default_spinner_overlay" className="spinner-overlay">
        <Spinner />
      </div>
    </div>
  );
};

SpinnerOverlay.defaultProps = {
  className: '',
};

SpinnerOverlay.propTypes = {
  className: PropTypes.string,
};

export default withStyles(SpinnerOverlay, styles);
export { SpinnerOverlay as SpinnerOverlayVanilla };
