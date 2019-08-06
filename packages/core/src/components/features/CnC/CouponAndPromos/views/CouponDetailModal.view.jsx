import React from 'react';
import Modal from '../../../../common/molecules/Modal';

// @flow

type Props = {
  data: Object,
  setDeleteModalMountState: Function,
  openState: boolean,
};

class CouponDetailModal extends React.Component<Props> {
  onClose = () => {
    const { setDeleteModalMountState } = this.props;
    setDeleteModalMountState({ state: false });
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const { data, openState } = this.props;
    const { heading } = data;
    return (
      <Modal
        isOpen={openState}
        onRequestClose={this.onClose}
        heading={heading}
        overlayClassName="TCPModal__Overlay"
        className="TCPModal__Content"
        maxWidth="460px"
        minHeight="500px"
        closeIconDataLocator="addressdeletemodalcrossicon"
      >
        <div>hello</div>
      </Modal>
    );
  }
}

export default CouponDetailModal;
