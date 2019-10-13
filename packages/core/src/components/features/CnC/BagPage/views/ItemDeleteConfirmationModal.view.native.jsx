import React from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import Button from '../../../../common/atoms/Button';
import Modal from '../../../../common/molecules/Modal';
import {
  StyledViewWrapper,
  ButtonWrapper,
  StyledHeader,
  ImageWrapper,
  StyledTouchableOpacity,
  StyledText,
  StyledCrossImage,
} from '../styles/ItemDeleteConfirmationModal.style.native';

const closeIcon = require('../../../../../assets/close.png');

const styles = {
  TransparentModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

const ItemDeleteConfirmationModal = ({
  labels,
  closeCheckoutConfirmationModal,
  isOpen,
  moveToSfl,
  confirmRemoveCartItem,
}) => {
  const { modalTitle, modalHeading, modalButtonSFL, modalButtonConfirmDelete } = labels;
  return (
    <Modal isOpen={isOpen} customTransparent>
      <TouchableOpacity
        accessibilityLabel="Tap to close it"
        accessibilityRole="none"
        onPress={closeCheckoutConfirmationModal}
        style={styles.TransparentModalContainer}
      >
        <View>
          <TouchableWithoutFeedback accessibilityRole="none">
            <StyledViewWrapper>
              <ImageWrapper>
                <StyledTouchableOpacity onPress={closeCheckoutConfirmationModal}>
                  <StyledCrossImage source={closeIcon} />
                </StyledTouchableOpacity>
              </ImageWrapper>
              <StyledHeader>
                <BodyCopy
                  fontSize="fs16"
                  fontFamily="secondary"
                  fontWeight="regular"
                  text={modalTitle}
                  textAlign="center"
                />
              </StyledHeader>
              <StyledText>
                <BodyCopy
                  fontSize="fs16"
                  mobileFontFamily="secondary"
                  fontWeight="regular"
                  text={modalHeading}
                  textAlign="center"
                />
              </StyledText>
              <ButtonWrapper>
                <Button
                  fill="BLUE"
                  type="submit"
                  color="white"
                  onPress={moveToSfl}
                  text={modalButtonSFL}
                />
              </ButtonWrapper>
              <ButtonWrapper>
                <Button
                  fill="WHITE"
                  type="submit"
                  color="gray"
                  fontWeight="extrabold"
                  onPress={confirmRemoveCartItem}
                  text={modalButtonConfirmDelete}
                />
              </ButtonWrapper>
            </StyledViewWrapper>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

ItemDeleteConfirmationModal.propTypes = {
  labels: PropTypes.shape({
    modalTitle: PropTypes.string.isRequired,
    modalHeading: PropTypes.string.isRequired,
    modalButtonSFL: PropTypes.string.isRequired,
    modalButtonConfirmDelete: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool,
  closeCheckoutConfirmationModal: PropTypes.func.isRequired,
  moveToSfl: PropTypes.func.isRequired,
  confirmRemoveCartItem: PropTypes.func.isRequired,
};

ItemDeleteConfirmationModal.defaultProps = {
  isOpen: false,
};

export default ItemDeleteConfirmationModal;
