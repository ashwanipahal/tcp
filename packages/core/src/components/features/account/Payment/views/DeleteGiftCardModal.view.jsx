import React from 'react';
import Button from '../../../../common/atoms/Button';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/DeleteGiftModal.style';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';
import Modal from '../../../../common/molecules/Modal';
import Notification from '../../../../common/molecules/Notification';
import { getIconPath } from '../../../../../utils';
import { Image } from '../../../../common/atoms';
// @flow

type Props = {
  data: Object,
  className: string,
  onDeleteAddress: Function,
  setDeleteModalMountState: Function,
  openState: boolean,
  showUpdatedNotificationOnModal: boolean,
  labels: Object,
};

/**
 * @function deleteGiftModal The deleteGiftModal component shows the address to delete.
 * This component includes the adress view, and confirm and cancel buttons
 * @param {data} data object with details to render in modal
 * @param {onDeleteAddress} onDeleteAddress function to delete the address from the modal
 * @param {closeModalComponent} closeModalComponent function to close the modal
 * @param {className} className css to apply
 */
class deleteGiftModal extends React.Component<Props> {
  /**
   * @function onCloseModal  Used to render the JSX of the component
   * @param {closeModalComponent} closeModalComponent function to close the modal.
   * @return {[Function]} function called
   */
  onClose = () => {
    const { setDeleteModalMountState } = this.props;
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
    return (
      <div className={className}>
        <BodyCopy
          bodySize="seven"
          fontWeight="bold"
          fontFamily="secondaryFontFamily"
          className="deleteGiftModal_modalTitle"
        >
          {data.heading}
        </BodyCopy>
        <div className="deleteGiftModal_desc">
          {' '}
          <Image
            className="deleteGiftModal_img"
            src={getIconPath('gift-card')}
            onClick={this.pause}
          />
        </div>
        <div className="deleteGiftModal_btnWrapper">
          <Button
            buttonVariation="variable-width"
            fill="BLUE"
            onClick={this.onConfirm}
            className="deleteGiftModal_deleteConfirm deleteGiftModal_btn"
          >
            {data.buttons.confirm}
          </Button>
          <Button
            buttonVariation="variable-width"
            onClick={this.onClose}
            fill="RED"
            className="deleteGiftModal_btn deleteGiftModal_deleteCancel"
          >
            {data.buttons.cancel}
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
        maxWidth="690px"
        minHeight="340px"
      >
        {showUpdatedNotificationOnModal && (
          <Notification
            status={showUpdatedNotificationOnModal}
            colSize={{ large: 11, medium: 7, small: 6 }}
            message={labels.errorMessage}
          />
        )}

        {this.renderModal()}
      </Modal>
    );
  }
}

export default withStyles(deleteGiftModal, styles);
export { deleteGiftModal as deleteGiftModalVanilla };
