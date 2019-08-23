import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/style';

class ContactInfoDisplay extends React.PureComponent {
  render() {
    const { className } = this.props;
    return <div className={className}>ContactInfoDisplay</div>;
  }
}

ContactInfoDisplay.propTypes = {
  className: PropTypes.string.isRequired,
  contactDetails: PropTypes.shape({}).isRequired,
};

export default withStyles(ContactInfoDisplay, styles);
export { ContactInfoDisplay as ContactInfoDisplayVanilla };
