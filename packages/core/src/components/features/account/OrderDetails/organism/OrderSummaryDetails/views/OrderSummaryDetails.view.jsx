import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Row, Col } from '@tcp/core/src/components/common/atoms';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/OrderSummaryDetails.style';
import formatAmount from '../utils';

/**
 * This function component use for return the OrderShippingDetails
 * can be passed in the component.
 * @param ordersLabels - ordersLabels object used for showing Orders Labels
 */

const OrderSummaryDetails = ({ className, ordersLabels, orderDetailsData }) => {
  const { summary } = orderDetailsData || {};
  const {
    canceledItems,
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

  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  return (
    <BodyCopy component="div" className={className}>
      <Row fullBleed className="elem-mb-XS">
        <Col colSize={{ large: 7, medium: 4, small: 3 }}>
          <BodyCopy fontSize="fs14" fontWeight="extrabold" fontFamily="secondary">
            {getLabelValue(ordersLabels, 'lbl_orderDetails_orderSummary')}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 5, medium: 4, small: 3 }}>
          <BodyCopy fontSize="fs14" fontWeight="extrabold" fontFamily="secondary" textAlign="right">
            {getLabelValue(ordersLabels, 'lbl_orders_orderTotal')}
          </BodyCopy>
        </Col>
      </Row>
      <Row fullBleed className="elem-mb-XS">
        <Col colSize={{ large: 7, medium: 4, small: 3 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14">
            {`${getLabelValue(ordersLabels, 'lbl_orders_items')} (${purchasedItems ||
              canceledItems}):`}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 5, medium: 4, small: 3 }}>
          <BodyCopy fontFamily="secondary" fontSize="fs14" textAlign="right">
            {formatAmount(subTotal, currencySymbol)}
          </BodyCopy>
        </Col>
      </Row>
      {!!grandTotal && (
        <>
          <Row fullBleed className="elem-mb-XS">
            <Col colSize={{ large: 7, medium: 4, small: 3 }}>
              <BodyCopy fontFamily="secondary" fontSize="fs14">
                {`${getLabelValue(ordersLabels, 'lbl_orders_couponsPromotions')}:`}
              </BodyCopy>
            </Col>
            <Col colSize={{ large: 5, medium: 4, small: 3 }}>
              <BodyCopy fontFamily="secondary" fontSize="fs14" textAlign="right">
                {formatAmount(couponsTotal, currencySymbol)}
              </BodyCopy>
            </Col>
          </Row>

          <Row fullBleed className="elem-mb-XS">
            <Col colSize={{ large: 7, medium: 4, small: 3 }}>
              <BodyCopy fontFamily="secondary" fontSize="fs14">
                {`${getLabelValue(ordersLabels, 'lbl_orderDetails_shipping')}:`}
              </BodyCopy>
            </Col>
            <Col colSize={{ large: 5, medium: 4, small: 3 }}>
              <BodyCopy fontFamily="secondary" fontSize="fs14" textAlign="right">
                {shippingTotal > 0
                  ? formatAmount(shippingTotal, currencySymbol)
                  : `${getLabelValue(ordersLabels, 'lbl_orders_free')}`}
              </BodyCopy>
            </Col>
          </Row>

          <Row fullBleed className="elem-mb-XS">
            <Col colSize={{ large: 7, medium: 4, small: 3 }}>
              <BodyCopy fontFamily="secondary" fontSize="fs14">
                {`${getLabelValue(ordersLabels, 'lbl_orders_tax')}:`}
              </BodyCopy>
            </Col>
            <Col colSize={{ large: 5, medium: 4, small: 3 }}>
              <BodyCopy fontFamily="secondary" fontSize="fs14" textAlign="right">
                {totalTax
                  ? `${currencySymbol}${totalTax.toFixed(2)}`
                  : `${currencySymbol}${getLabelValue(ordersLabels, 'lbl_orders_freeAmount')}`}
              </BodyCopy>
            </Col>
          </Row>
        </>
      )}
      <Row fullBleed className="elem-mb-XS total-value">
        <Col colSize={{ large: 7, medium: 4, small: 3 }}>
          <BodyCopy fontSize="fs16" fontWeight="extrabold" fontFamily="secondary">
            {`${getLabelValue(ordersLabels, 'lbl_orders_orderTotal')}:`}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 5, medium: 4, small: 3 }}>
          <BodyCopy fontSize="fs16" fontWeight="extrabold" fontFamily="secondary" textAlign="right">
            {grandTotal
              ? `${currencySymbol}${grandTotal.toFixed(2)}`
              : `${currencySymbol}${getLabelValue(ordersLabels, 'lbl_orders_freeAmount')}`}
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
export { OrderSummaryDetails as OrderSummaryDetailsVanilla };
