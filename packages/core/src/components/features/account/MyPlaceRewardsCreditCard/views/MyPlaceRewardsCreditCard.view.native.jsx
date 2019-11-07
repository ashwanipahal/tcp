import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { UrlHandler } from '@tcp/core/src/utils/utils.app';
import {
  ViewWithSpacing,
  BodyCopyWithSpacing,
} from '@tcp/core/src/components/common/atoms/styledWrapper';
import { Button, Image } from '../../../../common/atoms';
import {
  ImageContainer,
  ButtonWrapper,
  StyledAnchor,
  BottomContainer,
  StyledImage,
  HeaderContainer,
} from '../styles/MyPlaceRewardsCreditCard.style.native';

// import ApplyNowPLCCModal from '../../../../common/molecules/ApplyNowPLCCModal';

const headerImage = require('../../../../../../../core/src/assets/tcp-cc.png');
const PLCC_LOOKUP_2_POINTS = require('../../../../../../../core/src/assets/PLCC_lockup_2_points.png');
const BenefitImage = require('../../../../../../../core/src/assets/BenefitImageV.png');

export class MyPlaceRewardsCreditCard extends PureComponent {
  openManageCreditCardLink = () => {
    const { labels } = this.props;
    UrlHandler(getLabelValue(labels, 'lbl_PLCCModal_applyAcceptOfferLink'));
  };

  render() {
    const { labels, navigation, openApplyNowModal } = this.props;

    return (
      <>
        <HeaderContainer>
          <BodyCopyWithSpacing
            color="gray.900"
            fontFamily="primary"
            fontSize="fs38"
            textAlign="center"
            fontWeight="black"
            text={getLabelValue(labels, 'lbl_PLCCModal_applyNowHeaderText')}
            spacingStyles="padding-top-LRG"
          />
          <BodyCopyWithSpacing
            color="gray.900"
            fontFamily="primary"
            fontSize="fs12"
            fontWeight="black"
            text={getLabelValue(labels, 'lbl_PLCCModal_applyNowHeaderTextSuffix')}
            spacingStyles="padding-top-XXXS"
          />
        </HeaderContainer>

        <ImageContainer>
          <StyledImage source={headerImage} width="70%" height="166px" />
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
              onPress={() => {
                navigation.navigate('ApplyNow');
                openApplyNowModal({ isModalOpen: false, isPLCCModalOpen: true });
              }}
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
          <Image source={PLCC_LOOKUP_2_POINTS} width="100%" height="60px" />
        </ImageContainer>

        <ImageContainer>
          <Image source={BenefitImage} width="100%" height="600px" />
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
          />

          <StyledAnchor
            url={getLabelValue(labels, 'lbl_PLCCModal_faqLink')}
            target="_blank"
            locator="plcc_faq"
            fontSizeVariation="medium"
            anchorVariation="primary"
            underline
            text={getLabelValue(labels, 'lbl_PLCCModal_faqText')}
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
      </>
    );
  }
}

MyPlaceRewardsCreditCard.propTypes = {
  labels: PropTypes.shape({}),
  openApplyNowModal: PropTypes.func.isRequired,
  navigation: PropTypes.func.isRequired,
};

MyPlaceRewardsCreditCard.defaultProps = {
  labels: {},
};

export default MyPlaceRewardsCreditCard;
