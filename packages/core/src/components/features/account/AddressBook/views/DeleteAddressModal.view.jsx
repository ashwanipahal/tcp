import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Address from '../../../../common/molecules/Address';
import Button from '../../../../common/atoms/Button';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/DeleteAddressModal.style';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import Modal from '../../../../common/molecules/Modal';
import Notification from '../../../../common/molecules/Notification';

/**
 * @function DeleteAddressModal The DeleteAddressModal component shows the address to delete.
 * This component includes the adress view, and confirm and cancel buttons
 * @param {data} data object with details to render in modal
 * @param {onDeleteAddress} onDeleteAddress function to delete the address from the modal
 * @param {closeModalComponent} closeModalComponent function to close the modal
 * @param {className} className css to apply
 */
class DeleteAddressModal extends React.Component {
  /**
   * @function onCloseModal  Used to render the JSX of the component
   * @param {closeModalComponent} closeModalComponent function to close the modal.
   * @return {[Function]} function called
   */
  onClose = () => {
    const { setDeleteModalMountState, clearNotificationError } = this.props;
    clearNotificationError();
    setDeleteModalMountState({ state: false });
  };

  /**
   * @function onCloseModal  Used to render the JSX of the component
   * @param {onDeleteAddress} onDeleteAddress function to delete the address.
   * @param {data} data object with details to render in modal
   * @return {[Function]} function called
   */
  onConfirm = () => {
    const { data, onDeleteAddress } = this.props;
    const { description } = data;
    onDeleteAddress({ nickName: description.nickName });
  };

  /**
   * @function renderModal  Used to render the JSX of the component
   * @param {modalType} modalType which modal to open : string - 'delete', 'verify'.
   * @param {data} data object with details to render in modal
   * @param {onDeleteAddress} onDeleteAddress function to delete the address from the modal
   * @param {closeModalComponent} closeModalComponent function to close the modal
   * @return {[Object]} JSX of the component
   */
  renderModal = () => {
    const { data, className } = this.props;
    const { buttons, description, title, msg } = data;
    const { confirm, cancel } = buttons;
    return (
      <div className={className}>
        <div className="deleteAddressModal_btnWrapper">
          <BodyCopy
            fontSize="fs22"
            textAlign="center"
            fontWeight="semibold"
            fontFamily="secondary"
            className="elem-mb-SM elem-mt-LRG"
            dataLocator="addressdeletemodalconfirmtext"
          >
            {title}
          </BodyCopy>
          {description.xcont_isBillingAddress === 'true' && (
            <BodyCopy
              fontSize="fs12"
              textAlign="center"
              fontWeight="semibold"
              fontFamily="secondary"
              color="red.500"
              className="elem-mb-SM"
              dataLocator="address-delete-redtext"
            >
              {msg}
            </BodyCopy>
          )}
          <Address
            address={description}
            className="deleteAddressModal_addressToDelete elem-mt-LRG"
            fontWeight="extrabold"
            dataLocatorPrefix="address-delete-modal"
          />

          <Button
            buttonVariation="fixed-width"
            fill="BLUE"
            onClick={this.onConfirm}
            className="deleteAddressModal_deleteConfirm deleteAddressModal_btn"
            dataLocator="addressdeletemodalyesdeletebtn"
          >
            {confirm}
          </Button>
          <Button
            buttonVariation="fixed-width"
            onClick={this.onClose}
            fill="RED"
            className="deleteAddressModal_btn"
            dataLocator="addressdeletemodalnodontdeletebtn"
          >
            {cancel}
          </Button>
        </div>
      </div>
    );
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const { className, data, openState, showUpdatedNotificationOnModal, labels } = this.props;
    const { heading } = data;
    return (
      <Modal
        fixedWidth
        isOpen={openState}
        onRequestClose={this.onClose}
        heading={heading}
        overlayClassName="TCPModal__Overlay"
        className={`TCPModal__Content, ${className}`}
        maxWidth="460px"
        minHeight="500px"
        closeIconDataLocator="addressdeletemodalcrossicon"
      >
        {showUpdatedNotificationOnModal && (
          <Notification
            status={showUpdatedNotificationOnModal}
            colSize={{ large: 11, medium: 7, small: 6 }}
            message={getLabelValue(labels, 'lbl_common_errorMessage', 'common')}
          />
        )}

        {this.renderModal()}
      </Modal>
    );
  }
}

DeleteAddressModal.propTypes = {
  data: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
  onDeleteAddress: PropTypes.func.isRequired,
  setDeleteModalMountState: PropTypes.func.isRequired,
  openState: PropTypes.bool.isRequired,
  showUpdatedNotificationOnModal: PropTypes.bool.isRequired,
  labels: PropTypes.shape({}).isRequired,
  clearNotificationError: PropTypes.func.isRequired,
};

export default withStyles(DeleteAddressModal, styles);
export { DeleteAddressModal as DeleteAddressModalVanilla };
