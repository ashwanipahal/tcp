import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import {
  LineStyle,
  FooterLinksSection,
  LearnMoreWrapper,
} from '../styles/LoyaltyBannerSection.style.native';
import { mobileHashValues, renderLoyaltyLabels } from '../../../util/utilityNative';
import GuestMprPlccSection from '../../GuestMprPlccSection';
import Anchor from '../../../../../../common/atoms/Anchor';

const renderApplyNowLink = labels => {
  return (
    <Anchor
      className="applyNow"
      fontSizeVariation="medium"
      anchorVariation="primary"
      text={labels.applyNow}
      underline
    />
  );
};

const renderLearnMoreLink = labels => {
  return (
    <Anchor
      className="learnMore"
      fontSizeVariation="medium"
      anchorVariation="primary"
      text={labels.learnMore}
      underline
    />
  );
};

const LoyaltyBannerSection = props => {
  const {
    labels,
    currentSubtotal,
    estimatedSubtotal,
    thresholdValue,
    isGuest,
    earnedReward,
    isPlcc,
    estimatedRewardsVal,
    pointsToNextReward,
    getCurrencySymbol,
    isReviewPage,
    isConfirmationPage,
  } = props;
  let showSubtotal = false;
  let headingLabel = '';
  let remainingPlcc = '';
  let subHeadingLabel = '';
  let descriptionLabel = '';

  /* istanbul ignore else */
  if (currentSubtotal > thresholdValue && !isPlcc && !isReviewPage && !isConfirmationPage) {
    showSubtotal = true;
  }

  const LoyaltyLabels = renderLoyaltyLabels(
    labels,
    estimatedRewardsVal,
    earnedReward,
    isGuest,
    isPlcc,
    isReviewPage,
    isConfirmationPage
  );
  headingLabel = LoyaltyLabels.headingLabelValFn
    ? mobileHashValues(
        LoyaltyLabels.headingLabelValFn,
        '#estimatedRewardsVal#',
        LoyaltyLabels.rewardPointsValueFn,
        isPlcc
      )
    : false;
  subHeadingLabel = LoyaltyLabels.subHeadingLabelFn || false;
  descriptionLabel = LoyaltyLabels.descriptionLabelFn || false;
  remainingPlcc = LoyaltyLabels.remainingPlccValFn
    ? mobileHashValues(
        LoyaltyLabels.remainingPlccValFn,
        '#pointsToNextReward#',
        pointsToNextReward,
        isPlcc
      )
    : false;

  return (
    <View>
      <LineStyle isPlcc={isPlcc} />
      <GuestMprPlccSection
        labels={labels}
        headingLabel={headingLabel}
        subHeadingLabel={subHeadingLabel}
        descriptionLabel={descriptionLabel}
        remainingPlcc={remainingPlcc}
        showSubtotal={showSubtotal}
        getCurrencySymbol={getCurrencySymbol}
        currentSubtotal={currentSubtotal}
        estimatedSubtotal={estimatedSubtotal}
        isPlcc={isPlcc}
      />
      <FooterLinksSection>
        {!isPlcc && renderApplyNowLink(labels)}
        <LearnMoreWrapper>{renderLearnMoreLink(labels)}</LearnMoreWrapper>
      </FooterLinksSection>
      <LineStyle isPlcc={isPlcc} />
    </View>
  );
};

LoyaltyBannerSection.propTypes = {
  labels: PropTypes.shape.isRequired,
  currentSubtotal: PropTypes.number,
  estimatedSubtotal: PropTypes.number,
  thresholdValue: PropTypes.number,
  earnedReward: PropTypes.number,
  isPlcc: PropTypes.bool,
  isGuest: PropTypes.bool,
  getCurrencySymbol: PropTypes.string,
  estimatedRewardsVal: PropTypes.string,
  pointsToNextReward: PropTypes.number,
  isReviewPage: PropTypes.bool,
  isConfirmationPage: PropTypes.bool,
};

LoyaltyBannerSection.defaultProps = {
  currentSubtotal: 0,
  estimatedSubtotal: 0,
  thresholdValue: 0,
  earnedReward: 0,
  isPlcc: false,
  isGuest: false,
  getCurrencySymbol: '',
  estimatedRewardsVal: '',
  pointsToNextReward: 0,
  isReviewPage: false,
  isConfirmationPage: false,
};

export default LoyaltyBannerSection;
