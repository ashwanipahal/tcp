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

const returnBoolForSubTotal = (
  estimatedSubtotal,
  checkThresholdValue,
  thresholdValue,
  isPlcc,
  isReviewPage,
  isConfirmationPage,
  isAddedToBagPage
) => {
  let showSubtotal = false;
  /* istanbul ignore else */
  if (
    estimatedSubtotal &&
    checkThresholdValue > thresholdValue &&
    !isPlcc &&
    !isReviewPage &&
    !isConfirmationPage &&
    !isAddedToBagPage
  ) {
    showSubtotal = true;
  }
  return showSubtotal;
};

const LoyaltyBannerSection = props => {
  const {
    className,
    labels,
    currentSubtotal,
    estimatedSubtotal,
    checkThresholdValue,
    thresholdValue,
    isGuest,
    earnedReward,
    isPlcc,
    estimatedRewardsVal,
    pointsToNextReward,
    getCurrencySymbol,
    pageCategory,
    isProductDetailView,
    openOverlay,
    closeAddedToBagModal,
  } = props;
  let showSubtotal = false;
  let headingLabel = '';
  let remainingPlcc = '';
  let subHeadingLabel = '';
  let descriptionLabel = '';
  const earnedRewardAvailable = !!earnedReward;

  const pageCategoryArr = getPageCategory(pageCategory);
  const { isReviewPage, isConfirmationPage, isAddedToBagPage } = pageCategoryArr;

  showSubtotal = returnBoolForSubTotal(
    estimatedSubtotal,
    checkThresholdValue,
    thresholdValue,
    isPlcc,
    isReviewPage,
    isConfirmationPage,
    isAddedToBagPage
  );

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
            isGuest={isGuest}
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
              openOverlay={openOverlay}
              closeAddedToBagModal={closeAddedToBagModal}
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
  checkThresholdValue: PropTypes.number,
  isGuest: PropTypes.bool,
  earnedReward: PropTypes.number,
  isPlcc: PropTypes.bool,
  pointsToNextReward: PropTypes.number,
  getCurrencySymbol: PropTypes.string,
  isProductDetailView: PropTypes.bool,
  pageCategory: PropTypes.string,
  openOverlay: PropTypes.func.isRequired,
  closeAddedToBagModal: PropTypes.func.isRequired,
};

LoyaltyBannerSection.defaultProps = {
  className: '',
  estimatedRewardsVal: null,
  currentSubtotal: 0,
  estimatedSubtotal: 0,
  thresholdValue: 0,
  checkThresholdValue: 0,
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
