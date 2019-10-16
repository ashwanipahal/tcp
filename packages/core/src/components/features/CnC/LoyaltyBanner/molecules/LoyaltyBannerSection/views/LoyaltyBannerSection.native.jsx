import React from 'react';
import { PropTypes } from 'prop-types';
import {
  LoyaltyBannerContainer,
  LineStyle,
  FooterLinksSection,
  LearnMoreWrapper,
} from '../styles/LoyaltyBannerSection.style.native';
import mobileHashValues from '../../../util/utilityNative';
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
  } = props;
  let showSubtotal = false;
  let headingLabel = '';
  let conditionalPointsLabelVal = '';
  let rewardPointsValue = '';
  let remainingPlcc = false;

  /* istanbul ignore else */
  if (currentSubtotal > thresholdValue && !isPlcc) {
    showSubtotal = true;
  }

  if (!earnedReward) {
    rewardPointsValue = estimatedRewardsVal;
    if (isGuest) {
      conditionalPointsLabelVal = labels.youCanEarnPoints;
    } else if (!isPlcc) {
      conditionalPointsLabelVal = labels.youllEarnPoints;
    } else {
      conditionalPointsLabelVal = labels.youllEarnPointsPlcc;
      remainingPlcc = mobileHashValues(
        labels.thatsSomePointsFromReward,
        '#pointsToNextReward#',
        pointsToNextReward,
        ''
      );
    }
  } else {
    rewardPointsValue = earnedReward;
    if (isGuest) {
      conditionalPointsLabelVal = labels.becomeMemberOnThisPurchase;
    } else if (!isPlcc) {
      conditionalPointsLabelVal = labels.youllGetWithThisPurchase;
    } else {
      conditionalPointsLabelVal = labels.youllGetARewardPlcc;
    }
  }
  headingLabel = mobileHashValues(
    conditionalPointsLabelVal,
    '#estimatedRewardsVal#',
    rewardPointsValue,
    'mpr-plcc-theme'
  );

  const subHeadingLabel = labels.save30Today;
  const descriptionLabel = labels.earnDoublePoints;

  return (
    <LoyaltyBannerContainer>
      <LineStyle />
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
      />
      <FooterLinksSection>
        {!isPlcc && renderApplyNowLink(labels)}
        <LearnMoreWrapper>{renderLearnMoreLink(labels)}</LearnMoreWrapper>
      </FooterLinksSection>

      <LineStyle />
    </LoyaltyBannerContainer>
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
};

export default LoyaltyBannerSection;
