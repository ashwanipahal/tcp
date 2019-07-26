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
        <Col className="value" colSize={{ large: 3, small: 2, medium: 2 }}>
          {`$${itemPrice}`}
        </Col>
      </Row>
      <Row>
        <Col colSize={{ large: 9, small: 4, medium: 6 }}>
          <BodyCopy fontFamily="secondary" fontWeight="extrabold">
            {labels.pointsYouCanEarn}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 3, small: 2, medium: 2 }}>
          <BodyCopy fontFamily="secondary" className="value promo-color" fontWeight="extrabold">
            {itemPoints}
          </BodyCopy>
        </Col>
      </Row>
      <Row className="divided-line" />
      <Row className="row-padding">
        <Col colSize={{ large: 9, small: 4, medium: 6 }}>
          {getModifiedString(labels, totalItems)}
        </Col>
        <Col className="value" colSize={{ large: 3, small: 2, medium: 2 }}>
          {`$${bagSubTotal}`}
        </Col>
      </Row>
      <Row className="row-padding">
        <Col colSize={{ large: 9, small: 4, medium: 6 }}>
          <BodyCopy fontFamily="secondary" fontWeight="extrabold">
            {labels.totalRewardsInPoints}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 3, small: 2, medium: 2 }}>
          <BodyCopy fontFamily="secondary" className="value promo-color" fontWeight="extrabold">
            {userPoints}
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
          <BodyCopy fontFamily="secondary" className="value promo-color" fontWeight="extrabold">
            {pointsToNextReward}
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
