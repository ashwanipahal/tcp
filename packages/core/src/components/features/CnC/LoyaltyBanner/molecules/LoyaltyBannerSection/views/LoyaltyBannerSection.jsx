import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/LoyaltyBannerSection.style';
import { BodyCopy } from '../../../../../../common/atoms';
import Anchor from '../../../../../../common/atoms/Anchor';
import labelsHashValuesReplace from '../../../util/utility';
import PlccSection from '../../PlccSection';
import GuestMprSection from '../../GuestMprSection';

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
  } = props;
  let showSubtotal = false;
  let finalStr = '';
  let finalStrValue = '';
  let finalStrRemainingPlcc = '';
  let finalStrRemainingValue = '';

  /* istanbul ignore else */
  if (currentSubtotal > thresholdValue) {
    showSubtotal = true;
  }
  /* istanbul ignore else */
  const valueArr = [{ value: estimatedRewardsVal, classValue: `${className} colorOrangeBlue` }];
  if (!earnedReward) {
    if (isGuest) {
      finalStrValue = labelsHashValuesReplace(labels.youCanEarnPoints, valueArr);
    } else if (!isPlcc) {
      finalStrValue = labelsHashValuesReplace(labels.youllEarnPoints, valueArr);
    } else {
      finalStrValue = labelsHashValuesReplace(labels.youllEarnPointsPlcc, valueArr);
    }
  } else if (isGuest) {
    finalStrValue = labelsHashValuesReplace(labels.becomeMemberOnThisPurchase, valueArr);
  } else if (!isPlcc) {
    finalStrValue = labelsHashValuesReplace(labels.youllGetWithThisPurchase, valueArr);
  } else {
    finalStrValue = labelsHashValuesReplace(labels.youllGetARewardPlcc, valueArr);
  }
  // eslint-disable-next-line react/no-danger
  finalStr = <span dangerouslySetInnerHTML={{ __html: finalStrValue }} />;

  const valueArrNextReward = [
    { value: pointsToNextReward, classValue: `${className} colorOrangeBlue` },
  ];
  finalStrRemainingValue = labelsHashValuesReplace(
    labels.thatsSomePointsFromReward,
    valueArrNextReward
  );

  // eslint-disable-next-line react/no-danger
  finalStrRemainingPlcc = <span dangerouslySetInnerHTML={{ __html: finalStrRemainingValue }} />;

  return (
    <div className={`${className} elem-mb-MED`}>
      <div className="backgroundWhite elem-pt-SM elem-pb-SM elem-pl-MED elem-pr-MED">
        <BodyCopy className="loyaltyBannerSectionWrapper" component="div" fontFamily="secondary">
          {!isPlcc && (
            <GuestMprSection
              className={className}
              finalStr={finalStr}
              labels={labels}
              showSubtotal={showSubtotal}
              currentSubtotal={currentSubtotal}
              estimatedSubtotal={estimatedSubtotal}
            />
          )}
          {isPlcc && (
            <PlccSection
              className={className}
              finalStr={finalStr}
              finalStrRemainingPlcc={finalStrRemainingPlcc}
              labels={labels}
              earnedReward={earnedReward}
            />
          )}
          <div className="footer alignCenter elem-pt-MED elem-pb-MED">
            {!isPlcc && (
              <Anchor
                className="applyNow"
                fontSizeVariation="medium"
                underline
                to="/#"
                anchorVariation="primary"
                dataLocator="payment-makedefault"
                // onClick={this.handleDefaultLinkClick}
              >
                {labels.applyNow}
              </Anchor>
            )}
            <Anchor
              className="learnMore elem-pl-XL"
              fontSizeVariation="medium"
              underline
              to="/#"
              anchorVariation="primary"
              dataLocator="payment-makedefault"
              // onClick={this.handleDefaultLinkClick}
            >
              {labels.learnMore}
            </Anchor>
          </div>
        </BodyCopy>
      </div>
    </div>
  );
};

LoyaltyBannerSection.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape({}),
  estimatedRewardsVal: PropTypes.number,
  currentSubtotal: PropTypes.number,
  estimatedSubtotal: PropTypes.number,
  thresholdValue: PropTypes.number,
  isGuest: PropTypes.bool,
  earnedReward: PropTypes.number,
  isPlcc: PropTypes.string,
  pointsToNextReward: PropTypes.number,
};

LoyaltyBannerSection.defaultProps = {
  className: '',
  labels: {},
  estimatedRewardsVal: 0,
  currentSubtotal: 0,
  estimatedSubtotal: 0,
  thresholdValue: 0,
  isGuest: false,
  earnedReward: 0,
  isPlcc: '',
  pointsToNextReward: 0,
};

export default withStyles(LoyaltyBannerSection, Styles);
export { LoyaltyBannerSection as LoyaltyBannerSectionVanilla };
