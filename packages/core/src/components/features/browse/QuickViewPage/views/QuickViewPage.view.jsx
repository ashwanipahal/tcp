/* eslint-disable */
import React, { Component } from 'react';
import Modal from '../../../../common/molecules/Modal';

class QuickView extends Component {
  render() {
    const { openState, onRequestClose } = this.props;
    return (
      <Modal
        fixedWidth
        isOpen={openState}
        onRequestClose={onRequestClose}
        maxWidth="700px"
        minHeight="500px"
      />
    );
  }
}

export default QuickView;
