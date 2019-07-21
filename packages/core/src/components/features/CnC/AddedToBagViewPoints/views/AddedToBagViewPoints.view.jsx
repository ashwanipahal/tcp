import React from 'react';
import PropTypes from 'prop-types';
import Col from '../../../../common/atoms/Col';
import Row from '../../../../common/atoms/Row';
import styles from '../styles/AddedToBagViewPoints.style';
import withStyles from '../../../../common/hoc/withStyles';

// disabled elint

const AddedToBagViewPoints = ({ className }) => {
  return (
    <div className={className}>
      <Row className="row-padding">
        <Col colSize={{ large: 9, small: 9, medium: 9 }}>Price</Col>
        <Col className="value" colSize={{ large: 3, small: 3, medium: 3 }}>
          $12
        </Col>
      </Row>
      <Row className="bold-text">
        <Col colSize={{ large: 9, small: 9, medium: 9 }}>Points you can earned on item(s)</Col>
        <Col className="value promo-color" colSize={{ large: 3, small: 3, medium: 3 }}>
          12
        </Col>
      </Row>
      <Row className="divided-line" />
      <Row className="row-padding">
        <Col colSize={{ large: 9, small: 9, medium: 9 }}>Bag Total (3itms)</Col>
        <Col className="value" colSize={{ large: 3, small: 3, medium: 3 }}>
          $12
        </Col>
      </Row>
      <Row className="bold-text row-padding">
        <Col colSize={{ large: 9, small: 9, medium: 9 }}>Total My Place Reward points in Bag</Col>
        <Col className="value promo-color" colSize={{ large: 3, small: 3, medium: 3 }}>
          32
        </Col>
      </Row>
      <Row className="bold-text row-padding">
        <Col colSize={{ large: 9, small: 9, medium: 9 }}>Total Points to Next Reward</Col>
        <Col className="value promo-color" colSize={{ large: 3, small: 3, medium: 3 }}>
          67
        </Col>
      </Row>
    </div>
  );
};

AddedToBagViewPoints.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(AddedToBagViewPoints, styles);
export { AddedToBagViewPoints as AddedToBagViewPointsVanilla };
