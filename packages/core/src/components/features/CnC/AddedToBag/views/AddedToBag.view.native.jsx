import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import Modal from '../../../../common/molecules/Modal';
import withStyles from '../../../../common/hoc/withStyles';
import { styles, PlaceHolderView, StyledText } from '../styles/AddedToBag.style.native';

const AddedToBag = ({ openState, onRequestClose, className }) => {
  return (
    <Modal
      fixedWidth
      isOpen={openState}
      onRequestClose={onRequestClose}
      overlayClassName="TCPModal__Overlay"
      className={`TCPModal__Content, ${className}`}
      closeIconDataLocator="added-to-bg-close"
      animationType="slide"
      headingAlign="left"
      aria={{
        labelledby: 'Added to bag',
        describedby: 'Added to bag Modal',
      }}
    >
      <StyledText>ADDED TO BAG</StyledText>
      {/* Below are place holders for different data on added to Bag Modal. Replace <PlaceHolderView> with <View> and use your component within it. */}
      <PlaceHolderView className="ProductInformationView">
        <Text>ProductInformationView</Text>
      </PlaceHolderView>
      <PlaceHolderView className="AddedToBagViewPoints">
        <Text>AddedToBagViewPoints</Text>
      </PlaceHolderView>
      <PlaceHolderView className="AddedToBagActions">
        <Text>AddedToBagActions</Text>
      </PlaceHolderView>
      <PlaceHolderView className="BossBannerView">
        <Text>BossBannerView</Text>
      </PlaceHolderView>
    </Modal>
  );
};

AddedToBag.propTypes = {
  openState: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  // labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
};

export default withStyles(AddedToBag, styles);
export { AddedToBag as AddedToBagVanilla };
