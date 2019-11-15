import React from 'react';
import { View } from 'react-native';
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
    const { resetPLCCApplicationStatus, toggleModal } = this.props;
    toggleModal({ isModalOpen: false, isPLCCModalOpen: true });
    resetPLCCApplicationStatus({ status: null });
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
  };

  closePlccModal = () => {
    const { toggleModal, navigation } = this.props;
    navigation.goBack();
    toggleModal({ isPLCCModalOpen: false });
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    // eslint-disable-next-line react/prop-types
    const { labels, plccBenefitsList, isPLCCModalOpen, isModalOpen } = this.props;

    const offerType = getLabelValue(labels, 'oneequalstwopointsoffer');
    return isPLCCModalOpen || isModalOpen ? (
      <View>
        <ModalNativeHeader
          heading={getLabelValue(labels, 'lbl_PLCCForm_rewardsCardHeading')}
          onRequestClose={isPLCCModalOpen ? this.closePlccModal : this.closeModal}
          fontSize="fs14"
          customHeaderMargin="55px 25px 0 25px"
        />
        {isPLCCModalOpen && (
          <ApplyCardLayoutView
            toggleModal={this.toggleApplyCardModal}
            applyCard={isPLCCModalOpen}
            closeModal={this.closePlccModal}
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
            <ButtonWrapper>
              <Button
                fill="BLUE"
                type="submit"
                color="white"
                text={getLabelValue(labels, 'lbl_PLCCModal_applyNowCTA')}
                width="90%"
                onPress={this.toggleApplyCardModal}
              />
            </ButtonWrapper>

            <StyledAnchor
              url={getLabelValue(labels, 'lbl_PLCCModal_learnMoreLink')}
              fontSizeVariation="xlarge"
              anchorVariation="secondary"
              underlineBlue
              text={getLabelValue(labels, 'lbl_PLCCModal_learnMoreText')}
              paddingTop="23px"
            />
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
          </ScrollViewContainer>
        )}
      </View>
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
};

export default ApplyNowModalWrapper;
