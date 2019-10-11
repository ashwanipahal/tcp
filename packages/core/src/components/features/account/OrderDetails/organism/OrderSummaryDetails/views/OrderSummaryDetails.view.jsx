import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Row, Col } from '@tcp/core/src/components/common/atoms';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/OrderSummaryDetails.style';
/**
 * This function component use for return the OrderShippingDetails
 * can be passed in the component.
 * @param ordersLabels - ordersLabels object used for showing Orders Labels
 */

const OrderSummaryDetails = ({ className, ordersLabels, orderSummaryData }) => {
  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  return (
    <BodyCopy component="div" className={className}>
      <Row className="row-margin">
        <Col colSize={{ large: 7, medium: 4, small: 3 }}>
          <BodyCopy fontSize="fs14" fontWeight="extrabold" fontFamily="secondary">
            {getLabelValue(ordersLabels, 'lbl_orderDetails_orderSummary')}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 5, medium: 3, small: 3 }}>
          <BodyCopy fontSize="fs14" fontWeight="extrabold" fontFamily="secondary" textAlign="right">
            Total
          </BodyCopy>
        </Col>
      </Row>
      <Row className="items-total row-margin">
        <Col colSize={{ large: 6, medium: 4, small: 3 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14">
            {`Items (1):`}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 6, medium: 3, small: 3 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14" textAlign="right">
            {`${orderSummaryData.currencySymbol}420`}
          </BodyCopy>
        </Col>
      </Row>
      <Row className="items-total row-margin">
        <Col colSize={{ large: 6, medium: 4, small: 3 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14">
            Coupons & Promotions
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 6, medium: 3, small: 3 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14" textAlign="right">
            %110.00
          </BodyCopy>
        </Col>
      </Row>
      <Row className="items-total row-margin">
        <Col colSize={{ large: 6, medium: 4, small: 3 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14">
            {`${getLabelValue(ordersLabels, 'lbl_orderDetails_shipping')}:`}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 6, medium: 3, small: 3 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14" textAlign="right">
            FREE
          </BodyCopy>
        </Col>
      </Row>
      <Row className="items-total row-margin">
        <Col colSize={{ large: 6, medium: 4, small: 3 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14">
            tax:
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 6, medium: 3, small: 3 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14" textAlign="right">
            $0.00
          </BodyCopy>
        </Col>
      </Row>
      <Row className="row-margin">
        <Col colSize={{ large: 7, medium: 4, small: 3 }}>
          <BodyCopy fontSize="fs14" fontWeight="extrabold" fontFamily="secondary">
            Total
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 5, medium: 3, small: 3 }}>
          <BodyCopy fontSize="fs14" fontWeight="extrabold" fontFamily="secondary" textAlign="right">
            $0.0
          </BodyCopy>
        </Col>
      </Row>
    </BodyCopy>
  );
};
OrderSummaryDetails.propTypes = {
  className: PropTypes.string,
  ordersLabels: PropTypes.shape({
    lbl_orderDetails_orderSummary: PropTypes.string,
  }),
  orderSummaryData: PropTypes.shape({}),
};

OrderSummaryDetails.defaultProps = {
  className: '',
  ordersLabels: {
    lbl_orderDetails_orderSummary: '',
  },
  orderSummaryData: {},
};

export default withStyles(OrderSummaryDetails, styles);
