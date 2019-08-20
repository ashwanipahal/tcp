import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import Button from '../../../../common/atoms/Button';
import Modal from '../../../../common/molecules/Modal';
import { getLocator } from '../../../../../utils';

import styles from '../styles/BagConfirmationModal.style';

const BagConfirmationModal = ({
  className,
  labels: { confirmationText, backToBag, continueCheckout },
  isOpen,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {}}
      overlayClassName="TCPModal__Overlay"
      className={`${className} TCPModal__Content`}
      fixedWidth
      closeIconDataLocator="coupondetailmodalcrossicon"
    >
      <div className="modal-content">
        <BodyCopy
          fontSize="fs16"
          fontFamily="secondary"
          className="bag-checkout-confirmation-text"
          component="span"
          fontWeight="normal"
          data-locator={getLocator(`couponDetailModal__NameLbl`)}
        >
          {confirmationText}
        </BodyCopy>
        <div className="button-container">
          <Button
            data-locator={getLocator('addedtobag_btncheckout')}
            className="confirmation-button back-to-bag"
          >
            <BodyCopy
              component="span"
              color="white"
              fontWeight="extrabold"
              fontFamily="secondary"
              fontSize={['fs13', 'fs13', 'fs14']}
              onClick={() => {}}
            >
              {backToBag}
            </BodyCopy>
          </Button>
          <Button
            data-locator={getLocator('addedtobag_btncheckout')}
            className="confirmation-button confirm-checkout"
          >
            <BodyCopy
              component="span"
              color="white"
              fontWeight="extrabold"
              fontFamily="secondary"
              fontSize={['fs13', 'fs13', 'fs14']}
              onClick={() => {}}
            >
              {continueCheckout}
            </BodyCopy>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
BagConfirmationModal.propTypes = {
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({}),
  isOpen: PropTypes.bool,
};

BagConfirmationModal.defaultProps = {
  labels: {
    confirmationText: `Some of the item(s) in your bag are either sold out or need updating.
Continuing with checkout will remove them from your bag.`,
    backToBag: 'BACK TO BAG',
    continueCheckout: 'CONTINUE TO CHECKOUT',
  },
  isOpen: false,
};

export { BagConfirmationModal as BagConfirmationModalVanilla };
export default withStyles(BagConfirmationModal, styles);
