import React from 'react';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import Modal from '../../../../common/molecules/Modal';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import {
  StyledAnchorWrapper,
  StyledWrapper,
  AddedToBagWrapper,
  RowWrapper,
  ModalHeading,
  ImageWrapper,
  StyledTouchableOpacity,
  StyledCrossImage,
} from '../styles/AddedToBag.style.native';
import ProductInformation from '../molecules/ProductInformation/views/ProductInformation.views.native';
import BossBanner from '../molecules/BossBanner/views/BossBanner.views.native';
import AddedToBagViewPoints from '../../AddedToBagViewPoints';
import AddedToBagActions from '../../AddedToBagActions';
import Anchor from '../../../../common/atoms/Anchor';
import LoyaltyBanner from '../../LoyaltyBanner';

const closeIcon = require('../../../../../assets/close.png');

const getContainerStyle = navigation => {
  if (!navigation.getParam('headerMode', false)) {
    return { flex: 1, paddingLeft: 25, backgroundColor: 'rgba(0, 0, 0, 0.5)' };
  }
  return { flex: 1, paddingLeft: 0, paddingRight: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' };
};

const getCloseIcon = (onRequestClose, labels) => {
  return (
    <ImageWrapper>
      <StyledTouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={labels.close}
        onPress={onRequestClose}
      >
        <StyledCrossImage source={closeIcon} />
      </StyledTouchableOpacity>
    </ImageWrapper>
  );
};

const getRowWrapper = (labels, onRequestClose, navigation) => {
  if (!navigation.getParam('headerMode', false)) {
    return (
      <RowWrapper>
        <ModalHeading>
          <BodyCopy
            mobileFontFamily="secondary"
            fontWeight="semibold"
            fontSize="fs16"
            text={labels.addedToBag}
          />
        </ModalHeading>
        {getCloseIcon(onRequestClose, labels)}
      </RowWrapper>
    );
  }
  return <RowWrapper />;
};

const AddedToBag = ({
  openState,
  onRequestClose,
  addedToBagData,
  labels,
  quantity,
  handleContinueShopping,
  navigation,
  hideHeader,
}) => {
  return (
    <Modal
      isOpen={openState}
      onRequestClose={onRequestClose}
      closeIconDataLocator="added-to-bg-close"
      animationType="none"
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
      customTransparent
    >
      <TouchableOpacity
        accessibilityLabel={labels.overlayAriaText}
        accessibilityRole="none"
        onPress={onRequestClose}
        style={getContainerStyle(navigation)}
      >
        <TouchableWithoutFeedback accessibilityRole="none">
          <StyledWrapper>
            {getRowWrapper(labels, onRequestClose, navigation)}
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
                hideHeader={hide => {
                  navigation.setParams({ headerMode: hide });
                }}
              />
              <BossBanner labels={labels} />
              {<LoyaltyBanner pageCategory="isAddedToBagPage" />}
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
        </TouchableWithoutFeedback>
      </TouchableOpacity>
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
  isPayPalWebViewEnable: PropTypes.bool.isRequired,
  hideHeader: PropTypes.bool.isRequired,
};

AddedToBag.defaultProps = {
  navigation: null,
};

export default AddedToBag;
export { AddedToBag as AddedToBagVanilla };
