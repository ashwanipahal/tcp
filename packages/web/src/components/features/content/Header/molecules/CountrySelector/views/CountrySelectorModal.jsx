import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@tcp/core/src/components/common/molecules';

const CountrySelectorModal = ({ heading }) => {
  return (
    <Modal
      fixedWidth
      isOpen
      onRequestClose={false}
      heading={heading}
      overlayClassName="TCPModal__Overlay"
      className="TCPModal__Content countrySelectorModal"
      maxWidth="450px"
      minHeight="500px"
    >
      <div>Country Selctor</div>
    </Modal>
  );
};

CountrySelectorModal.propTypes = {
  heading: PropTypes.string.isRequired,
};

CountrySelectorModal.defaultPropTypes = {
  heading: 'Ship To',
};

export default CountrySelectorModal;
