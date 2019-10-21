import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import {
  LineStyle,
  FooterLinksSection,
  LearnMoreWrapper,
} from '../styles/LoyaltyBannerSection.style.native';
import mobileHashValues from '../../../util/utilityNative';
import { renderLoyaltyLabels, getPageCategory } from '../../../util/utilityCommon';
import GuestMprPlccSection from '../../GuestMprPlccSection';
import Anchor from '../../../../../../common/atoms/Anchor';
// import LoyaltyFooterSection from '../../LoyaltyFooterSection';

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
    pageCategory,
    isProductDetailView,
  } = props;
  let showSubtotal = false;
  let headingLabel = '';
  let remainingPlcc = '';
  let subHeadingLabel = '';
  let descriptionLabel = '';

  const pageCategoryArr = getPageCategory(pageCategory);
  const { isReviewPage, isConfirmationPage, isAddedToBagPage } = pageCategoryArr;

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
    isConfirmationPage,
    isAddedToBagPage,
    isProductDetailView
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
        isReviewPage={isReviewPage}
        isConfirmationPage={isConfirmationPage}
        isAddedToBagPage={isAddedToBagPage}
        isProductDetailView={isProductDetailView}
      />
      <FooterLinksSection>
        {!isPlcc && renderApplyNowLink(labels)}
        <LearnMoreWrapper>{renderLearnMoreLink(labels)}</LearnMoreWrapper>
      </FooterLinksSection>
      {/* <View className="footer">
        <LoyaltyFooterSection
          labels={labels}
          isPlcc={isPlcc}
          isProductDetailView={isProductDetailView}
          isReviewPage={isReviewPage}
          isConfirmationPage={isConfirmationPage}
          isGuest={isGuest}
          isAddedToBagPage={isAddedToBagPage}
          earnedReward
        />
      </View> */}
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
  pageCategory: PropTypes.string,
  isProductDetailView: PropTypes.bool,
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
  pageCategory: '',
  isProductDetailView: false,
};

export default LoyaltyBannerSection;
