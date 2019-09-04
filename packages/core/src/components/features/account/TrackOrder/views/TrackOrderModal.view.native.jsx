import React from 'react';
import { SafeAreaView } from 'react-native';
import ModalNative from '../../../../common/molecules/Modal';
import TrackOrderViewTemplate from '../molecules/TrackOrderView';

// @flow
type Props = {
  openState: boolean,
  setModalMountState: Function,
  isUserLoggedIn: Boolean,
  labels: object,
  onSubmit: Function,
  errorMessage: string,
  onChangeForm: Function,
  showNotification: string,
  handleToggle: Function,
};

/**
 * @function TrackOrderModal The TrackOrderModal component shows the Track Order Modal.
 * This component includes the Track order form view and track order button.
 * @param {props} props object with details to render in modal
 */
export class TrackOrderModal extends React.PureComponent<Props> {
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

export default TrackOrderModal;
