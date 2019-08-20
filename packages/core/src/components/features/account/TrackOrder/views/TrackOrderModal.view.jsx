import React from 'react';
import withStyles from '../../../../common/hoc/withStyles';
import Modal from '../../../../common/molecules/Modal';
import TrackOrderViewTemplate from './TrackOrderView';
import styles from '../styles/TrackOrderModal.style';

// @flow
type Props = {
  openState: boolean,
  setModalMountState: Function,
  labels: object,
  openLoginOverlay: Function,
  onSubmit: Function,
  errorMessage: string,
};

/**
 * @function TrackOrderModal The TrackOrderModal component shows the Track Order Modal.
 * This component includes the Track order form view and track order button.
 * @param {data} data object with details to render in modal
 */
class TrackOrderModal extends React.Component<Props> {
  /**
   * @function onCloseModal  Used to render the JSX of the component
   * @param {closeModalComponent} closeModalComponent function to close the modal.
   * @return {[Function]} function called
   */
  onClose = () => {
    const { setModalMountState } = this.props;
    setModalMountState({ state: false });
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const {
      openState,
      setModalMountState,
      labels,
      openLoginOverlay,
      onSubmit,
      errorMessage,
    } = this.props;
    return (
      <Modal
        fixedWidth
        isOpen={openState}
        onRequestClose={this.onClose}
        overlayClassName="TCPModal__Overlay"
        className="TCPModal__Content TrackOrder__Modal__content"
        maxWidth="450px"
        minHeight="576px"
        data-locator="track_order_modal"
      >
        <TrackOrderViewTemplate
          labels={labels}
          errorMessage={errorMessage}
          onSubmit={onSubmit}
          openLoginOverlay={openLoginOverlay}
          setModalMountState={setModalMountState}
        />
      </Modal>
    );
  }
}

export default withStyles(TrackOrderModal, styles);
export { TrackOrderModal as TrackOrderModalVanilla };
