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

const OrderSummaryDetails = ({ className, ordersLabels, orderDetailsData }) => {
  const { summary } = orderDetailsData || {};
  const {
    // canceledItem,
    couponsTotal,
    currencySymbol,
    grandTotal,
    purchasedItems,
    // returnedItems,
    // returnedTotal,
    // shippedItems,
    shippingTotal,
    subTotal,
    // totalItems,
    totalTax,
  } = summary || {};
  const shippingValue =
    shippingTotal > 0
      ? `${currencySymbol}${shippingTotal.toFixed(2)}`
      : getLabelValue(ordersLabels, 'lbl_orders_free');
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
        <Col colSize={{ large: 5, medium: 4, small: 3 }}>
          <BodyCopy fontSize="fs14" fontWeight="extrabold" fontFamily="secondary" textAlign="right">
            {getLabelValue(ordersLabels, 'lbl_orders_items')}
          </BodyCopy>
        </Col>
      </Row>
      <Row className="row-margin">
        <Col colSize={{ large: 7, medium: 4, small: 3 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14">
            {`${getLabelValue(ordersLabels, 'lbl_orders_items')} (${purchasedItems}):`}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 5, medium: 4, small: 3 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14" textAlign="right">
            {`${currencySymbol}${subTotal.toFixed(2)}`}
          </BodyCopy>
        </Col>
      </Row>
      <Row className="row-margin">
        <Col colSize={{ large: 7, medium: 4, small: 3 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14">
            {getLabelValue(ordersLabels, 'lbl_orders_couponsPromotions')}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 5, medium: 4, small: 3 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14" textAlign="right">
            {`${currencySymbol}${couponsTotal.toFixed(2)}`}
          </BodyCopy>
        </Col>
      </Row>
      <Row className="row-margin">
        <Col colSize={{ large: 7, medium: 4, small: 3 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14">
            {`${getLabelValue(ordersLabels, 'lbl_orderDetails_shipping')}:`}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 5, medium: 4, small: 3 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14" textAlign="right">
            {shippingValue}
          </BodyCopy>
        </Col>
      </Row>
      <Row className="items-total row-margin">
        <Col colSize={{ large: 7, medium: 4, small: 3 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14">
            {`${getLabelValue(ordersLabels, 'lbl_orders_tax')}:`}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 5, medium: 4, small: 3 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14" textAlign="right">
            {`${currencySymbol}${totalTax.toFixed(2)}`}
          </BodyCopy>
        </Col>
      </Row>
      <Row className="row-margin total-value">
        <Col colSize={{ large: 7, medium: 4, small: 3 }}>
          <BodyCopy fontSize="fs16" fontWeight="extrabold" fontFamily="secondary">
            {`${getLabelValue(ordersLabels, 'lbl_orders_orderTotal')}:`}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 5, medium: 4, small: 3 }}>
          <BodyCopy fontSize="fs16" fontWeight="extrabold" fontFamily="secondary" textAlign="right">
            {`${currencySymbol}${grandTotal.toFixed(2)}`}
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
  orderDetailsData: PropTypes.shape({}),
};

OrderSummaryDetails.defaultProps = {
  className: '',
  ordersLabels: {
    lbl_orderDetails_orderSummary: '',
  },
  orderDetailsData: {},
};

export default withStyles(OrderSummaryDetails, styles);
