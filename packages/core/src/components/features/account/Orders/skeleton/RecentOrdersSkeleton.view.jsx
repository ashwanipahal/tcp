import React from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';

import { Row, Col, BodyCopy } from '@tcp/core/src/components/common/atoms';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';

import styles from '../styles/RecentOrdersSkeleton.style';

const RecentOrdersSkeleton = ({ labels, hideHeader, className }) => {
  const rowHeaderClass = hideHeader ? 'hide-on-desktop hide-on-tablet' : '';

  return (
    <div className={className}>
      <Row fullBleed className={className}>
        <Col colSize={{ large: 5, medium: 3, small: 6 }}>
          <Row fullBleed className={`order-item-header ${rowHeaderClass}`}>
            <Col colSize={{ large: 6, medium: 4, small: 2 }}>
              <BodyCopy
                data-locator="order-date-header"
                fontFamily="secondary"
                fontWeight="extrabold"
                fontSize="fs14"
              >
                {getLabelValue(labels, 'lbl_orders_orderDate', 'orders')}
              </BodyCopy>
            </Col>
            <Col colSize={{ large: 6, medium: 4, small: 4 }}>
              <BodyCopy
                data-locator="order-number-header"
                fontFamily="secondary"
                fontWeight="extrabold"
                fontSize="fs14"
              >
                {getLabelValue(labels, 'lbl_orders_orderNumber', 'orders')}
              </BodyCopy>
            </Col>
          </Row>
          <Row fullBleed className="order-item-value">
            <Col colSize={{ large: 6, medium: 4, small: 2 }}>
              <LoaderSkelton width="100%" height="20px" />
            </Col>
            <Col colSize={{ large: 2, medium: 4, small: 4 }}>
              <LoaderSkelton width="100%" height="20px" />
            </Col>
          </Row>
        </Col>
        <Col colSize={{ large: 7, medium: 5, small: 6 }} ignoreGutter={{ small: true }}>
          <Row fullBleed className={`order-item-header ${rowHeaderClass}`}>
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy
                data-locator="order-type-header"
                fontFamily="secondary"
                fontWeight="extrabold"
                fontSize="fs14"
              >
                {getLabelValue(labels, 'lbl_orders_orderType', 'orders')}
              </BodyCopy>
            </Col>
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy
                data-locator="order-status-header"
                fontFamily="secondary"
                fontWeight="extrabold"
                fontSize="fs14"
              >
                {getLabelValue(labels, 'lbl_orders_orderStatus', 'orders')}
              </BodyCopy>
            </Col>
            <Col colSize={{ large: 4, medium: 2, small: 2 }}>
              <BodyCopy
                data-locator="order-total-header"
                fontFamily="secondary"
                fontWeight="extrabold"
                fontSize="fs14"
                className="order-total"
              >
                {getLabelValue(labels, 'lbl_orders_orderTotal', 'orders')}
              </BodyCopy>
            </Col>
          </Row>
          <Row fullBleed className="order-item-bottom">
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <LoaderSkelton width="100%" height="20px" />
            </Col>
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <LoaderSkelton width="100%" height="20px" />
            </Col>
            <Col colSize={{ large: 4, medium: 2, small: 2 }}>
              <LoaderSkelton width="100%" height="20px" />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

RecentOrdersSkeleton.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  hideHeader: PropTypes.bool,
};

RecentOrdersSkeleton.defaultProps = {
  className: '',
  hideHeader: false,
};

export default withStyles(RecentOrdersSkeleton, styles);
export { RecentOrdersSkeleton as RecentOrdersSkeletonVanilla };
