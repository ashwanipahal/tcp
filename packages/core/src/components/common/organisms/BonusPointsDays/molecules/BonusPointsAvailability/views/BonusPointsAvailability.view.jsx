import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../hoc/withStyles';
import styles from '../styles/BonusPointsAvailability.view.style';
import Button from '../../../../../atoms/Button';
import Col from '../../../../../atoms/Col';
import Row from '../../../../../atoms/Row';

const BonusPointsAvailability = ({ bonusPoints, className }) => {
  return (
    bonusPoints && (
      <Row>
        {bonusPoints.map((item, index) => {
          return (
            <Col
              colSize={{
                large: 6,
                medium: bonusPoints.length === 1 ? 6 : 4,
                small: bonusPoints.length === 1 ? 4 : 3,
              }}
              offsetLeft={{
                large: bonusPoints.length === 1 ? 3 : '',
                medium: bonusPoints.length === 1 ? 1 : '',
                small: bonusPoints.length === 1 ? 1 : '',
              }}
              offsetRight={{
                small: bonusPoints.length === 1 ? 1 : '',
              }}
              className={className}
            >
              <Button
                buttonVariation="fixed-width"
                color="black"
                id={index}
                data-locator={item.dataLocator}
                className={`availability-btn ${item.disabled ? 'disable-btn' : ''}`}
              >
                {item.buttonText}
              </Button>
            </Col>
          );
        })}
      </Row>
    )
  );
};

BonusPointsAvailability.propTypes = {
  bonusPoints: PropTypes.shape([]),
  className: PropTypes.string,
};

BonusPointsAvailability.defaultProps = {
  className: '',
  bonusPoints: [{ disabled: false, buttonText: '' }],
};

export default withStyles(BonusPointsAvailability, styles);
export { BonusPointsAvailability as BonusPointsAvailabilityVanilla };
