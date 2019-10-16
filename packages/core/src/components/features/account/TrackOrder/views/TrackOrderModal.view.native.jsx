import React from 'react';
import { PropTypes } from 'prop-types';
import { SafeAreaView } from 'react-native';
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
    const { navigation, setModalMountState } = this.props;
    navigation.navigate('Account');
    setModalMountState({ state: false });
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const {
      labels,
      onSubmit,
      errorMessage,
      showNotification,
      onChangeForm,
      isUserLoggedIn,
      handleToggle,
    } = this.props;
    return (
      <SafeAreaView>
        <TrackOrderViewTemplate
          labels={labels}
          errorMessage={errorMessage}
          isGuestUser={isUserLoggedIn}
          onSubmit={onSubmit}
          showNotification={showNotification}
          onChangeForm={onChangeForm}
          handleToggle={handleToggle}
          onRequestClose={this.onClose}
        />
      </SafeAreaView>
    );
  }
}

TrackOrderModal.propTypes = {
  labels: PropTypes.shape({
    trackOrder: PropTypes.shape({}),
  }).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onChangeForm: PropTypes.func.isRequired,
  showNotification: PropTypes.string.isRequired,
  handleToggle: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  setModalMountState: PropTypes.func.isRequired,
};

export default TrackOrderModal;
