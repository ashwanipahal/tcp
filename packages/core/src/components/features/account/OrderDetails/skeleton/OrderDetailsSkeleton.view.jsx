import React from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { Row, Col, BodyCopy } from '@tcp/core/src/components/common/atoms';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import styles from '../styles/OrderDetailsSkeleton.style';

const OrderDetailsSkeleton = ({ className, ordersLabels }) => {
  return (
    <div className={className}>
      <Row fullBleed className="elem-mt-XL">
        <Col colSize={{ large: 5, medium: 4, small: 6 }}>
          <Row fullBleed className="elem-mt-XL">
            <Col colSize={{ large: 3, medium: 8, small: 6 }}>
              <BodyCopy
                fontSize="fs14"
                fontWeight="extrabold"
                fontFamily="secondary"
                className="elem-mb-SM"
              >
                {getLabelValue(ordersLabels, 'lbl_orderDetails_orderNumber')}
              </BodyCopy>
              <LoaderSkelton width="100%" height="40px" className="elem-mb-MED" />
              <BodyCopy
                fontSize="fs14"
                fontWeight="extrabold"
                fontFamily="secondary"
                className="elem-mb-SM"
              >
                {getLabelValue(ordersLabels, 'lbl_orderDetails_orderDate')}
              </BodyCopy>
              <LoaderSkelton width="100%" height="40px" className="elem-mb-MED" />
            </Col>
            <Col colSize={{ large: 6, medium: 8, small: 6 }} className="margin-tablet">
              <LoaderSkelton width="100%" height="200px" className="elem-mb-MED" />
            </Col>
          </Row>
        </Col>
        <Col colSize={{ large: 6, medium: 4, small: 6 }} className="elem-mt-XL">
          <Row fullBleed>
            <Col colSize={{ large: 4, medium: 8, small: 6 }} className="margin-mobile">
              <BodyCopy fontSize="fs14" fontWeight="extrabold" fontFamily="secondary">
                {getLabelValue(ordersLabels, 'lbl_orderDetails_billing')}
              </BodyCopy>
              <LoaderSkelton width="100%" height="200px" className="elem-mb-MED" />
            </Col>
            <Col colSize={{ large: 8, medium: 8, small: 6 }} className="margin-tablet">
              <Row fullBleed className="elem-mb-XS">
                <Col colSize={{ large: 7, medium: 4, small: 3 }}>
                  <BodyCopy fontSize="fs14" fontWeight="extrabold" fontFamily="secondary">
                    {getLabelValue(ordersLabels, 'lbl_orderDetails_orderSummary')}
                  </BodyCopy>
                </Col>
                <Col colSize={{ large: 5, medium: 4, small: 3 }}>
                  <BodyCopy
                    fontSize="fs14"
                    fontWeight="extrabold"
                    fontFamily="secondary"
                    textAlign="right"
                  >
                    {getLabelValue(ordersLabels, 'lbl_orders_orderTotal')}
                  </BodyCopy>
                </Col>
              </Row>
              <Row fullBleed className="elem-mb-XS">
                <Col colSize={{ large: 7, medium: 4, small: 3 }}>
                  <LoaderSkelton width="100%" height="40px" className="elem-mb-MED" />
                </Col>
                <Col colSize={{ large: 5, medium: 4, small: 3 }}>
                  <LoaderSkelton width="100%" height="40px" className="elem-mb-MED" />
                </Col>
              </Row>
              <Row fullBleed className="elem-mb-XS">
                <Col colSize={{ large: 7, medium: 4, small: 3 }}>
                  <LoaderSkelton width="100%" height="40px" className="elem-mb-MED" />
                </Col>
                <Col colSize={{ large: 5, medium: 4, small: 3 }}>
                  <LoaderSkelton width="100%" height="40px" className="elem-mb-MED" />
                </Col>
              </Row>
              <Row fullBleed className="elem-mb-XS total-value">
                <Col colSize={{ large: 7, medium: 4, small: 3 }}>
                  <LoaderSkelton width="100%" height="40px" className="elem-mb-MED" />
                </Col>
                <Col colSize={{ large: 5, medium: 4, small: 3 }}>
                  <LoaderSkelton width="100%" height="40px" className="elem-mb-MED" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row fullBleed>
        <Col colSize={{ large: 5, medium: 4, small: 6 }}>
          <Row fullBleed className="elem-mb-LRG">
            <Col colSize={{ large: 12, medium: 8, small: 6 }}>
              <LoaderSkelton width="100%" height="40px" />
            </Col>
          </Row>
          <Row fullBleed>
            <Col colSize={{ large: 4, medium: 4, small: 3 }}>
              <LoaderSkelton width="100%" height="200px" className="elem-mb-MED" />
            </Col>
            <Col colSize={{ large: 7, medium: 4, small: 3 }}>
              <Row fullBleed className="elem-mb-XS">
                <Col colSize={{ large: 12, medium: 4, small: 3 }}>
                  <LoaderSkelton width="100%" height="40px" className="elem-mb-XS" />
                </Col>
              </Row>
              <Row fullBleed className="elem-mb-XS">
                <Col colSize={{ large: 12, medium: 4, small: 3 }}>
                  <LoaderSkelton width="75%" height="25px" className="elem-mb-XS" />
                </Col>
              </Row>
              <Row fullBleed className="elem-mb-XS">
                <Col colSize={{ large: 12, medium: 4, small: 3 }}>
                  <LoaderSkelton width="50%" height="15px" className="elem-mb-XS" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

OrderDetailsSkeleton.propTypes = {
  ordersLabels: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
};

OrderDetailsSkeleton.defaultProps = {
  className: '',
};

export default withStyles(OrderDetailsSkeleton, styles);
export { OrderDetailsSkeleton as OrderDetailsSkeletonVanilla };
