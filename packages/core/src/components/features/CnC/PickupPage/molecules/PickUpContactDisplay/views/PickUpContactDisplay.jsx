import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/style';

class PickUpContactDisplay extends React.PureComponent {
  render() {
    const { className } = this.props;
    return <div className={className}>PickUpContactDisplay</div>;
  }
}

PickUpContactDisplay.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(PickUpContactDisplay, styles);
