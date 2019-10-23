/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/LoyaltyBannerSection.style';
import { BodyCopy } from '../../../../../../common/atoms';
import { labelsHashValuesReplace, convertHtml } from '../../../util/utility';
import GuestMprPlccSection from '../../GuestMprPlccSection';
import LoyaltyFooterSection from '../../LoyaltyFooterSection';
import { renderLoyaltyLabels, getPageCategory } from '../../../util/utilityCommon';

// const concatSectionSymbol = (str, sectionSymbol) => {
//   return `${str}<sup className="sub-heading-section-symbol">${sectionSymbol}</sup>`;
// };

const setHeadingLabelUpperCase = (headingLabel, isReviewPage, isConfirmationPage) => {
  if (isReviewPage || isConfirmationPage) {
    return headingLabel.toUpperCase();
  }
  return headingLabel;
};

const LoyaltyBannerSection = props => {
  const {
    className,
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
  const earnedRewardAvailable = !!earnedReward;

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

  const utilArrRewards = [
    {
      key: '#estimatedRewardsVal#',
      value: LoyaltyLabels.rewardPointsValueFn,
      classValue: `${className} mpr-plcc-theme`,
    },
    {
      key: '#br#',
      value: '<br/>',
      classValue: `${className} mpr-plcc-theme`,
    },
    {
      key: '#myPlaceRewards#',
      value: 'MY PLACE REWARDS',
      classValue: `${className} mpr-plcc-theme`,
    },
  ];
  const utilArrSectionSymbol = [
    {
      key: '#sectionSymbol#',
      value: labels.sectionSymbol,
      classValue: `${className} section-symbol`,
    },
  ];

  const finalPointsValue = labelsHashValuesReplace(LoyaltyLabels.headingLabelValFn, utilArrRewards);
  const finalSubHeading = labelsHashValuesReplace(
    LoyaltyLabels.subHeadingLabelFn,
    utilArrSectionSymbol
  );

  headingLabel = setHeadingLabelUpperCase(headingLabel, isReviewPage, isConfirmationPage);
  headingLabel = LoyaltyLabels.headingLabelValFn ? convertHtml(finalPointsValue) : false;
  subHeadingLabel = LoyaltyLabels.subHeadingLabelFn ? convertHtml(finalSubHeading) : false;
  descriptionLabel = LoyaltyLabels.descriptionLabelFn || false;

  const utilArrNextReward = [
    {
      key: '#pointsToNextReward#',
      value: pointsToNextReward,
      classValue: `${className} mpr-plcc-theme`,
    },
  ];
  const finalStrRemainingValue = labelsHashValuesReplace(
    LoyaltyLabels.remainingPlccValFn,
    utilArrNextReward
  );

  remainingPlcc = LoyaltyLabels.remainingPlccValFn ? convertHtml(finalStrRemainingValue) : false;

  return (
    <div className={`${className}`}>
      <div className="loyalty-banner-wrapper">
        <BodyCopy className="loyalty-banner-section-wrapper" component="div" fontFamily="secondary">
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
            pageCategory={pageCategory}
            isProductDetailView={isProductDetailView}
          />
          <div className="footer">
            <LoyaltyFooterSection
              className={className}
              labels={labels}
              isPlcc={isPlcc}
              isProductDetailView={isProductDetailView}
              isReviewPage={isReviewPage}
              isConfirmationPage={isConfirmationPage}
              isGuest={isGuest}
              isAddedToBagPage={isAddedToBagPage}
              earnedRewardAvailable={earnedRewardAvailable}
            />
          </div>
        </BodyCopy>
      </div>
    </div>
  );
};

LoyaltyBannerSection.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape.isRequired,
  estimatedRewardsVal: PropTypes.number,
  currentSubtotal: PropTypes.number,
  estimatedSubtotal: PropTypes.number,
  thresholdValue: PropTypes.number,
  isGuest: PropTypes.bool,
  earnedReward: PropTypes.number,
  isPlcc: PropTypes.bool,
  pointsToNextReward: PropTypes.number,
  getCurrencySymbol: PropTypes.string,
  isProductDetailView: PropTypes.bool,
  pageCategory: PropTypes.string,
};

LoyaltyBannerSection.defaultProps = {
  className: '',
  estimatedRewardsVal: null,
  currentSubtotal: 0,
  estimatedSubtotal: 0,
  thresholdValue: 0,
  isGuest: false,
  earnedReward: 0,
  isPlcc: false,
  pageCategory: '',
  pointsToNextReward: 0,
  getCurrencySymbol: '',
  isProductDetailView: '',
};

export default withStyles(LoyaltyBannerSection, Styles);
export { LoyaltyBannerSection as LoyaltyBannerSectionVanilla };
