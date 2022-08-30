import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../BodyCopy';

/**
 * @param {object} props : Props for FPO
 * This dummy component which can be used as a placeholder to indicate that work is in progress for the same
 */
const FPO = ({ text }) => {
  return (
    <BodyCopy fontSize="fs22" fontWeight="black" textAlign="center">
      {'FPO'}
      {text ? ` - ${text}` : ''}
    </BodyCopy>
  );
};

FPO.propTypes = {
  text: PropTypes.string,
};

FPO.defaultProps = {
  text: '',
};

export default FPO;
