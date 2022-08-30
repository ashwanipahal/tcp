import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';

import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import { Row, Col } from '../../../../../../common/atoms';
import styles from './OrderSummarySkeleton.style';

const OrderSummarySkeleton = ({ className }) => {
  return (
    <div className={`${className}`}>
      <Row>
        <Col colSize={{ small: 4, medium: 6, large: 10 }}>
          <div className="order-item-details">
            <LoaderSkelton />
          </div>
          <div className="order-item-details">
            <LoaderSkelton />
          </div>
          <div className="applied-coupon-details">
            <LoaderSkelton />
          </div>
          <div className="applied-offer-details">
            <LoaderSkelton />
          </div>
        </Col>

        <Col colSize={{ small: 2, medium: 2, large: 2 }} className="column-end">
          <div className="right-section-values">
            <LoaderSkelton />
          </div>
          <div className="right-section-values">
            <LoaderSkelton />
          </div>
          <div className="right-section-values">
            <LoaderSkelton />
          </div>
          <div className="right-section-values">
            <LoaderSkelton />
          </div>
        </Col>
      </Row>

      <Row className="ledger-divider" />
      <Row>
        <Col colSize={{ small: 4, medium: 6, large: 10 }}>
          <div className="total-savings">
            <LoaderSkelton />
          </div>
          <div className="estimated-total-price">
            <LoaderSkelton />
          </div>
        </Col>

        <Col colSize={{ small: 2, medium: 2, large: 2 }} className="column-end">
          <div className="total-price">
            <LoaderSkelton />
          </div>
          <div className="right-section-values">
            <LoaderSkelton />
          </div>
        </Col>
      </Row>
    </div>
  );
};

OrderSummarySkeleton.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(OrderSummarySkeleton, styles);
export { OrderSummarySkeleton as OrderSummarySkeletonVanilla };
