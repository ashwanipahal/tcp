import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/LoyaltyBannerSection.style';
import { BodyCopy, Anchor } from '../../../../../../common/atoms';
import labelsHashValuesReplace from '../../../util/utility';
import GuestMprPlccSection from '../../GuestMprPlccSection';

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
      className="learnMore elem-pl-XL"
      fontSizeVariation="medium"
      anchorVariation="primary"
      text={labels.learnMore}
      underline
    />
  );
};

const renderCreateAccountLink = labels => {
  return (
    <Anchor
      className="createAccount"
      fontSizeVariation="medium"
      anchorVariation="primary"
      text={labels.createAccount}
      underline
    />
  );
};

const renderLogInLink = labels => {
  return (
    <Anchor
      className="login elem-pl-XL"
      fontSizeVariation="medium"
      anchorVariation="primary"
      text={labels.logIn}
      underline
    />
  );
};

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

const renderLoyaltyBanner = (earnedReward, isGuest, labels, isPlcc) => {
  let conditionalPointsLabelVal = '';
  if (!earnedReward) {
    if (isGuest) {
      conditionalPointsLabelVal = labels.youCanEarnPoints;
    } else if (!isPlcc) {
      conditionalPointsLabelVal = labels.youllEarnPoints;
    } else {
      conditionalPointsLabelVal = labels.youllEarnPointsPlcc;
    }
  } else if (isGuest) {
    conditionalPointsLabelVal = labels.becomeMemberOnThisPurchase;
  } else if (!isPlcc) {
    conditionalPointsLabelVal = labels.youllGetWithThisPurchase;
  } else {
    conditionalPointsLabelVal = labels.youllGetARewardPlcc;
  }

  return { conditionalPointsLabelVal };
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
  } = props;
  let showSubtotal = false;
  let headingLabel = '';
  let finalPointsValue = '';
  let remainingPlcc = '';
  let finalStrRemainingValue = '';
  let conditionalPointsLabel = '';
  let subHeadingLabel = '';
  let pointsDescription = '';
  let fsPoints = '';

  const showSubtotalReceived = subTotalCalc(currentSubtotal, thresholdValue);
  showSubtotal = showSubtotalReceived.showSubtotalCalc;

  const convertHtml = value => {
    // eslint-disable-next-line react/no-danger
    return <span dangerouslySetInnerHTML={{ __html: value }} />;
  };

  if (isProductDetailView) {
    const LoyaltyMessage = renderPDPLoyaltyMessage(earnedReward, isGuest, labels, isPlcc);
    headingLabel = LoyaltyMessage.pdpHeadingLabel;
    subHeadingLabel = LoyaltyMessage.pdpSubHeadingLabel;
  } else {
    const LoyaltyMessage = renderLoyaltyBanner(earnedReward, isGuest, labels, isPlcc);
    conditionalPointsLabel = LoyaltyMessage.conditionalPointsLabelVal;

    const utilArrRewards = [
      {
        key: '#estimatedRewardsVal#',
        value: estimatedRewardsVal,
        classValue: `${className} mpr-plcc-theme`,
      },
    ];

    finalPointsValue = labelsHashValuesReplace(conditionalPointsLabel, utilArrRewards);
    headingLabel = convertHtml(finalPointsValue);

    if (isPlcc) {
      fsPoints = 'fs18';
      pointsDescription = convertHtml(labels.whenYouCheckOutPlcc);
      const utilArrNextReward = [
        {
          key: '#pointsToNextReward#',
          value: pointsToNextReward,
          classValue: `${className} mpr-plcc-theme`,
        },
      ];
      finalStrRemainingValue = labelsHashValuesReplace(
        labels.thatsSomePointsFromReward,
        utilArrNextReward
      );
      remainingPlcc = convertHtml(finalStrRemainingValue);
    } else {
      fsPoints = 'fs16';
      pointsDescription = labels.earnDoublePoints;
      subHeadingLabel = labels.save30Today;
    }
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
            fsPoints={fsPoints}
            isPlcc={isPlcc}
            pointsDescription={pointsDescription}
            earnedReward={earnedReward}
            remainingPlcc={remainingPlcc}
            getCurrencySymbol={getCurrencySymbol}
            isProductDetailView={isProductDetailView}
          />
          <div className="footer alignCenter">
            {isProductDetailView && (
              <div>
                {isGuest && (
                  <span>
                    {renderCreateAccountLink(labels)}
                    {renderLogInLink(labels)}
                  </span>
                )}
                {!isGuest && (
                  <>
                    {!isPlcc && (
                      <span>
                        {renderApplyNowLink(labels)}
                        {renderLearnMoreLink(labels)}
                      </span>
                    )}
                    {isPlcc && <span>{renderLearnMoreLink(labels)}</span>}
                  </>
                )}
              </div>
            )}
            {!isProductDetailView && (
              <>
                {!isPlcc && (
                  <span>
                    {renderApplyNowLink(labels)}
                    {renderLearnMoreLink(labels)}
                  </span>
                )}
              </>
            )}
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
  pointsToNextReward: 0,
  getCurrencySymbol: '',
  isProductDetailView: '',
};

export default withStyles(LoyaltyBannerSection, Styles);
export { LoyaltyBannerSection as LoyaltyBannerSectionVanilla };
