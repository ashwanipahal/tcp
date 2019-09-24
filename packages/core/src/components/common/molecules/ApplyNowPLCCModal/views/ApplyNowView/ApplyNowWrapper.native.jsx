import React from 'react';
import PropTypes from 'prop-types';
import { Button, RichText } from '../../../../atoms';
import ModalNative from '../../../Modal/view/Modal.native';
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
} from '../../styles/ApplyNowView.style.native';
import { getLabelValue } from '../../../../../../utils/utils';
import ApplyCardLayoutView from '../../../../../features/browse/ApplyCardPage';

const headerImage = require('../../../../../../assets/tcp-cc.png');
const PLCC_LOOKUP_2_POINTS = require('../../../../../../assets/PLCC_lockup_2_points.png');
const PLCC_LOOKUP_1_POINTS = require('../../../../../../assets/PLCC_lockup_1_points.png');

class ApplyNowModalWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { applyCard: false };
  }

  componentDidMount() {
    const { labels, fetchModuleXContent } = this.props;
    if (labels && labels.referred) {
      fetchModuleXContent(labels.referred);
    }
  }

  toggleApplyCard = () => {
    const { applyCard } = this.state;
    this.setState({
      applyCard: !applyCard,
    });
  };

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
    // eslint-disable-next-line react/prop-types
    const { labels, applyNow, toggleModalWrapper, plccBenefitsList } = this.props;
    const { applyCard } = this.state;

    const offerType = getLabelValue(labels, 'oneequalstwopointsoffer');
    return (
      <ModalNative
        onRequestClose={toggleModalWrapper}
        horizontalBar={false}
        headingAlign="center"
        headingFontFamily="secondary"
        fontSize="fs22"
        headerStyle={fullWidth}
        isOpen={applyNow}
      >
        <ScrollViewContainer>
          <StyledBodyCopy
            color="gray.900"
            mobilefontFamily="primary"
            fontSize="fs38"
            textAlign="center"
            fontWeight="black"
            text={getLabelValue(labels, 'lbl_PLCCModal_applyNowHeaderText')}
            paddingTop="30px"
          />
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
              buttonVariation="variable-width"
              text={getLabelValue(labels, 'lbl_PLCCModal_applyNowCTA')}
              width="90%"
              onPress={this.toggleApplyCard}
            />
          </ButtonWrapper>
          <ApplyCardLayoutView toggleModal={this.toggleApplyCard} applyCard={applyCard} />
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
              className="footerLink"
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
              className="footerLink"
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
      </ModalNative>
    );
  }
}

ApplyNowModalWrapper.propTypes = {
  setLoginModalMountState: PropTypes.bool.isRequired,
  labels: PropTypes.shape({
    apply_now_link_modal: PropTypes.string,
  }).isRequired,
  toggleModalWrapper: PropTypes.func.isRequired,
  fetchModuleXContent: PropTypes.func.isRequired,
};

export default ApplyNowModalWrapper;
