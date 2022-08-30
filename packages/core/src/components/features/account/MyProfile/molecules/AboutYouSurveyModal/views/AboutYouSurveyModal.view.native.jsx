import React from 'react';
import { SafeAreaView } from 'react-native';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import ModalViewWrapper from '@tcp/core/src/components/features/account/MyProfile/organism/ChangePasswordInfo/styles/ChangePasswordInfo.style.native';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import AboutYouSurveyContainer from '../../AboutYouSurvey';

/**
 * @function AboutYouSurveyModal The AboutYouSurveyModal component shows the about you survey modal on the profile information acccount section.
 * @param {props} props object with details to render in modal
 */
class AboutYouSurveyModal extends React.PureComponent<Props> {
  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const {
      openState,
      labels,
      onSubmit,
      errorMessage,
      showNotification,
      toggleModalState,
      userSurvey,
    } = this.props;
    return (
      <Modal
        isOpen={openState}
        onRequestClose={() => toggleModalState('mountSurveyModal')}
        heading={getLabelValue(labels, 'lbl_profile_about_you_modal_heading')}
      >
        <SafeAreaView>
          <ModalViewWrapper>
            <AboutYouSurveyContainer
              labels={labels}
              errorMessage={errorMessage}
              onSubmit={onSubmit}
              showNotification={showNotification}
              userSurvey={userSurvey}
              toggleModalState={toggleModalState}
            />
          </ModalViewWrapper>
        </SafeAreaView>
      </Modal>
    );
  }
}

export default AboutYouSurveyModal;
