import React from 'react';
import { SafeAreaView } from 'react-native';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import ModalViewWrapper from '@tcp/core/src/components/features/account/MyProfile/organism/ChangePasswordInfo/styles/ChangePasswordInfo.style.native';
import AboutYouSurveyContainer from '../../AboutYouSurvey';

/**
 * @function AboutYouSurveyModal The AboutYouSurveyModal component shows the about you survey modal on the profile information acccount section.
 * @param {props} props object with details to render in modal
 */
class AboutYouSurveyModal extends React.Component<Props> {
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
      toggleModalState,
      userSurvey,
      className,
    } = this.props;
    return (
      <Modal
        isOpen={openState}
        onRequestClose={toggleModalState}
        heading={labels.lbl_profile_about_you_title}
      >
        <SafeAreaView>
          <ModalViewWrapper>
            <AboutYouSurveyContainer
              labels={labels}
              errorMessage={errorMessage}
              onSubmit={onSubmit}
              setModalMountState={setModalMountState}
              showNotification={showNotification}
              userSurvey={userSurvey}
              className={className}
              toggleModalState={toggleModalState}
            />
          </ModalViewWrapper>
        </SafeAreaView>
      </Modal>
    );
  }
}

export default AboutYouSurveyModal;
