import React from 'react';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/DeleteCardModal.style';
import Modal from '../../../../common/molecules/Modal';
import Notification from '../../../../common/molecules/Notification';
import GiftCardModalInfo from './GiftCardModalInfo.view';
import CreditCardModalInfo from './CreditCardModalInfo.view';
import VenmoCardModalInfo from './VenmoCardModalInfo.view';
import Button from '../../../../common/atoms/Button';
// @flow

type Props = {
  data: Object,
  className: string,
  openState: boolean,
  showUpdatedNotificationOnModal: boolean,
  labels: Object,
  setDeleteModalMountState: Function,
  onDeleteCard: Function,
};

/**
 * @function deleteCardModal The deleteCardModal component shows the address to delete.
 * This component includes the adress view, and confirm and cancel buttons
 * @param {data} data object with details to render in modal
 * @param {onDeleteAddress} onDeleteCards function to delete the address from the modal
 * @param {closeModalComponent} closeModalComponent function to close the modal
 * @param {className} className css to apply
 */
class DeleteCardModal extends React.Component<Props> {
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
   * @param {onDeleteCards} onDeleteCards function to delete the address.
   * @param {data} data object with details to render in modal
   * @return {[Function]} function called
   */
  onConfirm = () => {
    const { data, onDeleteCard } = this.props;
    const { description } = data;
    onDeleteCard({ creditCardId: description.creditCardId });
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
    const { data, className, labels } = this.props;
    const ccType = data && data.description && data.description.ccType;
    const getAccNumbr = `${data.description.accountNo}`.slice(-4);
    const TotalExp = `${data.description.expMonth}/${data.description.expYear} `;
    const isCreditCard = ccType !== 'GiftCard' && ccType !== 'VENMO';
    const creditCardHeading = labels.ACC_LBL_MODAL_CREDIT_CARD_HEADING;
    const address = data.description.addressDetails ? data.description.addressDetails : null;
    return (
      <div className={className}>
        {isCreditCard && (
          <CreditCardModalInfo
            getAccNumbr={getAccNumbr}
            TotalExp={TotalExp}
            data={data}
            address={address}
            creditCardHeading={creditCardHeading}
            {...this.props}
            isCreditCard={isCreditCard}
          />
        )}
        {ccType === 'GiftCard' && (
          <GiftCardModalInfo
            getAccNumbr={getAccNumbr}
            TotalExp={TotalExp}
            data={data}
            {...this.props}
          />
        )}
        {ccType === 'VENMO' && (
          <VenmoCardModalInfo
            getAccNumbr={getAccNumbr}
            TotalExp={TotalExp}
            data={data}
            {...this.props}
          />
        )}
        <div className="deleteCardModal__btnWrapper">
          <Button
            buttonVariation="variable-width"
            fill="BLUE"
            onClick={this.onConfirm}
            className="deleteCardModal__deleteConfirm deleteCardModal__btn"
          >
            {data.buttons.confirm}
          </Button>
          <Button
            buttonVariation="variable-width"
            onClick={this.onClose}
            fill="RED"
            className="deleteCardModal__btn deleteCardModal__deleteCancel"
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
            message={labels.ACC_LBL_ERROR_MSG}
          />
        )}

        {this.renderModal()}
      </Modal>
    );
  }
}

export default withStyles(DeleteCardModal, styles);
export { DeleteCardModal as DeleteCardModalVanilla };
