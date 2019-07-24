import React from 'react';
import PropTypes from 'prop-types';
import Col from '../../../../common/atoms/Col';
import Row from '../../../../common/atoms/Row';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import styles from '../styles/AddedToBagViewPoints.style';
import withStyles from '../../../../common/hoc/withStyles';

const AddedToBagViewPoints = ({ className, pointsSummary }) => {
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
        <Col colSize={{ large: 9, small: 4, medium: 6 }}>Price</Col>
        <Col className="value" colSize={{ large: 3, small: 2, medium: 2 }}>
          {`$${itemPrice}`}
        </Col>
      </Row>
      <Row>
        <Col colSize={{ large: 9, small: 4, medium: 6 }}>
          <BodyCopy fontWeight="semibold">Points you can earned on item(s)</BodyCopy>
        </Col>
        <Col colSize={{ large: 3, small: 2, medium: 2 }}>
          <BodyCopy className="value promo-color" fontWeight="semibold">
            {itemPoints}
          </BodyCopy>
        </Col>
      </Row>
      <Row className="divided-line" />
      <Row className="row-padding">
        <Col colSize={{ large: 9, small: 4, medium: 6 }}>
          {`Bag SubTotal (${totalItems} items)`}
        </Col>
        <Col className="value" colSize={{ large: 3, small: 2, medium: 2 }}>
          {`$${bagSubTotal}`}
        </Col>
      </Row>
      <Row className="row-padding">
        <Col colSize={{ large: 9, small: 4, medium: 6 }}>
          <BodyCopy fontWeight="semibold">Total My Place Reward points in Bag</BodyCopy>
        </Col>
        <Col colSize={{ large: 3, small: 2, medium: 2 }}>
          <BodyCopy className="value promo-color" fontWeight="semibold">
            {userPoints}
          </BodyCopy>
        </Col>
      </Row>
      <Row className="row-padding">
        <Col colSize={{ large: 9, small: 4, medium: 6 }}>
          <BodyCopy fontWeight="semibold">Total Points to Next Reward</BodyCopy>
        </Col>
        <Col colSize={{ large: 3, small: 2, medium: 2 }}>
          <BodyCopy className="value promo-color" fontWeight="semibold">
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
};

export default withStyles(AddedToBagViewPoints, styles);
export { AddedToBagViewPoints as AddedToBagViewPointsVanilla };
