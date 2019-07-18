import React from 'react';
import Modal from '../../../../common/molecules/Modal';

const AddedToBag = ({ openState, onRequestClose }) => {
  return (
    <Modal
      fixedWidth
      isOpen={openState}
      onRequestClose={onRequestClose}
      maxWidth="700px"
      minHeight="500px"
    />
  );
};

export default AddedToBag;
