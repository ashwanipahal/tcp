import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../common/molecules/Modal';
import {
  StyledAnchorWrapper,
  StyledWrapper,
  StyledText,
  AddedToBagWrapper,
} from '../styles/AddedToBag.style.native';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import ProductInformation from '../molecules/ProductInformation/views/ProductInformation.views.native';
import BossBanner from '../molecules/BossBanner/views/BossBanner.views.native';
import AddedToBagViewPoints from '../../AddedToBagViewPoints';
import AddedToBagActions from '../../AddedToBagActions/views/AddedToBagActions.native';
import Anchor from '../../../../common/atoms/Anchor';

const AddedToBag = ({
  openState,
  onRequestClose,
  addedToBagData,
  labels,
  quantity,
  handleContinueShopping,
}) => {
  return (
    <Modal
      isOpen={openState}
      onRequestClose={onRequestClose}
      closeIconDataLocator="added-to-bg-close"
      animationType="slide"
      headingAlign="left"
      aria={{
        labelledby: `${labels.addedToBag}`,
        describedby: `${labels.addedToBag}`,
      }}
    >
      <StyledWrapper>
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
          <ProductInformation data={addedToBagData} labels={labels} quantity={quantity} />
          <AddedToBagViewPoints labels={labels} />
          <AddedToBagActions labels={labels} />
          <BossBanner labels={labels} />
          <StyledAnchorWrapper>
            <Anchor
              fontSizeVariation="medium"
              underline
              anchorVariation="primary"
              onPress={handleContinueShopping}
              noLink
              to=""
              data-locator="addedToBag-continueShopping"
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
};

export default AddedToBag;
export { AddedToBag as AddedToBagVanilla };
