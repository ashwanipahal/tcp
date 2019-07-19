import React from 'react';
import Modal from '../../../../common/molecules/Modal';

const AddedToBag = ({ openState, onRequestClose, addedToBagData, className  }) => {
  return (
    <Modal
      fixedWidth
      isOpen={openState}
      onRequestClose={onRequestClose}
      maxWidth="700px"
      minHeight="500px"
      heading={"ADDED TO BAG"}
      title={" Title ADDED TO BAG"}
      overlayClassName="TCPModal__Overlay"
      className={`TCPModal__Content, ${className}`}
      closeIconDataLocator="addressdeletemodalcrossicon"
    >
      <div className="addedToBagWrapper">
        Integrate here your
        {JSON.stringify(addedToBagData)}
      </div>
    </Modal>
  );
};

export default AddedToBag;
