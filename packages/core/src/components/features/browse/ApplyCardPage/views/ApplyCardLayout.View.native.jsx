import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import ModalNative from '../../../../common/molecules/Modal';
import { Image, BodyCopy } from '../../../../common/atoms';
import TextBox from '../../../../common/atoms/TextBox';
import {
  ImageContainer,
  Container,
  TextBoxContainer,
  StyledBodyCopy,
} from '../styles/ApplyCardPage.style.native';

const headerImage = require('../../../../../../../core/src/assets/tcp-cc.png');

class ApplyCardLayout extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onClose = () => {
    const { setLoginModalMountState } = this.props;
    setLoginModalMountState({ state: false });
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const fullWidth = {
      width: '100%',
    };
    const { applyCard, toggleModal } = this.props;
    return (
      <ModalNative
        onRequestClose={toggleModal}
        horizontalBar={false}
        headingAlign="center"
        headingFontFamily="secondary"
        fontSize="fs22"
        headerStyle={fullWidth}
        isOpen={applyCard}
      >
        <ScrollView>
          <ImageContainer>
            <Image source={headerImage} width="70%" height="166px" />
          </ImageContainer>

          <Container>
            <BodyCopy
              text="Please review the important information and terms about opening a MY PLACE REWARDS CREDIT CARD account prior to submitting your application or accepting a pre-approved offer.

To apply or accept a pre-approved offer you must:
• Be at the age of majority in your state or territory
• Have a valid government-issued photo ID
• Have a valid government issued tax identification number (such as a SSN or SIN)
• Have a street, rural route or APO/FPO mailing address (no P.O. Boxes)

You agree that this application and any information you submit to Comenity Capital Bank may be shared with and retained by
The Children’s Place."
            />
          </Container>

          <TextBoxContainer>
            <Field
              name="Enter Pre-Screen Code (optional)"
              id="firstName"
              label="Enter Pre-Screen Code (optional)"
              type="text"
              component={TextBox}
              maxLength={20}
            />
          </TextBoxContainer>

          <StyledBodyCopy
            text="If you’ve received a pre-screen code, enter it here."
            fontSize="fs16"
            color="gray.700"
            paddingLeft="16px"
            paddingRight="16px"
            mobilefontFamily="secondary"
            textAlign="left"
          />

          <StyledBodyCopy
            text="CONTACT INFORMATION"
            fontSize="fs16"
            color="black"
            mobilefontFamily="secondary"
            textAlign="left"
            fontWeight="semibold"
            paddingLeft="16px"
            paddingRight="16px"
            paddingTop="26px"
          />

          <TextBoxContainer>
            <Field
              name="firstName"
              id="firstName"
              label="firstName"
              type="text"
              component={TextBox}
              maxLength={50}
            />
          </TextBoxContainer>
        </ScrollView>
      </ModalNative>
    );
  }
}

ApplyCardLayout.propTypes = {
  setLoginModalMountState: PropTypes.bool.isRequired,
  plccData: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
  profileInfo: PropTypes.shape({}).isRequired,
  approvedPLCCData: PropTypes.shape({}).isRequired,
};

export default reduxForm({
  form: 'ApplyCardForm', // a unique identifier for this form
  enableReinitialize: true,
})(ApplyCardLayout);

export { ApplyCardLayout as ApplyCardLayoutVanilla };
