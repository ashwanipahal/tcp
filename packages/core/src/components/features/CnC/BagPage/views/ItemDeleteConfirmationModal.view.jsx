import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import Button from '../../../../common/atoms/Button';
import Modal from '../../../../common/molecules/Modal';
import { getLocator } from '../../../../../utils';

import styles from '../styles/ItemDeleteConfirmationModal.style';

const BagConfirmationModal = ({
  className,
  closeCheckoutConfirmationModal,
  removeUnqualifiedItemsAndCheckout,
  isOpen,
  moveToSfl,
}) => {
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
          Want to save it instead?
        </BodyCopy>
        <BodyCopy
          fontSize="fs16"
          fontFamily="secondary"
          className="item-delete-confirmation-text"
          component="span"
          fontWeight="normal"
        >
          It’ll be in the Saved For Later section when you’re ready to shop.
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
              YES, SAVE FOR LATER
            </BodyCopy>
          </Button>
          <Button
            data-locator={getLocator('addedtobag_btncheckout')}
            className="confirmation-button confirm-checkout"
            onClick={removeUnqualifiedItemsAndCheckout}
          >
            <BodyCopy
              component="span"
              color="text.secondary"
              fontWeight="extrabold"
              fontFamily="secondary"
              fontSize={['fs13', 'fs13', 'fs14']}
              onClick={() => {}}
            >
              NO THANKS
            </BodyCopy>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
BagConfirmationModal.propTypes = {
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
  isOpen: PropTypes.bool,
  closeCheckoutConfirmationModal: PropTypes.func.isRequired,
  removeUnqualifiedItemsAndCheckout: PropTypes.func.isRequired,
  moveToSfl: PropTypes.func.isRequired,
};

BagConfirmationModal.defaultProps = {
  isOpen: false,
};

export { BagConfirmationModal as BagConfirmationModalVanilla };
export default withStyles(BagConfirmationModal, styles);
