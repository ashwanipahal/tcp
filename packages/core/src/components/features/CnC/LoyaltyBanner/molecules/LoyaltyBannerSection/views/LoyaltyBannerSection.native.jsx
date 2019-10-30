import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import { LineStyle, LoyaltySectionWrapper } from '../styles/LoyaltyBannerSection.style.native';
import {
  PointsValueText,
  PointsToNextReward,
  SectionSymbol,
} from '../../GuestMprPlccSection/styles/GuestMprPlccSection.style.native';
import mobileHashValues from '../../../util/utilityNative';
import { renderLoyaltyLabels, getPageCategory } from '../../../util/utilityCommon';
import GuestMprPlccSection from '../../GuestMprPlccSection';
import LoyaltyFooterSection from '../../LoyaltyFooterSection';

const LoyaltyBannerSection = props => {
  const {
    labels,
    currentSubtotal,
    estimatedSubtotal,
    thresholdValue,
    earnedReward,
    isGuest,
    isPlcc,
    estimatedRewardsVal,
    pointsToNextReward,
    getCurrencySymbol,
    pageCategory,
  } = props;
  let showSubtotal = false;
  let headingLabel = '';
  let remainingPlcc = '';
  let subHeadingLabel = '';
  let descriptionLabel = '';
  const earnedRewardAvailable = !!earnedReward;

  const pageCategoryArr = getPageCategory(pageCategory);
  const {
    isReviewPage,
    isConfirmationPage,
    isAddedToBagPage,
    isProductDetailView,
  } = pageCategoryArr;

  const pageChecksObj = {
    isGuest,
    isPlcc,
    pageCategoryArr,
    earnedRewardAvailable,
  };

  /* istanbul ignore else */
  if (
    estimatedSubtotal > thresholdValue &&
    !isPlcc &&
    !isReviewPage &&
    !isConfirmationPage &&
    !isAddedToBagPage
  ) {
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

  const utilArrHeading = [
    {
      key: '#estimatedRewardsVal# ',
      value: (
        <PointsValueText pageChecksObj={pageChecksObj}>
          {`${LoyaltyLabels.rewardPointsValueFn} `}
        </PointsValueText>
      ),
    },
    {
      key: '#br# ',
      value: '\n',
    },
  ];
  headingLabel = LoyaltyLabels.headingLabelValFn
    ? mobileHashValues(LoyaltyLabels.headingLabelValFn, utilArrHeading)
    : false;

  const utilArrSubHeading = [
    {
      key: '#sectionSymbol#',
      value: (
        <SectionSymbol pageChecksObj={pageChecksObj}>{`${labels.sectionSymbol} `}</SectionSymbol>
      ),
    },
  ];
  subHeadingLabel = LoyaltyLabels.subHeadingLabelFn
    ? mobileHashValues(LoyaltyLabels.subHeadingLabelFn, utilArrSubHeading)
    : false;
  const utilArrDescription = [
    {
      key: '#br# ',
      value: '\n',
    },
  ];
  descriptionLabel = LoyaltyLabels.descriptionLabelFn
    ? mobileHashValues(LoyaltyLabels.descriptionLabelFn, utilArrDescription)
    : false;
  const utilArrNextReward = [
    {
      key: '#pointsToNextReward# ',
      value: (
        <PointsToNextReward pageChecksObj={pageChecksObj}>
          {`${pointsToNextReward} `}
        </PointsToNextReward>
      ),
    },
  ];
  remainingPlcc = LoyaltyLabels.remainingPlccValFn
    ? mobileHashValues(LoyaltyLabels.remainingPlccValFn, utilArrNextReward)
    : false;

  return (
    <>
      <LineStyle isPlcc={isPlcc} />
      <LoyaltySectionWrapper>
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
          pageChecksObj={pageChecksObj}
        />
        <View className="footer">
          <LoyaltyFooterSection
            labels={labels}
            isPlcc={isPlcc}
            isProductDetailView={isProductDetailView}
            isReviewPage={isReviewPage}
            isConfirmationPage={isConfirmationPage}
            isGuest={isGuest}
            isAddedToBagPage={isAddedToBagPage}
            earnedRewardAvailable={earnedRewardAvailable}
          />
        </View>
      </LoyaltySectionWrapper>
      <LineStyle isPlcc={isPlcc} />
    </>
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
};

export default LoyaltyBannerSection;
