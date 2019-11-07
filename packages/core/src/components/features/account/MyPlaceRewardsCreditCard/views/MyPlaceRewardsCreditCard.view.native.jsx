import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { UrlHandler } from '@tcp/core/src/utils/utils.app';
import { ViewWithSpacing, BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { BodyCopy, Button, Anchor, Image } from '../../../../common/atoms';
import {
  ImageContainer,
  ButtonWrapper,
  StyledAnchor,
  BottomContainer,
  StyledImage,
  HeaderContainer,
} from '../styles/MyPlaceRewardsCreditCard.style.native';

import ApplyNowPLCCModal from '../../../../common/molecules/ApplyNowPLCCModal';

const headerImage = require('../../../../../../../core/src/assets/tcp-cc.png');
const PLCC_LOOKUP_2_POINTS = require('../../../../../../../core/src/assets/PLCC_lockup_2_points.png');
const BenefitImage = require('../../../../../../../core/src/assets/BenefitImageV.png');

export class MyPlaceRewardsCreditCard extends PureComponent {

  openManageCreditCardLink = () => {
    const { labels } = this.props;
    UrlHandler(getLabelValue(labels, 'lbl_PLCCModal_applyAcceptOfferLink'))
  };

  render() {
    const { labels, isPLCCModalOpen, openPLCCModal } = this.props;

    return (
      <>
        <HeaderContainer>
          <BodyCopy
            color="gray.900"
            fontFamily="primary"
            fontSize="fs38"
            textAlign="center"
            fontWeight="black"
            text={getLabelValue(labels, 'lbl_PLCCModal_applyNowHeaderText')}

          />
          <BodyCopy
            color="gray.900"
            fontFamily="primary"
            fontSize="fs12"
            fontWeight="black"
            text={getLabelValue(labels, 'lbl_PLCCModal_applyNowHeaderTextSuffix')}
          />
        </HeaderContainer>

        <ImageContainer>
          <StyledImage source={headerImage} width="65%" height="166px" />
        </ImageContainer>

        <BodyCopyWithSpacing
          color="gray.900"
          fontFamily="secondary"
          fontSize="fs18"
          fontWeight="regular"
          textAlign="center"
          text={getLabelValue(labels, 'lbl_PLCCModal_applyNowSubText')}
          spacingStyles="margin-top-SM margin-left-XXXL margin-right-XXXL"
        />
        <ViewWithSpacing spacingStyles="margin-top-LRG margin-bottom-LRG">
          <ButtonWrapper>
            <Button
              fill="BLUE"
              type="submit"
              color="white"
              text={getLabelValue(labels, 'lbl_PLCCModal_applyNowCTA')}
              width="100%"
              onPress={openPLCCModal}
            />
          </ButtonWrapper>
          <ButtonWrapper>
            <Button
              fill="WHITE"
              type="submit"
              text={getLabelValue(labels, 'lbl_PLCCForm_manageCreditCardAccount')}
              width="100%"
              onPress={this.openManageCreditCardLink}
            />
          </ButtonWrapper>
        </ViewWithSpacing>

        <BodyCopyWithSpacing
          fontFamily="primary"
          fontSize="fs32"
          fontWeight="black"
          textAlign="center"
          color="text.secondary"
          text={getLabelValue(labels, 'lbl_PLCCModal_benefitsText')}
          spacingStyles="margin-top-SM"
        />

        <BodyCopyWithSpacing
          color="gray.900"
          fontFamily="secondary"
          fontSize="fs18"
          textAlign="center"
          fontWeight="regular"
          text={getLabelValue(labels, 'lbl_PLCCForm_withMyPlaceRewardsCard')}
          spacingStyles="margin-top-XS margin-left-XXXL margin-right-XXXL"
        />

        <ImageContainer>
          <Image
            source={PLCC_LOOKUP_2_POINTS}
            width="100%"
            height="60px"
          />
        </ImageContainer>

        <ImageContainer>
          <Image
            source={BenefitImage}
            width="100%"
            height="600px"
          />
        </ImageContainer>

        <BottomContainer>
          <BodyCopyWithSpacing
            fontSize="fs10"
            fontFamily="secondary"
            text={getLabelValue(labels, 'lbl_PLCCModal_linksTextPrefix')}
            spacingStyles="margin-right-XS"
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

        {isPLCCModalOpen && <ApplyNowPLCCModal isPLCCModalOpen={isPLCCModalOpen} />}
      </>
    )
  }
}

MyPlaceRewardsCreditCard.propTypes = {
  labels: PropTypes.shape({}),
  isPLCCModalOpen: PropTypes.bool,
  openPLCCModal: PropTypes.func.isRequired,
};

MyPlaceRewardsCreditCard.defaultProps = {
  labels: {},
  isPLCCModalOpen: false,
};

export default MyPlaceRewardsCreditCard;
