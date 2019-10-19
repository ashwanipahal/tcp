/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/LoyaltyBannerSection.style';
import { BodyCopy } from '../../../../../../common/atoms';
import { labelsHashValuesReplace, convertHtml } from '../../../util/utility';
import GuestMprPlccSection from '../../GuestMprPlccSection';
import LoyaltyFooterSection from '../../LoyaltyFooterSection';
import renderLoyaltyLabels from '../../../util/utilityCommon';

// const renderPDPLoyaltyMessage = (earnedReward, isGuest, labels, isPlcc) => {
//   let pdpHeadingLabel = '';
//   let pdpSubHeadingLabel = '';
//   if (!earnedReward) {
//     if (isGuest) {
//       pdpHeadingLabel = labels.getRewardedShopping;
//       pdpSubHeadingLabel = labels.loyaltyPayPoints;
//     } else if (!isPlcc) {
//       pdpHeadingLabel = labels.earnDoublePointsPDP;
//       pdpSubHeadingLabel = labels.myPlaceCreditCard;
//     } else {
//       pdpHeadingLabel = labels.getDoublePointsPLCCPDP;
//       pdpSubHeadingLabel = labels.checkoutMyPlaceCreditCard;
//     }
//   }
//   return { pdpHeadingLabel, pdpSubHeadingLabel };
// };

const concatSectionSymbol = (str, sectionSymbol) => {
  return `${str}<sup className="sub-heading-section-symbol">${sectionSymbol}</sup>`;
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
    isReviewPage,
    isConfirmationPage,
    isProductDetailView,
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

  const utilArrRewards = [
    {
      key: '#estimatedRewardsVal#',
      value: LoyaltyLabels.rewardPointsValueFn,
      classValue: `${className} mpr-plcc-theme`,
    },
  ];

  const finalPointsValue = labelsHashValuesReplace(LoyaltyLabels.headingLabelValFn, utilArrRewards);

  headingLabel = LoyaltyLabels.headingLabelValFn ? convertHtml(finalPointsValue) : false;
  subHeadingLabel = LoyaltyLabels.subHeadingLabelFn
    ? convertHtml(concatSectionSymbol(LoyaltyLabels.subHeadingLabelFn, labels.sectionSymbol))
    : false;
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
    <div className={`${className} elem-mb-MED`}>
      <div className="backgroundWhite elem-pt-SM elem-pb-SM loyalty-banner-wrapper">
        <BodyCopy className="loyaltyBannerSectionWrapper" component="div" fontFamily="secondary">
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
          <div className="footer alignCenter">
            <LoyaltyFooterSection
              className={className}
              labels={labels}
              isPlcc={isPlcc}
              isProductDetailView={isProductDetailView}
              isReviewPage={isReviewPage}
              isGuest={isGuest}
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
  isReviewPage: PropTypes.bool,
  isConfirmationPage: PropTypes.bool,
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
  isReviewPage: false,
  pointsToNextReward: 0,
  getCurrencySymbol: '',
  isProductDetailView: '',
  isConfirmationPage: false,
};

export default withStyles(LoyaltyBannerSection, Styles);
export { LoyaltyBannerSection as LoyaltyBannerSectionVanilla };
