import React from 'react';
import PropTypes from 'prop-types';
import Col from '../../../../common/atoms/Col';
import Row from '../../../../common/atoms/Row';
import styles from '../styles/AddedToBagViewPoints.style';
import withStyles from '../../../../common/hoc/withStyles';

const AddedToBagViewPoints = ({ className, pointsSummary }) => {
  const {
    itemPrice,
    itemPoints,
    subTotal,
    userPoints,
    pointsToNextReward,
    totalItems,
  } = pointsSummary;
  return (
    <div className={className}>
      <Row className="row-padding">
        <Col colSize={{ large: 9, small: 4, medium: 6 }}>Price</Col>
        <Col className="value" colSize={{ large: 3, small: 2, medium: 2 }}>
          ${itemPrice}
        </Col>
      </Row>
      <Row className="bold-text">
        <Col colSize={{ large: 9, small: 4, medium: 6 }}>Points you can earned on item(s)</Col>
        <Col className="value promo-color" colSize={{ large: 3, small: 2, medium: 2 }}>
          {itemPoints}
        </Col>
      </Row>
      <Row className="divided-line" />
      <Row className="row-padding">
        <Col colSize={{ large: 9, small: 4, medium: 6 }}>
          Bag Total ({totalItems}
          items)
        </Col>
        <Col className="value" colSize={{ large: 3, small: 2, medium: 2 }}>
          ${subTotal}
        </Col>
      </Row>
      <Row className="bold-text row-padding">
        <Col colSize={{ large: 9, small: 4, medium: 6 }}>Total My Place Reward points in Bag</Col>
        <Col className="value promo-color" colSize={{ large: 3, small: 2, medium: 2 }}>
          {userPoints}
        </Col>
      </Row>
      <Row className="bold-text row-padding">
        <Col colSize={{ large: 9, small: 4, medium: 6 }}>Total Points to Next Reward</Col>
        <Col className="value promo-color" colSize={{ large: 3, small: 2, medium: 2 }}>
          {pointsToNextReward}
        </Col>
      </Row>
    </div>
  );
};

AddedToBagViewPoints.propTypes = {
  className: PropTypes.string.isRequired,
  pointsSummary: PropTypes.shape.isRequired,
};

export default withStyles(AddedToBagViewPoints, styles);
export { AddedToBagViewPoints as AddedToBagViewPointsVanilla };
