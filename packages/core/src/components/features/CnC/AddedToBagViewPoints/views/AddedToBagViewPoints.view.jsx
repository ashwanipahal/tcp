import React from 'react';
import PropTypes from 'prop-types';
import { isCanada } from '@tcp/core/src/utils';
import { PriceCurrency } from '@tcp/core/src/components/common/molecules';
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

const getRewardsPointsLabel = (labels, isUserLoggedIn) => {
  return isUserLoggedIn ? labels.MPRPoints : labels.pointsYouCanEarn;
};

const AddedToBagViewPoints = ({
  className,
  pointsSummary,
  labels,
  isPlcc,
  isInternationalShipping,
  isUserLoggedIn,
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
      tabIndex="0"
    >
      <Row className="row-padding" tabIndex="0">
        <Col colSize={{ large: 8, small: 4, medium: 6 }}>{labels.price}</Col>
        <Col
          data-locator="addedtobag-productprice"
          className="text-value"
          colSize={{ large: 4, small: 2, medium: 2 }}
        >
          <PriceCurrency price={itemPrice} />
        </Col>
      </Row>
      {showPoints(userPoints, isInternationalShipping) && (
        <Row className="row-padding bag-points">
          <Col colSize={{ large: 8, small: 5, medium: 6 }}>
            <BodyCopy fontSize="fs13" fontFamily="secondary" fontWeight="extrabold">
              {getRewardsPointsLabel(labels, isUserLoggedIn)}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 4, small: 1, medium: 2 }}>
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
      <Row className="row-padding" tabIndex="0">
        <Col colSize={{ large: 8, small: 4, medium: 6 }}>
          {getModifiedString(labels, totalItems || 0)}
        </Col>
        <Col
          data-locator="addedtobag-bagsubtotal"
          className="text-value"
          colSize={{ large: 4, small: 2, medium: 2 }}
        >
          <PriceCurrency price={bagSubTotal} />
        </Col>
      </Row>
      {showPoints(userPoints, isInternationalShipping) && (
        <Row className="row-padding" tabIndex="0">
          <Col colSize={{ large: 8, small: 5, medium: 6 }}>
            <BodyCopy fontSize="fs13" fontFamily="secondary" fontWeight="extrabold">
              {labels.totalRewardsInPoints}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 4, small: 1, medium: 2 }}>
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
        <Row className="row-padding" tabIndex="0">
          <Col colSize={{ large: 8, small: 5, medium: 6 }}>
            <BodyCopy fontSize="fs13" fontFamily="secondary" fontWeight="extrabold">
              {labels.totalNextRewards}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 4, small: 1, medium: 2 }}>
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
  isInternationalShipping: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
};

export default withStyles(AddedToBagViewPoints, styles);
export { AddedToBagViewPoints as AddedToBagViewPointsVanilla };
