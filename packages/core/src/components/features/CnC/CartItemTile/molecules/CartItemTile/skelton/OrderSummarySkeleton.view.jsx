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
          <div className="div1">
            <LoaderSkelton />
          </div>
          <div className="div1">
            <LoaderSkelton />
          </div>
          <div className="div3">
            <LoaderSkelton />
          </div>
          <div className="div4">
            <LoaderSkelton />
          </div>
        </Col>

        <Col colSize={{ small: 2, medium: 2, large: 2 }} className="column-end">
          <div className="div5">
            <LoaderSkelton />
          </div>
          <div className="div5">
            <LoaderSkelton />
          </div>
          <div className="div5">
            <LoaderSkelton />
          </div>
          <div className="div5">
            <LoaderSkelton />
          </div>
        </Col>
      </Row>

      <Row className="div8" />
      <Row>
        <Col colSize={{ small: 4, medium: 6, large: 10 }}>
          <div className="div6">
            <LoaderSkelton />
          </div>
          <div className="div7">
            <LoaderSkelton />
          </div>
        </Col>

        <Col colSize={{ small: 2, medium: 2, large: 2 }} className="column-end">
          <div className="div9">
            <LoaderSkelton />
          </div>
          <div className="div5">
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
