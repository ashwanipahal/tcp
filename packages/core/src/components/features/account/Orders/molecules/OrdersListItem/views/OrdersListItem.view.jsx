import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { Row, Col, BodyCopy } from '../../../../../../common/atoms';
import internalEndpoints from '../../../../common/internalEndpoints';
import styles from '../styles/OrdersListItem.style';

/**
 * This component will render OrdersListItem component
 * @param { string, object, boolean }
 */
export const OrdersListItem = ({ labels, orderItem, hideHeader, className }) => {
  const { orderDate, orderNumber, orderStatus, orderTotal, isEcomOrder } = orderItem;
  const rowHeaderClass = hideHeader ? 'hide-on-desktop hide-on-tablet' : '';
  return (
    <>
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
                className="order-total"
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
  className: PropTypes.string,
};

OrdersListItem.defaultProps = {
  hideHeader: false,
  className: '',
};

export default withStyles(OrdersListItem, styles);
