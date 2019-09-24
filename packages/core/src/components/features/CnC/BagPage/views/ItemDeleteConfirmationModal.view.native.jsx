import React from 'react';
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
  TransparentModalContainer,
} from '../styles/ItemDeleteConfirmationModal.style.native';

const closeIcon = require('../../../../../assets/close.png');

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
      <TransparentModalContainer>
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
              buttonVariation="variable-width"
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
              buttonVariation="variable-width"
              text={modalButtonConfirmDelete}
            />
          </ButtonWrapper>
        </StyledViewWrapper>
      </TransparentModalContainer>
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
