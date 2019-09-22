import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import Button from '../../../../common/atoms/Button';
import Modal from '../../../../common/molecules/Modal';
import { getLocator } from '../../../../../utils';

import styles from '../styles/ItemDeleteConfirmationModal.style';

const ItemDeleteConfirmationModal = ({
  labels,
  className,
  closeCheckoutConfirmationModal,
  isOpen,
  moveToSfl,
  confirmRemoveCartItem,
}) => {
  const { modalTitle, modalHeading, modalButtonSFL, modalButtonConfirmDelete } = labels;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeCheckoutConfirmationModal}
      overlayClassName="TCPModal__Overlay"
      className={`${className} TCPModal__Content`}
      fixedWidth
      closeIconDataLocator="coupondetailmodalcrossicon"
      innerContentClassName="item-delete-confirmation-modal"
    >
      <div className="modal-content">
        <BodyCopy
          className="item-delete-confirmation-title"
          fontSize="fs16"
          fontFamily="secondary"
          component="span"
          fontWeight="extrabold"
        >
          {modalTitle}
        </BodyCopy>
        <BodyCopy
          fontSize="fs16"
          fontFamily="secondary"
          className="item-delete-confirmation-text"
          component="span"
          fontWeight="normal"
        >
          {modalHeading}
        </BodyCopy>
        <div className="button-container">
          <Button
            data-locator={getLocator('addedtobag_btncheckout')}
            className="confirmation-button back-to-bag"
            onClick={moveToSfl}
          >
            <BodyCopy
              component="span"
              color="white"
              fontWeight="extrabold"
              fontFamily="secondary"
              fontSize={['fs13', 'fs13', 'fs14']}
              onClick={() => {}}
            >
              {modalButtonSFL}
            </BodyCopy>
          </Button>
          <Button
            data-locator={getLocator('addedtobag_btncheckout')}
            className="confirmation-button confirm-checkout"
            onClick={confirmRemoveCartItem}
          >
            <BodyCopy
              component="span"
              color="text.secondary"
              fontWeight="extrabold"
              fontFamily="secondary"
              fontSize={['fs13', 'fs13', 'fs14']}
              onClick={() => {}}
            >
              {modalButtonConfirmDelete}
            </BodyCopy>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

ItemDeleteConfirmationModal.propTypes = {
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
  isOpen: PropTypes.bool,
  closeCheckoutConfirmationModal: PropTypes.func.isRequired,
  moveToSfl: PropTypes.func.isRequired,
  confirmRemoveCartItem: PropTypes.func.isRequired,
};

ItemDeleteConfirmationModal.defaultProps = {
  isOpen: false,
};

export { ItemDeleteConfirmationModal as ItemDeleteConfirmationModalVanilla };
export default withStyles(ItemDeleteConfirmationModal, styles);
