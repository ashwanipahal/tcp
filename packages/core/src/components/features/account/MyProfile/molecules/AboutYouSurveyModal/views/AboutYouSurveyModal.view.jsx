import React from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import AboutYouSurveyContainer from '../../AboutYouSurvey';
import styles from '../../AboutYouSurvey/styles/AboutYouSurvey.style';

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
      className,
    } = this.props;
    return (
      <Modal
        fixedWidth
        isOpen={openState}
        onRequestClose={toggleModalState}
        overlayClassName="TCPModal__Overlay"
        className={className}
        maxWidth="491px"
        minHeight="629px"
        data-locator="about_you_modal"
        ariaLabelledby="about_you__modal__heading"
        ariaDescribedby="about_you__modal__subheading"
      >
        <AboutYouSurveyContainer
          labels={labels}
          errorMessage={errorMessage}
          onSubmit={onSubmit}
          showNotification={showNotification}
          userSurvey={userSurvey}
          className={className}
          toggleModalState={toggleModalState}
        />
      </Modal>
    );
  }
}

export default withStyles(AboutYouSurveyModal, styles);
export { AboutYouSurveyModal as AboutYouSurveyModalVanilla };
