import React from 'react';
import PropTypes from 'prop-types';
import Heading from '../../../../../../common/atoms/Heading';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/FormPageHeading.styles';

export const FormPageHeading = ({ className, heading, ...otherProps }) => {
  return (
    <Heading variant="h6" className={className} {...otherProps}>
      {heading}
    </Heading>
  );
};

FormPageHeading.propTypes = {
  className: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};

export default withStyles(FormPageHeading, styles);
