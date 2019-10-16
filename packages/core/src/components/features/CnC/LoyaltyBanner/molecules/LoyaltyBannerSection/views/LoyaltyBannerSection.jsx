import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/LoyaltyBannerSection.style';
import { BodyCopy } from '../../../../../../common/atoms';
import {
  labelsHashValuesReplace,
  renderLoyaltyBanner,
  convertHtml,
  updateLoyaltyBannerLabels,
} from '../../../util/utility';
import GuestMprPlccSection from '../../GuestMprPlccSection';
import LoyaltyFooterSection from '../../LoyaltyFooterSection';

const renderPDPLoyaltyMessage = (earnedReward, isGuest, labels, isPlcc) => {
  let pdpHeadingLabel = '';
  let pdpSubHeadingLabel = '';
  if (!earnedReward) {
    if (isGuest) {
      pdpHeadingLabel = labels.getRewardedShopping;
      pdpSubHeadingLabel = labels.loyaltyPayPoints;
    } else if (!isPlcc) {
      pdpHeadingLabel = labels.earnDoublePointsPDP;
      pdpSubHeadingLabel = labels.myPlaceCreditCard;
    } else {
      pdpHeadingLabel = labels.getDoublePointsPLCCPDP;
      pdpSubHeadingLabel = labels.checkoutMyPlaceCreditCard;
    }
  }
  return { pdpHeadingLabel, pdpSubHeadingLabel };
};

const subTotalCalc = (currentSubtotal, thresholdValue) => {
  /* istanbul ignore else */
  let showSubtotalCalc = false;
  if (currentSubtotal > thresholdValue) {
    showSubtotalCalc = true;
  }
  return { showSubtotalCalc };
};

const LoyaltyBannerSection = props => {
  const {
    className,
    labels,
    estimatedRewardsVal,
    currentSubtotal,
    estimatedSubtotal,
    thresholdValue,
    isGuest,
    earnedReward,
    isPlcc,
    pointsToNextReward,
    getCurrencySymbol,
    isProductDetailView,
    isReviewPage,
  } = props;
  let showSubtotal = false;
  let headingLabel = '';
  let finalPointsValue = '';
  let remainingPlcc = '';
  let finalStrRemainingValue = '';
  let conditionalPointsLabel = '';
  let subHeadingLabel = '';
  let pointsDescription = '';
  let remainingPlccLabel = '';
  let rewardPointsValue = '';

  const showSubtotalReceived = subTotalCalc(currentSubtotal, thresholdValue);
  showSubtotal = showSubtotalReceived.showSubtotalCalc;

  if (isProductDetailView) {
    const LoyaltyMessage = renderPDPLoyaltyMessage(earnedReward, isGuest, labels, isPlcc);
    headingLabel = LoyaltyMessage.pdpHeadingLabel;
    subHeadingLabel = LoyaltyMessage.pdpSubHeadingLabel;
  } else {
    const LoyaltyMessage = renderLoyaltyBanner(
      earnedReward,
      estimatedRewardsVal,
      isGuest,
      labels,
      isPlcc,
      isReviewPage
    );
    conditionalPointsLabel = LoyaltyMessage.conditionalPointsLabelVal;
    rewardPointsValue = LoyaltyMessage.rewardPointsVal;

    const utilArrRewards = [
      {
        key: '#estimatedRewardsVal#',
        value: rewardPointsValue,
        classValue: `${className} mpr-plcc-theme`,
      },
    ];

    finalPointsValue = labelsHashValuesReplace(conditionalPointsLabel, utilArrRewards);
    headingLabel = convertHtml(finalPointsValue);

    const updatedLoyaltyBannerLabels = updateLoyaltyBannerLabels(
      isReviewPage,
      isPlcc,
      isGuest,
      earnedReward,
      labels
    );

    subHeadingLabel = updatedLoyaltyBannerLabels.subHeadingLabelVal;
    pointsDescription = updatedLoyaltyBannerLabels.pointsDescriptionVal;
    remainingPlccLabel = updatedLoyaltyBannerLabels.remainingPlccLabelVal;
    showSubtotal = updatedLoyaltyBannerLabels.showSubtotalVal;
  }

  if (remainingPlccLabel) {
    const utilArrNextReward = [
      {
        key: '#pointsToNextReward#',
        value: pointsToNextReward,
        classValue: `${className} mpr-plcc-theme`,
      },
    ];
    finalStrRemainingValue = labelsHashValuesReplace(remainingPlccLabel, utilArrNextReward);
    remainingPlcc = convertHtml(finalStrRemainingValue);
  }

  return (
    <div className={`${className} elem-mb-MED`}>
      <div className="backgroundWhite elem-pt-SM elem-pb-SM loyalty-banner-wrapper">
        <BodyCopy className="loyaltyBannerSectionWrapper" component="div" fontFamily="secondary">
          <GuestMprPlccSection
            className={className}
            headingLabel={headingLabel}
            subHeadingLabel={subHeadingLabel}
            labels={labels}
            showSubtotal={showSubtotal}
            currentSubtotal={currentSubtotal}
            estimatedSubtotal={estimatedSubtotal}
            isPlcc={isPlcc}
            pointsDescription={pointsDescription}
            remainingPlcc={remainingPlcc}
            getCurrencySymbol={getCurrencySymbol}
            isProductDetailView={isProductDetailView}
            isReviewPage={isReviewPage}
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
};

export default withStyles(LoyaltyBannerSection, Styles);
export { LoyaltyBannerSection as LoyaltyBannerSectionVanilla };
