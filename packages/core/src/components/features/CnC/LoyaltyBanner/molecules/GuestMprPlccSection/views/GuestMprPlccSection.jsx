import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/GuestMprPlccSection.style';
import { BodyCopy, Row, Col } from '../../../../../../common/atoms';

const GuestMprPlccSection = props => {
  const {
    className,
    headingLabel,
    subHeadingLabel,
    labels,
    showSubtotal,
    currentSubtotal,
    estimatedSubtotal,
    descriptionLabel,
    remainingPlcc,
    getCurrencySymbol,
  } = props;
  return (
    <div className={`${className} body`}>
      {headingLabel && (
        <BodyCopy
          className="heading-val"
          color="text.primary"
          fontFamily="secondary"
          fontWeight="extrabold"
        >
          {headingLabel}
        </BodyCopy>
      )}
      {subHeadingLabel && (
        <BodyCopy
          className="subheading-val"
          color="text.primary"
          fontFamily="secondary"
          fontWeight="extrabold"
        >
          {subHeadingLabel}
        </BodyCopy>
      )}
      {descriptionLabel && (
        <BodyCopy
          className="description-val"
          color="text.primary"
          fontFamily="secondary"
          fontWeight="extrabold"
        >
          {descriptionLabel}
        </BodyCopy>
      )}

      {remainingPlcc && (
        <BodyCopy
          className="remaining-val"
          color="text.primary"
          fontFamily="secondary"
          fontWeight="extrabold"
        >
          {remainingPlcc}
        </BodyCopy>
      )}
      {showSubtotal && (
        <div className="subtotal-section">
          <Row fullBleed className="subtotal-row">
            <Col colSize={{ large: 7, medium: 5, small: 4 }} className="current-subtotal-text-col">
              <BodyCopy
                className="current-subtotal-text"
                component="span"
                color="text.primary"
                fontFamily="secondary"
                fontWeight="extrabold"
              >
                {labels.currentSubtotal}
              </BodyCopy>
            </Col>
            {currentSubtotal && (
              <Col colSize={{ large: 5, medium: 3, small: 2 }} className="current-subtotal-val-col">
                <BodyCopy
                  className="current-subtotal-val"
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
          <Row fullBleed className="estimated-subtotal-row elem-pt-SM elem-pb-SM">
            <Col
              colSize={{ large: 7, medium: 5, small: 4 }}
              className="estimated-subtotal-text-col"
            >
              <BodyCopy
                className="estimated-subtotal-text"
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
                className="estimated-subtotal-val-col"
              >
                <BodyCopy
                  className="estimated-subtotal-val"
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
  showSubtotal: PropTypes.bool,
  labels: PropTypes.shape.isRequired,
  className: PropTypes.string,
  headingLabel: PropTypes.string,
  subHeadingLabel: PropTypes.string,
  descriptionLabel: PropTypes.string,
  remainingPlcc: PropTypes.number,
  getCurrencySymbol: PropTypes.string,
};

GuestMprPlccSection.defaultProps = {
  className: '',
  estimatedSubtotal: 0,
  currentSubtotal: 0,
  showSubtotal: false,
  headingLabel: '',
  subHeadingLabel: '',
  descriptionLabel: '',
  remainingPlcc: 0,
  getCurrencySymbol: '',
};

export default withStyles(GuestMprPlccSection, Styles);
export { GuestMprPlccSection as GuestMprPlccSectionVanilla };
