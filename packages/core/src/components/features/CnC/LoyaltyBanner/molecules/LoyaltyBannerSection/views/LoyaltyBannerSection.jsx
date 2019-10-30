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

const utilArrayHeader = (LoyaltyLabels, className) => {
  return [
    {
      key: '#estimatedRewardsVal#',
      value: LoyaltyLabels.rewardPointsValueFn
        ? `<span class="${className} mpr-plcc-theme">${LoyaltyLabels.rewardPointsValueFn}</span>`
        : false,
    },
    {
      key: '#br#',
      value: '<br/>',
    },
    {
      key: '#tagOpen#',
      value: `<span class="${className} mpr-plcc-theme">`,
    },
    {
      key: '#tagClose#',
      value: `</span>`,
    },
  ];
};

const utilArrayNextReward = (pointsToNextReward, className) => {
  return [
    {
      key: '#pointsToNextReward#',
      value:
        pointsToNextReward && pointsToNextReward > 0
          ? `<span class="${className} mpr-plcc-theme">${pointsToNextReward}</span>`
          : '',
    },
  ];
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

  const utilArrHeader = utilArrayHeader(LoyaltyLabels, className);
  const finalHeaderValue = labelsHashValuesReplace(LoyaltyLabels.headingLabelValFn, utilArrHeader);
  headingLabel = LoyaltyLabels.headingLabelValFn ? convertHtml(finalHeaderValue) : false;

  const utilArrSubHeader = [
    {
      key: '#sectionSymbol#',
      value: `<span class="${className} section-symbol">${labels.sectionSymbol}</span>`,
    },
  ];
  const finalSubHeadingValue = labelsHashValuesReplace(
    LoyaltyLabels.subHeadingLabelFn,
    utilArrSubHeader
  );
  subHeadingLabel = LoyaltyLabels.subHeadingLabelFn ? convertHtml(finalSubHeadingValue) : false;
  const utilArrDescription = [
    {
      key: '#br#',
      value: '<br/>',
    },
  ];
  const finalDescriptionValue = labelsHashValuesReplace(
    LoyaltyLabels.descriptionLabelFn,
    utilArrDescription
  );
  descriptionLabel = LoyaltyLabels.descriptionLabelFn ? convertHtml(finalDescriptionValue) : false;

  const utilArrNextReward = utilArrayNextReward(pointsToNextReward, className);
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
            earnedRewardAvailable={earnedRewardAvailable}
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
