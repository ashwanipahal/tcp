import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

/**
 * @function ConfirmationItemDisplay
 * @description renders the order tile description component.
 */
const ConfirmationItemDisplay = ({ title, children, boldFont }) => {
  return (
    <>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs14"
        fontWeight="extrabold"
        textAlign="center"
        text={title}
      />

      <BodyCopy
        fontFamily="secondary"
        fontSize="fs16"
        fontWeight={boldFont ? 'extrabold' : 'regular'}
        textAlign="center"
        text={children}
      />
    </>
  );
};
ConfirmationItemDisplay.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  boldFont: PropTypes.bool,
};
ConfirmationItemDisplay.defaultProps = {
  title: '',
  children: null,
  boldFont: false,
};

export default ConfirmationItemDisplay;
