import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/LoyaltyBannerSection.style';
import { BodyCopy, Anchor } from '../../../../../../common/atoms';
import labelsHashValuesReplace from '../../../util/utility';
import GuestMprPlccSection from '../../GuestMprPlccSection';

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
  } = props;
  let showSubtotal = false;
  let finalPointsLabelStr = '';
  let finalPointsValue = '';
  let remainingPlcc = '';
  let finalStrRemainingValue = '';
  let conditionalPointsLabel = '';
  let pointsDescription = '';

  /* istanbul ignore else */
  if (currentSubtotal > thresholdValue) {
    showSubtotal = true;
  }

  const convertHtml = value => {
    // eslint-disable-next-line react/no-danger
    return <span dangerouslySetInnerHTML={{ __html: value }} />;
  };

  if (!earnedReward) {
    if (isGuest) {
      conditionalPointsLabel = labels.youCanEarnPoints;
    } else if (!isPlcc) {
      conditionalPointsLabel = labels.youllEarnPoints;
    } else {
      conditionalPointsLabel = labels.youllEarnPointsPlcc;
    }
  } else if (isGuest) {
    conditionalPointsLabel = labels.becomeMemberOnThisPurchase;
  } else if (!isPlcc) {
    conditionalPointsLabel = labels.youllGetWithThisPurchase;
  } else {
    conditionalPointsLabel = labels.youllGetARewardPlcc;
  }
  const utilArrRewards = [
    {
      key: '#estimatedRewardsVal#',
      value: estimatedRewardsVal,
      classValue: `${className} mpr-plcc-theme`,
    },
  ];

  finalPointsValue = labelsHashValuesReplace(conditionalPointsLabel, utilArrRewards);
  finalPointsLabelStr = convertHtml(finalPointsValue);

  if (isPlcc) {
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
    pointsDescription = labels.earnDoublePoints;
  }

  return (
    <div className={`${className} elem-mb-MED`}>
      <div className="backgroundWhite elem-pt-SM elem-pb-SM elem-pl-MED elem-pr-MED">
        <BodyCopy className="loyaltyBannerSectionWrapper" component="div" fontFamily="secondary">
          {!isPlcc && (
            <GuestMprPlccSection
              className={className}
              finalPointsLabelStr={finalPointsLabelStr}
              labels={labels}
              showSubtotal={showSubtotal}
              currentSubtotal={currentSubtotal}
              estimatedSubtotal={estimatedSubtotal}
              isPlcc={isPlcc}
              pointsDescription={pointsDescription}
              earnedReward={earnedReward}
              remainingPlcc={remainingPlcc}
              getCurrencySymbol={getCurrencySymbol}
            />
          )}
          <div className="footer alignCenter elem-pt-MED elem-pb-MED">
            {!isPlcc && (
              <Anchor
                className="applyNow"
                fontSizeVariation="medium"
                anchorVariation="primary"
                text={labels.applyNow}
                underline
              />
            )}
            <Anchor
              className="learnMore elem-pl-XL"
              fontSizeVariation="medium"
              anchorVariation="primary"
              text={labels.learnMore}
              underline
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
};

export default withStyles(LoyaltyBannerSection, Styles);
export { LoyaltyBannerSection as LoyaltyBannerSectionVanilla };
