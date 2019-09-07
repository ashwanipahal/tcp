import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles';
import Modal from '../../../../common/molecules/Modal';
import TrackOrderViewTemplate from '../molecules/TrackOrderView';
import styles from '../styles/TrackOrderModal.style';

/**
 * @function TrackOrderModal The TrackOrderModal component shows the Track Order Modal.
 * This component includes the Track order form view and track order button.
 * @param {props} props object with details to render in modal
 */
class TrackOrderModal extends React.Component {
  /**
   * @function onCloseModal  Used to close the modal
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
      showNotification,
      onChangeForm,
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
        ariaLabelledby="trackorder__modal__heading"
        ariaDescribedby="trackorder__modal__subheading"
      >
        <TrackOrderViewTemplate
          labels={labels}
          errorMessage={errorMessage}
          onSubmit={onSubmit}
          openLoginOverlay={openLoginOverlay}
          setModalMountState={setModalMountState}
          showNotification={showNotification}
          onChangeForm={onChangeForm}
        />
      </Modal>
    );
  }
}

TrackOrderModal.propTypes = {
  openState: PropTypes.bool.isRequired,
  setModalMountState: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    trackOrder: PropTypes.shape({}),
  }).isRequired,
  openLoginOverlay: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onChangeForm: PropTypes.func.isRequired,
  showNotification: PropTypes.string.isRequired,
};

export default withStyles(TrackOrderModal, styles);
export { TrackOrderModal as TrackOrderModalVanilla };
