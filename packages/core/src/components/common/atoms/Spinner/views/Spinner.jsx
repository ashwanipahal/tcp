import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/Spinner';

const Spinner = ({ className }) => {
  return (
    <div className={className}>
      <div className="tcp-circle">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

Spinner.propTypes = {
  className: PropTypes.string,
};
Spinner.defaultProps = {
  className: '',
};

export default withStyles(Spinner, styles);
