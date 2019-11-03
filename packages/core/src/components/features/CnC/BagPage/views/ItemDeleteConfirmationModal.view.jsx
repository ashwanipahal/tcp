import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import Button from '../../../../common/atoms/Button';
import Modal from '../../../../common/molecules/Modal';

import styles from '../styles/ItemDeleteConfirmationModal.style';
import ErrorMessage from '../../common/molecules/ErrorMessage';

const ItemDeleteConfirmationModal = ({
  labels,
  className,
  closeCheckoutConfirmationModal,
  isOpen,
  moveToSfl,
  confirmRemoveCartItem,
  bagPageServerError,
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
          fontSize={['fs16', 'fs14', 'fs14']}
          fontFamily="secondary"
          className="item-delete-confirmation-text"
          component="span"
          fontWeight="normal"
        >
          {modalHeading}
        </BodyCopy>
        <div className="button-container">
          <Button className="item-delete-button" onClick={moveToSfl}>
            <BodyCopy
              component="span"
              color="white"
              fontWeight="extrabold"
              fontFamily="secondary"
              fontSize="fs14"
            >
              {modalButtonSFL}
            </BodyCopy>
          </Button>
          <Button className="item-delete-button confirm-button" onClick={confirmRemoveCartItem}>
            <BodyCopy
              component="span"
              color="text.secondary"
              fontWeight="extrabold"
              fontFamily="secondary"
              fontSize="fs14"
            >
              {modalButtonConfirmDelete}
            </BodyCopy>
          </Button>
        </div>
        {bagPageServerError && (
          <ErrorMessage
            error={bagPageServerError.errorMessage}
            className="error_box bag-item-error"
          />
        )}
      </div>
    </Modal>
  );
};

ItemDeleteConfirmationModal.propTypes = {
  className: PropTypes.string.isRequired,
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
  bagPageServerError: PropTypes.shape({}),
};

ItemDeleteConfirmationModal.defaultProps = {
  isOpen: false,
  bagPageServerError: null,
};

export { ItemDeleteConfirmationModal as ItemDeleteConfirmationModalVanilla };
export default withStyles(ItemDeleteConfirmationModal, styles);
