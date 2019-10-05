import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/LoyaltyBannerSection.style';
import { BodyCopy, Anchor } from '../../../../../../common/atoms';
import labelsHashValuesReplace from '../../../util/utility';
import PlccSection from '../../PlccSection';
import GuestMpr from '../../GuestMpr';
// import ApplyNowView from '../../ApplyNowView';

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
  let finalPointsLabelStr = '';
  let finalPointsValue = '';
  let finalStrRemainingPlcc = '';
  let finalStrRemainingValue = '';
  let conditionalPointsLabel = '';

  /* istanbul ignore else */
  if (currentSubtotal > thresholdValue) {
    showSubtotal = true;
  }

  const valueArr = [{ value: estimatedRewardsVal, classValue: `${className} mpr-plcc-theme` }];
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

  finalPointsValue = labelsHashValuesReplace(conditionalPointsLabel, valueArr);
  // eslint-disable-next-line react/no-danger
  finalPointsLabelStr = <span dangerouslySetInnerHTML={{ __html: finalPointsValue }} />;

  const valueArrNextReward = [
    { value: pointsToNextReward, classValue: `${className} mpr-plcc-theme` },
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
            <GuestMpr
              className={className}
              finalPointsLabelStr={finalPointsLabelStr}
              labels={labels}
              showSubtotal={showSubtotal}
              currentSubtotal={currentSubtotal}
              estimatedSubtotal={estimatedSubtotal}
            />
          )}
          {isPlcc && (
            <PlccSection
              className={className}
              finalPointsLabelStr={finalPointsLabelStr}
              finalStrRemainingPlcc={finalStrRemainingPlcc}
              labels={labels}
              earnedReward={earnedReward}
            />
          )}
          <div className="footer alignCenter elem-pt-MED elem-pb-MED">
            {/* {!isPlcc && <ApplyNowView />} */}
            {/* <Anchor
              className="learnMore elem-pl-XL"
              fontSizeVariation="medium"
              underline
              to="/#"
              anchorVariation="primary"
              dataLocator="payment-makedefault"
              // onClick={this.handleDefaultLinkClick}
            >
              {labels.learnMore}
            </Anchor> */}
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
};

LoyaltyBannerSection.defaultProps = {
  className: '',
  estimatedRewardsVal: 0,
  currentSubtotal: 0,
  estimatedSubtotal: 0,
  thresholdValue: 0,
  isGuest: false,
  earnedReward: 0,
  isPlcc: false,
  pointsToNextReward: 0,
};

export default withStyles(LoyaltyBannerSection, Styles);
export { LoyaltyBannerSection as LoyaltyBannerSectionVanilla };
