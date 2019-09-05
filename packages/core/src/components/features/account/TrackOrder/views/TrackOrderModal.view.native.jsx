import React from 'react';
import { PropTypes } from 'prop-types';
import { SafeAreaView } from 'react-native';
import ModalNative from '../../../../common/molecules/Modal';
import TrackOrderViewTemplate from '../molecules/TrackOrderView';

/**
 * @function TrackOrderModal The TrackOrderModal component shows the Track Order Modal.
 * This component includes the Track order form view and track order button.
 * @param {props} props object with details to render in modal
 */
export class TrackOrderModal extends React.PureComponent {
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
      onSubmit,
      errorMessage,
      showNotification,
      onChangeForm,
      isUserLoggedIn,
      handleToggle,
    } = this.props;
    const fullWidth = {
      width: '100%',
    };
    return (
      <ModalNative
        isOpen={openState}
        onRequestClose={this.onClose}
        horizontalBar={false}
        headingAlign="center"
        headingFontFamily="secondary"
        fontSize="fs22"
        headerStyle={fullWidth}
      >
        <SafeAreaView>
          <TrackOrderViewTemplate
            labels={labels}
            errorMessage={errorMessage}
            isGuestUser={isUserLoggedIn}
            onSubmit={onSubmit}
            showNotification={showNotification}
            onChangeForm={onChangeForm}
            handleToggle={handleToggle}
            setModalMountState={setModalMountState}
          />
        </SafeAreaView>
      </ModalNative>
    );
  }
}

TrackOrderModal.propTypes = {
  openState: PropTypes.bool.isRequired,
  setModalMountState: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    trackOrder: PropTypes.shape({}),
  }).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onChangeForm: PropTypes.func.isRequired,
  showNotification: PropTypes.string.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

export default TrackOrderModal;
