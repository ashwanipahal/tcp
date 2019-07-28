import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Modal from '../../../../common/molecules/Modal';
import withStyles from '../../../../common/hoc/withStyles';
import { styles } from '../styles/AddedToBag.style.native';
import AddedToBagViewPoints from '../../AddedToBagViewPoints';
import AddedToBagActions from '../../AddedToBagActions/views/AddedToBagActions.native';

const AddedToBag = ({ openState, onRequestClose, className, labels }) => {
  return (
    <Modal
      fixedWidth
      isOpen={openState}
      onRequestClose={onRequestClose}
      heading={labels.addedToBag}
      overlayClassName="TCPModal__Overlay"
      className={`TCPModal__Content, ${className}`}
      closeIconDataLocator="added-to-bg-close"
      animationType="slide"
      headingAlign="left"
      aria={{
        labelledby: `${labels.addedToBag}`,
        describedby: `${labels.addedToBag}`,
      }}
    >
      {/* Below are place holders for different data on added to Bag Modal. Replace <PlaceHolderView> with <View> and use your component within it. */}

      <View>
        <AddedToBagViewPoints />
        <AddedToBagActions />
      </View>
    </Modal>
  );
};

AddedToBag.propTypes = {
  openState: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
};

export default withStyles(AddedToBag, styles);
export { AddedToBag as AddedToBagVanilla };
