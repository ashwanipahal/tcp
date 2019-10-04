/* eslint-disable complexity */
import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/guestMprSection.style';
import { BodyCopy, Row, Col } from '../../../../../../common/atoms';

const PlccSection = props => {
  const { className, finalStr, labels, showSubtotal, currentSubtotal, estimatedSubtotal } = props;

  return (
    <div className={`${className} body`}>
      <BodyCopy
        className="youCanEarnPoints alignCenter elem-pt-MED"
        fontSize="fs16"
        component="p"
        color="text.primary"
        fontFamily="secondary"
        fontWeight="extrabold"
      >
        {finalStr}
      </BodyCopy>
      <BodyCopy
        className="save30Today alignCenter colorOrangeBlue elem-pt-MED"
        fontSize="fs20"
        component="p"
        color="text.primary"
        fontFamily="primary"
        fontWeight="extrabold"
      >
        {labels.save30Today}
      </BodyCopy>
      <BodyCopy
        className="earnDoublePoints alignCenter elem-pt-MED elem-pb-MED elem-pl-SM elem-pr-SM"
        fontSize="fs16"
        component="p"
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
              <Col colSize={{ large: 5, medium: 3, small: 2 }} className="currentSubtotalValCol">
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
            <Col colSize={{ large: 7, medium: 5, small: 4 }} className="estimatedSubtotalTextCol">
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
              <Col colSize={{ large: 5, medium: 3, small: 2 }} className="estimatedSubtotalValCol">
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
    </div>
  );
};

PlccSection.propTypes = {
  estimatedSubtotal: PropTypes.number,
  currentSubtotal: PropTypes.number,
  showSubtotal: PropTypes.number,
  labels: PropTypes.shape({}),
  className: PropTypes.string,
  finalStr: PropTypes.string,
};

PlccSection.defaultProps = {
  className: '',
  labels: {},
  estimatedSubtotal: 0,
  currentSubtotal: 0,
  showSubtotal: 0,
  finalStr: '',
};

export default withStyles(PlccSection, Styles);
export { PlccSection as PlccSectionVanilla };
