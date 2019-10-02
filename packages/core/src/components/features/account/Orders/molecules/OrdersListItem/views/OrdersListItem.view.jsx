import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { Row, Col, BodyCopy } from '../../../../../../common/atoms';
import internalEndpoints from '../../../../common/internalEndpoints';

/**
 * This component will render OrdersListItem component
 * @param { string, object, boolean }
 */
export const OrdersListItem = ({ labels, orderItem, hideHeader }) => {
  const { orderDate, orderNumber, orderStatus, orderTotal, isEcomOrder } = orderItem;
  const rowHeaderClass = hideHeader ? 'hide-on-desktop hide-on-tablet' : '';
  return (
    <>
      <Row fullBleed>
        <Col colSize={{ large: 5, medium: 3, small: 6 }}>
          <Row fullBleed className={`elem-pb-MED elem-pt-MED ${rowHeaderClass}`}>
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
          <Row fullBleed className="elem-mb-LRG">
            <Col colSize={{ large: 6, medium: 4, small: 2 }}>
              <BodyCopy
                data-locator="order-date-value"
                fontFamily="secondary"
                fontWeight="regular"
                fontSize="fs14"
              >
                {orderDate}
              </BodyCopy>
            </Col>
            <Col colSize={{ large: 2, medium: 4, small: 4 }}>
              <Anchor
                fontSizeVariation="large"
                underline
                anchorVariation="primary"
                fontSize="fs14"
                dataLocator="order-number-value"
                to={`${internalEndpoints.orderPage.link}&orderId=${orderNumber}`}
                asPath={`${internalEndpoints.orderPage.path}/${orderNumber}`}
                fontFamily="secondary"
              >
                {orderNumber}
              </Anchor>
            </Col>
          </Row>
        </Col>
        <Col colSize={{ large: 7, medium: 5, small: 6 }} ignoreGutter={{ small: true }}>
          <Row fullBleed className={`elem-pb-MED elem-pt-MED ${rowHeaderClass}`}>
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
                textAlign="right"
              >
                {getLabelValue(labels, 'lbl_orders_orderTotal', 'orders')}
              </BodyCopy>
            </Col>
          </Row>
          <Row fullBleed className="elem-mb-LRG">
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy
                data-locator="order-type-value"
                fontFamily="secondary"
                fontWeight="regular"
                fontSize="fs14"
              >
                {isEcomOrder
                  ? getLabelValue(labels, 'lbl_orders_online', 'orders')
                  : getLabelValue(labels, 'lbl_orders_pickupStore', 'orders')}
              </BodyCopy>
            </Col>
            <Col colSize={{ large: 4, medium: 3, small: 2 }}>
              <BodyCopy
                data-locator="order-status-value"
                fontFamily="secondary"
                fontWeight="regular"
                fontSize="fs14"
              >
                {getLabelValue(labels, orderStatus, 'orders')}
              </BodyCopy>
            </Col>
            <Col colSize={{ large: 4, medium: 2, small: 2 }}>
              <BodyCopy
                data-locator="order-total-value"
                fontFamily="secondary"
                fontWeight="regular"
                textAlign="right"
                fontSize="fs14"
              >
                {orderTotal}
              </BodyCopy>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

OrdersListItem.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  orderItem: PropTypes.shape([]).isRequired,
  hideHeader: PropTypes.bool,
};

OrdersListItem.defaultProps = {
  hideHeader: false,
};

export default OrdersListItem;
