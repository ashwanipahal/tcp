import React from 'react';
import PropTypes from 'prop-types';
import Heading from '../../../../../../common/atoms/Heading';

export const FormPageHeading = ({ heading }) => {
  return (
    <Heading
      text={heading}
    />
  );
};

FormPageHeading.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default FormPageHeading;
