import React from 'react';
import Address from '../../../../common/molecules/Address';
import Button from '../../../../common/atoms/Button';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/DeleteAddressModal.style';

// @flow

type Props = {
  data: Object,
  className: String,
  onDeleteAddress: Function,
  closeModalComponent: Function,
};

/**
 * @function DeleteAddressModal The DeleteAddressModal component shows the address to delete.
 * This component includes the adress view, and confirm and cancel buttons
 * @param {data} data object with details to render in modal
 * @param {onDeleteAddress} onDeleteAddress function to delete the address from the modal
 * @param {closeModalComponent} closeModalComponent function to close the modal
 * @param {className} className css to apply
 */
class DeleteAddressModal extends React.Component<Props> {
  /**
   * @function onCloseModal  Used to render the JSX of the component
   * @param {closeModalComponent} closeModalComponent function to close the modal.
   * @return {[Function]} function called
   */
  onClose = () => {
    const { closeModalComponent } = this.props;
    closeModalComponent();
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
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const { className, data } = this.props;
    const { buttons, description } = data;
    const { confirm, cancel } = buttons;
    return (
      <div className={className}>
        <Address address={description} className="deleteAddressModal_deleteAddress" />
        <div className="deleteAddressModal_btnWrapper">
          <Button
            buttonVariation="variable-width"
            fill="BLUE"
            onClick={this.onConfirm}
            className="deleteAddressModal_deleteConfirm deleteAddressModal_btn"
          >
            {confirm}
          </Button>
          <Button
            buttonVariation="variable-width"
            onClick={this.onClose}
            fill="RED"
            className="deleteAddressModal_btn"
          >
            {cancel}
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(DeleteAddressModal, styles);
export { DeleteAddressModal as DeleteAddressModalVanilla };
