import React from 'react';
import { View, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import ModalNativeHeader from '../../../Modal/view/Modal.native.header';
import { Button, RichText } from '../../../../atoms';
import {
  ImageContainer,
  StyledBodyCopy,
  ScrollViewContainer,
  ButtonWrapper,
  StyledAnchor,
  BottomContainer,
  RichTextContainer,
  Container,
  StyledImage,
  HeaderContainer,
  RTPSHeader,
} from '../../styles/ApplyNowView.style.native';
import { getLabelValue } from '../../../../../../utils/utils';
import ApplyCardLayoutView from '../../../../../features/browse/ApplyCardPage';

const headerImage = require('../../../../../../assets/tcp-cc.png');
const PLCC_LOOKUP_2_POINTS = require('../../../../../../assets/PLCC_lockup_2_points.png');
const PLCC_LOOKUP_1_POINTS = require('../../../../../../assets/PLCC_lockup_1_points.png');

/**
 * @class - ApplyNowModalWrapper
 *
 * @description - used for showing the apply now modal for plcc application flow
 */
class ApplyNowModalWrapper extends React.PureComponent {
  componentDidMount() {
    const { labels, fetchModuleXContent } = this.props;
    if (labels && labels.referred) {
      fetchModuleXContent(labels.referred);
    }
  }

  /**
   * @function - toggleApplyCardModal
   *
   * @description - used for toggling the apply card modal state.
   */

  toggleApplyCardModal = () => {
    const {
      resetPLCCApplicationStatus,
      toggleModal,
      isRtpsFlow,
      submitAcceptOrDeclinePlcc,
    } = this.props;
    toggleModal({ isModalOpen: false, isPLCCModalOpen: true });
    resetPLCCApplicationStatus({ status: null });
    if (isRtpsFlow) {
      submitAcceptOrDeclinePlcc(true);
    }
  };

  setRTPSFlow = () => {
    const { setIsRTPSFlow, isRtpsFlow, submitAcceptOrDeclinePlcc } = this.props;
    /* istanbul ignore else */
    if (isRtpsFlow && setIsRTPSFlow) {
      submitAcceptOrDeclinePlcc(false);
      setIsRTPSFlow(false);
    }
  };

  /**
   * @function - closeModal
   *
   * @description - closing the apply card modal and finalizing the call.
   */
  closeModal = () => {
    const { toggleModal, resetPLCCApplicationStatus, navigation } = this.props;
    navigation.goBack();
    toggleModal({ isModalOpen: false });
    resetPLCCApplicationStatus({ status: null });
    this.setRTPSFlow();
  };

  closePlccModal = () => {
    const { toggleModal, navigation } = this.props;
    navigation.goBack();
    toggleModal({ isPLCCModalOpen: false });
    this.setRTPSFlow();
  };

  getTermsAndCond = () => {
    const { isRtpsFlow, rtpsTextTerms } = this.props;
    return (
      isRtpsFlow && (
        <Container>
          <RichTextContainer>
            <RichText source={{ html: rtpsTextTerms }} />
          </RichTextContainer>
        </Container>
      )
    );
  };

  getModalHeader = () => {
    const { isRtpsFlow, isPLCCModalOpen, labels } = this.props;
    return !isRtpsFlow ? (
      <ModalNativeHeader
        heading={getLabelValue(labels, 'lbl_PLCCForm_rewardsCardHeading')}
        onRequestClose={isPLCCModalOpen ? this.closePlccModal : this.closeModal}
        fontSize="fs14"
        customHeaderMargin="25px 25px 0 25px"
      />
    ) : (
      <RTPSHeader />
    );
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    // eslint-disable-next-line react/prop-types
    const {
      labels,
      plccBenefitsList,
      isPLCCModalOpen,
      isModalOpen,
      isRtpsFlow,
      rtpsOptOutMsg,
      rtpsCongratsMsg,
    } = this.props;
    const offerType = getLabelValue(labels, 'oneequalstwopointsoffer');
    return isPLCCModalOpen || isModalOpen ? (
      <SafeAreaView>
        <View>
          {this.getModalHeader()}
          {isPLCCModalOpen && (
            <ApplyCardLayoutView
              applyCard={isPLCCModalOpen}
              closePLCCModal={this.closePlccModal}
              isRtpsFlow={isRtpsFlow}
            />
          )}
          {isModalOpen && (
            <ScrollViewContainer>
              <HeaderContainer>
                <StyledBodyCopy
                  color="gray.900"
                  mobilefontFamily="primary"
                  fontSize="fs38"
                  textAlign="center"
                  fontWeight="black"
                  text={getLabelValue(labels, 'lbl_PLCCModal_applyNowHeaderText')}
                  paddingTop="30px"
                />
                <StyledBodyCopy
                  color="gray.900"
                  mobilefontFamily="primary"
                  fontSize="fs15"
                  fontWeight="black"
                  text="§"
                  paddingTop="5px"
                />
              </HeaderContainer>

              <ImageContainer>
                <StyledImage source={headerImage} width="45%" height="112px" />
              </ImageContainer>
              <StyledBodyCopy
                color="gray.900"
                fontFamily="secondary"
                fontSize="fs14"
                textAlign="center"
                text={getLabelValue(labels, 'lbl_PLCCModal_applyNowSubText')}
                paddingTop="9px"
                paddingLeft="12px"
                paddingRight="12px"
              />
              {isRtpsFlow && (
                <Container>
                  <RichTextContainer>
                    <RichText source={{ html: rtpsCongratsMsg }} />
                  </RichTextContainer>
                </Container>
              )}
              <ButtonWrapper>
                <Button
                  fill="BLUE"
                  type="submit"
                  color="white"
                  text={
                    !isRtpsFlow
                      ? getLabelValue(labels, 'lbl_PLCCModal_applyNowCTA')
                      : getLabelValue(labels, 'lbl_PLCC_interested')
                  }
                  width="90%"
                  onPress={this.toggleApplyCardModal}
                />
              </ButtonWrapper>

              {!isRtpsFlow ? (
                <StyledAnchor
                  url={getLabelValue(labels, 'lbl_PLCCModal_learnMoreLink')}
                  fontSizeVariation="xlarge"
                  anchorVariation="secondary"
                  underlineBlue
                  text={getLabelValue(labels, 'lbl_PLCCModal_learnMoreText')}
                  paddingTop="23px"
                />
              ) : (
                <StyledAnchor
                  onPress={() => {
                    this.closeModal();
                  }}
                  fontSizeVariation="xlarge"
                  anchorVariation="secondary"
                  underlineBlue
                  text={getLabelValue(labels, 'lbl_PLCC_noThanks')}
                  noLink
                  paddingTop="23px"
                />
              )}
              {isRtpsFlow && (
                <Container>
                  <RichTextContainer>
                    <RichText source={{ html: rtpsOptOutMsg }} />
                  </RichTextContainer>
                </Container>
              )}
              <ImageContainer marginTop="28px">
                <StyledImage
                  source={offerType ? PLCC_LOOKUP_2_POINTS : PLCC_LOOKUP_1_POINTS}
                  width="95%"
                  height="60px"
                />
              </ImageContainer>
              <StyledBodyCopy
                fontFamily="primary"
                fontSize="fs28"
                fontWeight="black"
                textAlign="center"
                color="text.secondary"
                text={getLabelValue(labels, 'lbl_PLCCModal_benefitsText')}
                paddingTop="9px"
              />
              <Container>
                <RichTextContainer>
                  <RichText source={{ html: plccBenefitsList }} />
                </RichTextContainer>
              </Container>
              <BottomContainer>
                <StyledBodyCopy
                  fontSize="fs10"
                  fontFamily="secondary"
                  text={getLabelValue(labels, 'lbl_PLCCModal_linksTextPrefix')}
                  paddingRight="4px"
                />

                <StyledAnchor
                  url={getLabelValue(labels, 'lbl_PLCCModal_detailsLink')}
                  fontSizeVariation="medium"
                  anchorVariation="primary"
                  underline
                  text={getLabelValue(labels, 'lbl_PLCCForm_details')}
                  paddingRight="28px"
                />

                <StyledAnchor
                  url={getLabelValue(labels, 'lbl_PLCCModal_faqLink')}
                  target="_blank"
                  locator="plcc_faq"
                  fontSizeVariation="medium"
                  anchorVariation="primary"
                  underline
                  text={getLabelValue(labels, 'lbl_PLCCModal_faqText')}
                  paddingRight="28px"
                />

                <StyledAnchor
                  url={getLabelValue(labels, 'lbl_PLCCModal_rewardsProgramLink')}
                  target="_blank"
                  data-locator="plcc_rewards_terms"
                  fontSizeVariation="medium"
                  anchorVariation="primary"
                  underline
                  text={getLabelValue(labels, 'lbl_PLCCModal_rewardsProgramText')}
                />
              </BottomContainer>
              {this.getTermsAndCond()}
            </ScrollViewContainer>
          )}
        </View>
      </SafeAreaView>
    ) : null;
  }
}

ApplyNowModalWrapper.propTypes = {
  labels: PropTypes.shape({
    apply_now_link_modal: PropTypes.string,
  }).isRequired,
  fetchModuleXContent: PropTypes.func.isRequired,
  resetPLCCApplicationStatus: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  rtpsCongratsMsg: PropTypes.string.isRequired,
  rtpsOptOutMsg: PropTypes.string.isRequired,
  rtpsTextTerms: PropTypes.string.isRequired,
  setIsRTPSFlow: PropTypes.func.isRequired,
  isRtpsFlow: PropTypes.bool,
  submitAcceptOrDeclinePlcc: PropTypes.func.isRequired,
  isPLCCModalOpen: PropTypes.bool,
  plccBenefitsList: PropTypes.shape({}).isRequired,
  isModalOpen: PropTypes.bool,
};

ApplyNowModalWrapper.defaultProps = {
  isRtpsFlow: false,
  isPLCCModalOpen: false,
  isModalOpen: false,
};

export default ApplyNowModalWrapper;
