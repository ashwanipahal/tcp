import React from 'react';
import Modal from '../../../../common/molecules/Modal';
import Address from '../../../../common/molecules/Address';
import Button from '../../../../common/atoms/Button';
import ADDRESS_VERIFICATION from '../AddressVerification.constants';

// @flow

type Props = {
  heading: string,
  modalState: string,
  userAddress: object,
  suggestedAddress: object,
  resetVerifyAddressAction: () => void,
};

class AddressVerification extends React.Component<Props> {
  getMessage = (modalState, suggestedAddress) => {
    if (modalState === ADDRESS_VERIFICATION.VERIFY_ADDRESS_RESULT.TRADITIONAL_MODAL) {
      return suggestedAddress
        ? 'traditionalModalDescription'
        : 'traditionalModalNoSuggestionDescription';
    }

    if (modalState === ADDRESS_VERIFICATION.VERIFY_ADDRESS_RESULT.ADDRESS_LINE_2_MODAL) {
      return 'addressLineDescription';
    }

    if (modalState === ADDRESS_VERIFICATION.VERIFY_ADDRESS_RESULT.COLORED_COPY_MODAL) {
      return 'coloredCopyDescription';
    }

    return '';
  };

  onCloseModal = () => {
    const { resetVerifyAddressAction } = this.props;
    resetVerifyAddressAction();
  };

  renderUserAddress = (modalState, userAddress, suggestedAddress) => {
    let showInput = false;
    if (
      modalState !== ADDRESS_VERIFICATION.VERIFY_ADDRESS_RESULT.ADDRESS_LINE_2_MODAL &&
      suggestedAddress
    ) {
      showInput = true;
    }
    return (
      <div>
        {showInput && <input type="radio" />}
        <Address address={userAddress} />
      </div>
    );
  };

  renderSuggestedAddress = (modalState, suggestedAddress) => {
    if (
      suggestedAddress &&
      (modalState === ADDRESS_VERIFICATION.VERIFY_ADDRESS_RESULT.TRADITIONAL_MODAL ||
        modalState === ADDRESS_VERIFICATION.VERIFY_ADDRESS_RESULT.COLORED_COPY_MODAL)
    ) {
      return (
        <div>
          {<input type="radio" />}
          <Address address={suggestedAddress} />
        </div>
      );
    }
    if (modalState === ADDRESS_VERIFICATION.VERIFY_ADDRESS_RESULT.ADDRESS_LINE_2_MODAL) {
      return (
        <div>
          <input type="text" />
        </div>
      );
    }

    return null;
  };

  render() {
    const { heading, modalState, userAddress, suggestedAddress } = this.props;

    if (modalState && modalState !== ADDRESS_VERIFICATION.VERIFY_ADDRESS_RESULT.NO_MODAL) {
      return (
        <Modal
          colSet={{ large: 4, medium: 8, small: 6 }}
          isOpen
          onRequestClose={this.onCloseModal}
          title={heading}
          overlayClassName="TCPModal__Overlay"
          className="TCPModal__Content"
        >
          {this.getMessage(modalState, suggestedAddress)}
          {this.renderUserAddress(modalState, userAddress, suggestedAddress)}
          {this.renderSuggestedAddress(modalState, suggestedAddress)}
          <Button buttonVariation="variable-width" fill="BLUE" onClick={this.onConfirm}>
            confirm
          </Button>
          <Button buttonVariation="variable-width" onClick={this.onCloseModal} fill="RED">
            cancel
          </Button>
        </Modal>
      );
    }

    return null;
  }
}

export default AddressVerification;
