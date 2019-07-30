import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../common/molecules/Modal';
import withStyles from '../../../../common/hoc/withStyles';
import { styles, StyledText, AddedToBagWrapper } from '../styles/AddedToBag.style.native';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import ProductInformation from '../molecules/ProductInformation/views/ProductInformation.views.native';
import BossBanner from '../molecules/BossBanner/views/BossBanner.views.native';
import AddedToBagViewPoints from '../../AddedToBagViewPoints';
import AddedToBagActions from '../../AddedToBagActions/views/AddedToBagActions.native';

const AddedToBag = ({ openState, onRequestClose, className, addedToBagData, labels }) => {
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
        labelledby: `${labels.addedToBag}`,
        describedby: `${labels.addedToBag}`,
      }}
    >
      <StyledText>
        <BodyCopy
          mobilefontFamily={['secondary']}
          fontWeight="semibold"
          fontSize="fs16"
          text={labels.addedToBag}
          color="black"
        />
      </StyledText>
      {/* Below are place holders for different data on added to Bag Modal. Replace <PlaceHolderView> with <View> and use your component within it. */}
      <AddedToBagWrapper>
        <ProductInformation data={addedToBagData} labels={labels} />
        <AddedToBagViewPoints labels={labels} />
        <AddedToBagActions labels={labels} />
        <BossBanner labels={labels} />
      </AddedToBagWrapper>
    </Modal>
  );
};

AddedToBag.propTypes = {
  openState: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  addedToBagData: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
};

export default withStyles(AddedToBag, styles);
export { AddedToBag as AddedToBagVanilla };
