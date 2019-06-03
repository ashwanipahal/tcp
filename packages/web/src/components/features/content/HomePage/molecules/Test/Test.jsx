import React from 'react';
import { PropTypes } from 'prop-types';
import StyledTest from './styles/Test.style';

const Test = ({ className }) => <StyledTest className={className}>Testing 123...</StyledTest>;

Test.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Test;
