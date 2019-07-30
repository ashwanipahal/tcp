import React from 'react';
import PropTypes from 'prop-types';
import Col from '../../../../common/atoms/Col';
import Row from '../../../../common/atoms/Row';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import styles from '../styles/AddedToBagViewPoints.style';
import withStyles from '../../../../common/hoc/withStyles';

const getModifiedString = (labels, totalItems) => {
  const subHeading = `<span>${labels.bagSubTotal.replace('#items', `${totalItems}`)}</span>`;
  return (
    // eslint-disable-next-line react/no-danger
    <span dangerouslySetInnerHTML={{ __html: subHeading }} />
  );
};

const AddedToBagViewPoints = ({ className, pointsSummary, labels }) => {
  const {
    itemPrice,
    itemPoints,
    bagSubTotal,
    userPoints,
    pointsToNextReward,
    totalItems,
  } = pointsSummary;
  return (
    <BodyCopy color="black" fontFamily="secondary" component="div" className={className}>
      <Row className="row-padding">
        <Col colSize={{ large: 9, small: 4, medium: 6 }}>{labels.price}</Col>
        <Col className="text-value" colSize={{ large: 3, small: 2, medium: 2 }}>
          <BodyCopy className="text-value" data-locator="addedtobag-productprice">
            {`$${itemPrice || 0}`}
          </BodyCopy>
        </Col>
      </Row>
      <Row>
        <Col colSize={{ large: 9, small: 4, medium: 6 }}>
          <BodyCopy fontFamily="secondary" fontWeight="extrabold">
            {labels.pointsYouCanEarn}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 3, small: 2, medium: 2 }}>
          <BodyCopy
            data-locator="addedtobag-pointsonitem"
            fontFamily="secondary"
            className="text-value promo-color"
            fontWeight="extrabold"
          >
            {itemPoints || 0}
          </BodyCopy>
        </Col>
      </Row>
      <Row className="divided-line" />
      <Row className="row-padding">
        <Col colSize={{ large: 9, small: 4, medium: 6 }}>
          {getModifiedString(labels, totalItems || 0)}
        </Col>
        <Col
          data-locator="addedtobag-bagsubtotal"
          className="text-value"
          colSize={{ large: 3, small: 2, medium: 2 }}
        >
          <BodyCopy className="text-value">{`$${bagSubTotal || 0}`}</BodyCopy>
        </Col>
      </Row>
      <Row className="row-padding">
        <Col colSize={{ large: 9, small: 4, medium: 6 }}>
          <BodyCopy fontFamily="secondary" fontWeight="extrabold">
            {labels.totalRewardsInPoints}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 3, small: 2, medium: 2 }}>
          <BodyCopy
            data-locator="addedtobag-totalrewardpoints"
            fontFamily="secondary"
            className="text-value promo-color"
            fontWeight="extrabold"
          >
            {userPoints || 0}
          </BodyCopy>
        </Col>
      </Row>
      <Row className="row-padding">
        <Col colSize={{ large: 9, small: 4, medium: 6 }}>
          <BodyCopy fontFamily="secondary" fontWeight="extrabold">
            {labels.totalNextRewards}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 3, small: 2, medium: 2 }}>
          <BodyCopy
            data-locator="addedtobag-totalpointsnextreward"
            fontFamily="secondary"
            className="text-value promo-color"
            fontWeight="extrabold"
          >
            {pointsToNextReward || 0}
          </BodyCopy>
        </Col>
      </Row>
    </BodyCopy>
  );
};

AddedToBagViewPoints.propTypes = {
  className: PropTypes.string.isRequired,
  pointsSummary: PropTypes.shape.isRequired,
  labels: PropTypes.shape.isRequired,
};

export default withStyles(AddedToBagViewPoints, styles);
export { AddedToBagViewPoints as AddedToBagViewPointsVanilla };
