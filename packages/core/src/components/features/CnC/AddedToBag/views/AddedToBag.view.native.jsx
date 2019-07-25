import React from 'react';
import { Text, View } from 'react-native';
import Modal from '../../../../common/molecules/Modal';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/AddedToBag.style';

// @flow
type Props = {
  openState: Function,
  onRequestClose: Function,
  className: string,
};

const AddedToBag = ({ openState, onRequestClose, className }: Props) => {
  return (
    <Modal
      fixedWidth
      isOpen={openState}
      onRequestClose={onRequestClose}
      heading="ADDED TO BAG"
      overlayClassName="TCPModal__Overlay"
      className={`TCPModal__Content, ${className}`}
      closeIconDataLocator="added-to-bg-close"
      animationType="slide"
      aria={{
        labelledby: 'Added To Bag',
        describedby: 'Added To Bag Modal',
      }}
    >
      <View className="addedToBagWrapper">
        <Text>Integrate here your Integrate here, Integrate here your Integrate here</Text>
      </View>
    </Modal>
  );
};

export default withStyles(AddedToBag, styles);
export { AddedToBag as AddedToBagVanilla };
