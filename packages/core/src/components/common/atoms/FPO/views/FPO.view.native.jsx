import React from 'react';
import BodyCopy from '../../BodyCopy';

/**
 * @param {object} props : Props for FPO
 * This dummy component which can be used as a placeholder to indicate that work is in progress for the same
 */
const FPO = () => {
  return (
    <BodyCopy
      mobilefontFamily={['secondary']}
      textAlign="center"
      fontWeight="black"
      fontSize="fs12"
      color="black"
      text="FPO"
    />
  );
};

FPO.defaultProps = {
  text: '',
};

export default FPO;
