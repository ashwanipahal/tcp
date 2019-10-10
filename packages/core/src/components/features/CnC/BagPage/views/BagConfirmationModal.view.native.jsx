import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import Button from '../../../../common/atoms/Button';
import Modal from '../../../../common/molecules/Modal';
import { getLocator } from '../../../../../utils';
import {
  StyledViewWrapper,
  ButtonWrapper,
  StyledText,
} from '../styles/BagConfirmationModal.style.native';

const BagConfirmationModal = ({
  labels: { confirmationText, backToBag, continueCheckout },
  closeCheckoutConfirmationModal,
  removeUnqualifiedItemsAndCheckout,
  isOpen,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeCheckoutConfirmationModal}
      closeIconDataLocator="BagConfirmationmodalcrossicon"
      heading="  "
      headingAlign="left"
      headingFontFamily="secondary"
      horizontalBar={false}
    >
      <StyledViewWrapper>
        <StyledText>
          <BodyCopy
            fontSize="fs16"
            fontFamily="secondary"
            fontWeight="regular"
            data-locator={getLocator(`couponDetailModal__NameLbl`)}
            text={confirmationText}
            textAlign="center"
          />
        </StyledText>
        <ButtonWrapper>
          <Button
            fill="DARK"
            type="submit"
            color="white"
            onPress={closeCheckoutConfirmationModal}
            text={backToBag}
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            fill="BLUE"
            type="submit"
            color="white"
            onPress={removeUnqualifiedItemsAndCheckout}
            text={continueCheckout}
          />
        </ButtonWrapper>
      </StyledViewWrapper>
    </Modal>
  );
};
BagConfirmationModal.propTypes = {
  labels: PropTypes.shape({}),
  isOpen: PropTypes.bool,
  closeCheckoutConfirmationModal: PropTypes.func.isRequired,
  removeUnqualifiedItemsAndCheckout: PropTypes.func.isRequired,
};

BagConfirmationModal.defaultProps = {
  labels: {
    confirmationText:
      'Some of the item(s) in your bag are either sold out or need updating. Continuing with checkout will remove them from your bag.',
    backToBag: 'BACK TO BAG',
    continueCheckout: 'CONTINUE TO CHECKOUT',
  },
  isOpen: false,
};

export default BagConfirmationModal;
