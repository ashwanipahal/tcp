import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../common/molecules/Modal';
import {
  StyledAnchorWrapper,
  StyledWrapper,
  AddedToBagWrapper,
} from '../styles/AddedToBag.style.native';
import ProductInformation from '../molecules/ProductInformation/views/ProductInformation.views.native';
import BossBanner from '../molecules/BossBanner/views/BossBanner.views.native';
import AddedToBagViewPoints from '../../AddedToBagViewPoints';
import AddedToBagActions from '../../AddedToBagActions';
import Anchor from '../../../../common/atoms/Anchor';

const AddedToBag = ({
  openState,
  onRequestClose,
  addedToBagData,
  labels,
  quantity,
  handleContinueShopping,
  navigation,
}) => {
  return (
    <Modal
      isOpen={openState}
      onRequestClose={onRequestClose}
      closeIconDataLocator="added-to-bg-close"
      animationType="slide"
      headingAlign="left"
      heading={labels.addedToBag}
      headingFontFamily="secondary"
      headingFontWeight="semibold"
      horizontalBar={false}
      fontSize="fs16"
      aria={{
        labelledby: `${labels.addedToBag}`,
        describedby: `${labels.addedToBag}`,
      }}
    >
      <StyledWrapper>
        {/* Below are place holders for   different data on added to Bag Modal. Replace <PlaceHolderView> with <View> and use your component within it. */}
        <AddedToBagWrapper>
          <ProductInformation data={addedToBagData} labels={labels} quantity={quantity} />
          <AddedToBagViewPoints labels={labels} />
          <AddedToBagActions
            labels={labels}
            navigation={navigation}
            closeModal={onRequestClose}
            showAddTobag
            fromAddedToBagModal
          />
          <BossBanner labels={labels} />
          <StyledAnchorWrapper>
            <Anchor
              fontSizeVariation="medium"
              underline
              anchorVariation="primary"
              onPress={handleContinueShopping}
              noLink
              to=""
              dataLocator="addedToBag-continueShopping"
              text={labels.continueShopping}
            />
          </StyledAnchorWrapper>
        </AddedToBagWrapper>
      </StyledWrapper>
    </Modal>
  );
};

AddedToBag.propTypes = {
  openState: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  addedToBagData: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  quantity: PropTypes.string.isRequired,
  handleContinueShopping: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}),
};

AddedToBag.defaultProps = {
  navigation: null,
};

export default AddedToBag;
export { AddedToBag as AddedToBagVanilla };
