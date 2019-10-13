import React from 'react';
import PropTypes from 'prop-types';
import Col from '../../../../common/atoms/Col';
import Row from '../../../../common/atoms/Row';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import styles from '../styles/AddedToBagViewPoints.style';
import withStyles from '../../../../common/hoc/withStyles';
import { isCanada } from '../../../../../utils';

const getModifiedString = (labels, totalItems) => {
  const subHeading = `<span>${labels.bagSubTotal.replace('#items', `${totalItems}`)}</span>`;
  return (
    // eslint-disable-next-line react/no-danger
    <span dangerouslySetInnerHTML={{ __html: subHeading }} />
  );
};

const showPoints = (userPoints, isInternationalShipping) => {
  return userPoints !== 0 && !isCanada() && !isInternationalShipping;
};

const showPointsToNextRewards = isInternationalShipping => {
  return !isCanada() && !isInternationalShipping;
};

const getPointsColor = isPlcc => {
  if (isPlcc) {
    return 'blue.B100';
  }
  return 'orange.800';
};

const AddedToBagViewPoints = ({
  className,
  pointsSummary,
  labels,
  isPlcc,
  currencySymbol,
  isInternationalShipping,
}) => {
  const {
    itemPrice,
    itemPoints,
    bagSubTotal,
    userPoints,
    pointsToNextReward,
    totalItems,
  } = pointsSummary;
  return (
    <BodyCopy
      fontSize="fs13"
      color="black"
      fontFamily="secondary"
      component="div"
      className={className}
    >
      <Row className="row-padding">
        <Col colSize={{ large: 8, small: 3, medium: 5 }}>{labels.price}</Col>
        <Col
          data-locator="addedtobag-productprice"
          className="text-value"
          colSize={{ large: 4, small: 3, medium: 3 }}
        >
          {`${currencySymbol} ${itemPrice || 0}`}
        </Col>
      </Row>
      {showPoints(userPoints, isInternationalShipping) && (
        <Row>
          <Col colSize={{ large: 8, small: 3, medium: 5 }}>
            <BodyCopy fontSize="fs13" fontFamily="secondary" fontWeight="extrabold">
              {labels.pointsYouCanEarn}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 4, small: 3, medium: 3 }}>
            <BodyCopy
              fontSize="fs13"
              data-locator="addedtobag-pointsonitem"
              fontFamily="secondary"
              className="text-value"
              color={getPointsColor(isPlcc)}
              fontWeight="extrabold"
            >
              {itemPoints || 0}
            </BodyCopy>
          </Col>
        </Row>
      )}
      <Row className="divided-line" />
      <Row className="row-padding">
        <Col colSize={{ large: 8, small: 3, medium: 5 }}>
          {getModifiedString(labels, totalItems || 0)}
        </Col>
        <Col
          data-locator="addedtobag-bagsubtotal"
          className="text-value"
          colSize={{ large: 4, small: 3, medium: 3 }}
        >
          {`${currencySymbol} ${bagSubTotal || 0}`}
        </Col>
      </Row>
      {showPoints(userPoints, isInternationalShipping) && (
        <Row className="row-padding">
          <Col colSize={{ large: 8, small: 3, medium: 5 }}>
            <BodyCopy fontSize="fs13" fontFamily="secondary" fontWeight="extrabold">
              {labels.totalRewardsInPoints}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 4, small: 3, medium: 3 }}>
            <BodyCopy
              fontSize="fs13"
              data-locator="addedtobag-totalrewardpoints"
              fontFamily="secondary"
              className="text-value"
              color={getPointsColor(isPlcc)}
              fontWeight="extrabold"
            >
              {userPoints || 0}
            </BodyCopy>
          </Col>
        </Row>
      )}
      {showPointsToNextRewards(isInternationalShipping) && (
        <Row className="row-padding">
          <Col colSize={{ large: 8, small: 3, medium: 5 }}>
            <BodyCopy fontSize="fs13" fontFamily="secondary" fontWeight="extrabold">
              {labels.totalNextRewards}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 4, small: 3, medium: 3 }}>
            <BodyCopy
              fontSize="fs13"
              data-locator="addedtobag-totalpointsnextreward"
              fontFamily="secondary"
              className="text-value"
              color={getPointsColor(isPlcc)}
              fontWeight="extrabold"
            >
              {pointsToNextReward || 0}
            </BodyCopy>
          </Col>
        </Row>
      )}
    </BodyCopy>
  );
};

AddedToBagViewPoints.propTypes = {
  className: PropTypes.string.isRequired,
  pointsSummary: PropTypes.shape.isRequired,
  labels: PropTypes.shape.isRequired,
  isPlcc: PropTypes.bool.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  isInternationalShipping: PropTypes.bool.isRequired,
};

export default withStyles(AddedToBagViewPoints, styles);
export { AddedToBagViewPoints as AddedToBagViewPointsVanilla };
