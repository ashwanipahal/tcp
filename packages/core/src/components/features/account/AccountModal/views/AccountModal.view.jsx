import React from 'react';
import Modal from '../../../../common/molecules/Modal/view/Modal';
import DeleteAddressModal from './DeleteAddressModal.view';
import Notification from '../../../../common/molecules/Notification';

// @flow

type Props = {
  openState: boolean,
  data: object,
  onDeleteAddress: Function,
  closeModalComponent: Function,
  showUpdatedNotificationOnModal: boolean,
  labels: Object,
  className: string,
};

/**
 * @function AccountModalView The AccountModalView component will render the modal on the basis of modalType
 * The main component will include this Layout and pass the component to render on the right panel
 * @param {openState} openState open State of the modal : boolean value
 * @param {modalType} modalType which modal to open : string - 'delete', 'verify'
 * @param {data} data object with details to render in modal
 * @param {closeModalComponent} closeModalComponent function to close the modal
 * @param {onDeleteAddress} onDeleteAddress function to delete the address from the modal
 */
class AccountModalView extends React.Component<Props> {
  /**
   * @function onCloseModal  Used to render the JSX of the component
   * @param {closeModalComponent} closeModalComponent function to close the modal.
   * @return {[Function]} function called
   */
  onCloseModal = () => {
    const { closeModalComponent } = this.props;
    return closeModalComponent();
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
    const { data, onDeleteAddress, closeModalComponent } = this.props;
    return (
      <DeleteAddressModal
        data={data}
        onDeleteAddress={onDeleteAddress}
        closeModalComponent={closeModalComponent}
      />
    );
  };

  render() {
    const { openState, data, showUpdatedNotificationOnModal, labels, className } = this.props;
    if (Object.keys(data).length) {
      const { heading } = data;
      return (
        <Modal
          fixedWidth
          isOpen={openState}
          onRequestClose={this.onCloseModal}
          heading={heading}
          overlayClassName="TCPModal__Overlay"
          className={`TCPModal__Content, ${className}`}
          maxWidth="460px"
          minHeight="500px"
        >
          {showUpdatedNotificationOnModal !== null && (
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
    return null;
  }
}

export default AccountModalView;
