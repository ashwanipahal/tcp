import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { Modal } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles, { modalStyles } from '../styles/CountrySelectorModal.style';

const CountrySelectorModal = ({ className, heading }) => {
  return (
    <Modal
      fixedWidth
      isOpen
      onRequestClose={false}
      heading={heading}
      overlayClassName="TCPModal__Overlay"
      className={`${className} TCPModal__Content shipToModal`}
      maxWidth="450px"
      minHeight="500px"
      inheritedStyles={modalStyles}
    >
      <BodyCopy
        component="div"
        color="gray.900"
        fontFamily="secondary"
        fontSize="fs18"
        textAlign="center"
      >
        Change Shipping Preference
      </BodyCopy>
    </Modal>
  );
};

CountrySelectorModal.propTypes = {
  className: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};

CountrySelectorModal.defaultPropTypes = {
  heading: 'Ship To',
};

export default withStyles(CountrySelectorModal, styles);
export { CountrySelectorModal as CountrySelectorModalVanilla };
