import React from 'react';
import Modal from '../../../../common/molecules/Modal';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/AddedToBag.style';

const AddedToBag = ({ openState, onRequestClose, addedToBagData, className }) => {
  return (
    <Modal
      fixedWidth
      isOpen={openState}
      onRequestClose={onRequestClose}
      heading="ADDED TO BAG"
      overlayClassName="TCPModal__Overlay"
      className={`TCPModal__Content, ${className}`}
      closeIconDataLocator="added-to-bg-close"
      aria={{
        labelledby: 'Added To Bag',
        describedby: 'Added To Bag Modal',
      }}
    >
      <div className="addedToBagWrapper">
        Integrate here your Integrate here your Integrate here yourIntegrate here yourIntegrate here
        yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate
        here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here
        yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate
        here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here
        yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate
        here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here
        yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate
        here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here
        yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate
        here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here
        yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate
        here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here
        yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate
        here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here
        yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate
        here yourIntegrate here yourIntegrate here your
        {JSON.stringify(addedToBagData)}
      </div>
    </Modal>
  );
};

export default withStyles(AddedToBag, styles);
export { AddedToBag as AddedToBagVanilla };
