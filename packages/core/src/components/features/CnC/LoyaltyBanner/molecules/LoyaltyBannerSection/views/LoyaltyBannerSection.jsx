import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/LoyaltyBannerSection.style';
import { BodyCopy, Row, Col } from '../../../../../../common/atoms';
import Anchor from '../../../../../../common/atoms/Anchor';

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
  } = props;
  let showSubtotal = false;
  let pointInitial = '';
  let pointMiddle = '';
  let pointEnding = '';
  /* istanbul ignore else */
  if (currentSubtotal > thresholdValue) {
    showSubtotal = true;
  }
  /* istanbul ignore else */
  if (!earnedReward) {
    pointMiddle = estimatedRewardsVal;
    pointEnding = labels.pointsOnPurchase;
    if (isGuest) {
      pointInitial = labels.youCanEarn;
    } else {
      pointInitial = labels.youllEarn;
    }
  } else {
    pointMiddle = earnedReward;
    if (isGuest) {
      pointInitial = labels.becomeMember;
      pointEnding = labels.pointsOnPurchase;
    } else {
      pointInitial = labels.youllGetA;
      pointEnding = labels.withThisPurchase;
    }
  }

  return (
    <div className={`${className} elem-mb-MED`}>
      <div className="backgroundWhite elem-pt-SM elem-pb-SM elem-pl-MED elem-pr-MED">
        <BodyCopy className="loyaltyBannerSectionWrapper" component="div" fontFamily="secondary">
          <BodyCopy
            className="youCanEarnPoints alignCenter elem-pt-MED"
            fontSize="fs16"
            component="div"
            color="text.primary"
            fontFamily="secondary"
            fontWeight="extrabold"
          >
            {pointInitial}
            <BodyCopy
              className="estimatedRewardsVal colorOrange"
              fontSize="fs16"
              component="span"
              color="text.primary"
              fontFamily="secondary"
              fontWeight="extrabold"
            >
              {pointMiddle}
            </BodyCopy>
            {pointEnding}
          </BodyCopy>
          <BodyCopy
            className="save30Today alignCenter colorOrange elem-pt-MED"
            fontSize="fs18"
            component="div"
            color="text.primary"
            fontFamily="primary"
            fontWeight="extrabold"
          >
            {labels.save30Today}
          </BodyCopy>
          <BodyCopy
            className="earnDoublePoints alignCenter elem-pt-MED elem-pb-MED elem-pl-SM elem-pr-SM"
            fontSize="fs16"
            component="div"
            color="text.primary"
            fontFamily="secondary"
            fontWeight="extrabold"
          >
            {labels.earnDoublePoints}
          </BodyCopy>
          {showSubtotal && (
            <div className="subtotalPointsSection elem-pt-MED elem-pl-SM elem-pr-SM">
              <Row fullBleed className="currentSubtotalRow">
                <Col colSize={{ large: 7, medium: 5, small: 4 }} className="currentSubtotalTextCol">
                  <BodyCopy
                    className="currentSubtotalText"
                    fontSize="fs14"
                    component="span"
                    color="text.primary"
                    fontFamily="secondary"
                    fontWeight="extrabold"
                  >
                    {labels.currentSubtotal}
                  </BodyCopy>
                </Col>
                {currentSubtotal && (
                  <Col
                    colSize={{ large: 5, medium: 3, small: 2 }}
                    className="currentSubtotalValCol"
                  >
                    <BodyCopy
                      className="currentSubtotalVal"
                      fontSize="fs16"
                      component="span"
                      color="text.primary"
                      fontFamily="secondary"
                      fontWeight="semibold"
                    >
                      {'$'}
                      {currentSubtotal}
                    </BodyCopy>
                  </Col>
                )}
              </Row>
              <Row fullBleed className="estimatedSubtotalRow elem-pt-SM elem-pb-MED">
                <Col
                  colSize={{ large: 7, medium: 5, small: 4 }}
                  className="estimatedSubtotalTextCol"
                >
                  <BodyCopy
                    className="estimatedSubtotalText"
                    fontSize="fs14"
                    component="span"
                    color="text.primary"
                    fontFamily="secondary"
                    fontWeight="extrabold"
                  >
                    {labels.estimatedSubtotal}
                  </BodyCopy>
                </Col>
                {estimatedSubtotal && (
                  <Col
                    colSize={{ large: 5, medium: 3, small: 2 }}
                    className="estimatedSubtotalValCol"
                  >
                    <BodyCopy
                      className="estimatedSubtotalVal"
                      fontSize="fs18"
                      component="span"
                      color="text.primary"
                      fontFamily="secondary"
                      fontWeight="extrabold"
                    >
                      {'$'}
                      {estimatedSubtotal}
                    </BodyCopy>
                  </Col>
                )}
              </Row>
            </div>
          )}
          <div className="alignCenter elem-pt-MED elem-pb-MED">
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
};

LoyaltyBannerSection.defaultProps = {
  className: '',
  labels: {},
  estimatedRewardsVal: null,
  currentSubtotal: null,
  estimatedSubtotal: null,
  thresholdValue: null,
  isGuest: false,
  earnedReward: null,
};

export default withStyles(LoyaltyBannerSection, Styles);
export { LoyaltyBannerSection as LoyaltyBannerSectionVanilla };
