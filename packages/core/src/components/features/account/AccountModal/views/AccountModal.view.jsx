import React from 'react';
import Modal from '../../../../common/molecules/Modal';
import Address from '../../../../common/molecules/Address';
import Button from '../../../../common/atoms/Button';

class AccountModalView extends React.Component {
  constructor(props) {
    super(props);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  componentDidMount() {
    console.log('modal mounted');
  }

  onCloseModal() {
    const { closeModalComponent } = this.props;
    closeModalComponent();
  }

  render() {
    const { openState, modalToOpen, data } = this.props;
    if (Object.keys(data).length) {
      const { heading, body, buttons } = data;
      const { confirm, cancel } = buttons;
      return (
        <Modal
          colSize={{ large: 4, medium: 6, small: 6 }}
          isOpen={openState}
          onRequestClose={this.onCloseModal}
          title={heading}
        >
          <Address address={body} />
          <Button buttonVariation="variable-width" fill="BLUE">
            {confirm}
          </Button>
          <Button buttonVariation="variable-width" onClick={this.onCloseModal} fill="RED">
            {cancel}
          </Button>
        </Modal>
      );
    }
    return null;
  }
}

export default AccountModalView;
