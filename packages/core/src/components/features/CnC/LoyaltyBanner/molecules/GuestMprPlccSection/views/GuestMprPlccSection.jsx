import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/GuestMprPlccSection.style';
import { BodyCopy, Row, Col } from '../../../../../../common/atoms';

const GuestMprPlccSection = props => {
  const {
    className,
    finalPointsLabelStr,
    labels,
    showSubtotal,
    currentSubtotal,
    estimatedSubtotal,
    isPlcc,
    pointsDescription,
    earnedReward,
    remainingPlcc,
    getCurrencySymbol,
  } = props;

  return (
    <div className={`${className} body`}>
      <BodyCopy
        className="youCanEarnPoints alignCenter"
        color="text.primary"
        fontFamily="secondary"
        fontWeight="extrabold"
      >
        {finalPointsLabelStr}
      </BodyCopy>
      {!isPlcc && (
        <BodyCopy
          className="save30Today alignCenter mpr-plcc-theme"
          color="text.primary"
          fontFamily="secondary"
          fontWeight="extrabold"
        >
          {labels.save30Today}
        </BodyCopy>
      )}
      <BodyCopy
        className="earnDoublePoints alignCenter elem-pl-SM elem-pr-SM"
        color="text.primary"
        fontFamily="secondary"
        fontWeight="extrabold"
      >
        {pointsDescription}
      </BodyCopy>
      {isPlcc && !earnedReward && (
        <BodyCopy
          className="earnDoublePoints alignCenter"
          fontSize="fs16"
          color="text.primary"
          fontFamily="secondary"
          fontWeight="extrabold"
        >
          {remainingPlcc}
        </BodyCopy>
      )}
      {showSubtotal && !isPlcc && (
        <div className="subtotalPointsSection elem-pl-SM elem-pr-SM">
          <Row fullBleed className="currentSubtotalRow">
            <Col colSize={{ large: 7, medium: 5, small: 4 }} className="currentSubtotalTextCol">
              <BodyCopy
                className="currentSubtotalText"
                component="span"
                color="text.primary"
                fontFamily="secondary"
                fontWeight="extrabold"
              >
                {labels.currentSubtotal}
              </BodyCopy>
            </Col>
            {currentSubtotal && (
              <Col colSize={{ large: 5, medium: 3, small: 2 }} className="currentSubtotalValCol">
                <BodyCopy
                  className="currentSubtotalVal"
                  component="span"
                  color="text.primary"
                  fontFamily="secondary"
                  fontWeight="semibold"
                >
                  {getCurrencySymbol}
                  {currentSubtotal}
                </BodyCopy>
              </Col>
            )}
          </Row>
          <Row fullBleed className="estimatedSubtotalRow elem-pt-SM elem-pb-SM">
            <Col colSize={{ large: 7, medium: 5, small: 4 }} className="estimatedSubtotalTextCol">
              <BodyCopy
                className="estimatedSubtotalText"
                component="span"
                color="text.primary"
                fontFamily="secondary"
                fontWeight="extrabold"
              >
                {labels.estimatedSubtotal}
              </BodyCopy>
            </Col>
            {estimatedSubtotal && (
              <Col colSize={{ large: 5, medium: 3, small: 2 }} className="estimatedSubtotalValCol">
                <BodyCopy
                  className="estimatedSubtotalVal"
                  component="span"
                  color="text.primary"
                  fontFamily="secondary"
                  fontWeight="extrabold"
                >
                  {getCurrencySymbol}
                  {estimatedSubtotal}
                </BodyCopy>
              </Col>
            )}
          </Row>
        </div>
      )}
    </div>
  );
};

GuestMprPlccSection.propTypes = {
  estimatedSubtotal: PropTypes.number,
  currentSubtotal: PropTypes.number,
  showSubtotal: PropTypes.number,
  labels: PropTypes.shape.isRequired,
  className: PropTypes.string,
  finalPointsLabelStr: PropTypes.string,
  isPlcc: PropTypes.bool,
  pointsDescription: PropTypes.string,
  earnedReward: PropTypes.number,
  remainingPlcc: PropTypes.number,
  getCurrencySymbol: PropTypes.string,
};

GuestMprPlccSection.defaultProps = {
  className: '',
  estimatedSubtotal: 0,
  currentSubtotal: 0,
  showSubtotal: 0,
  finalPointsLabelStr: '',
  isPlcc: false,
  pointsDescription: '',
  earnedReward: 0,
  remainingPlcc: 0,
  getCurrencySymbol: '',
};

export default withStyles(GuestMprPlccSection, Styles);
export { GuestMprPlccSection as GuestMprPlccSectionVanilla };
