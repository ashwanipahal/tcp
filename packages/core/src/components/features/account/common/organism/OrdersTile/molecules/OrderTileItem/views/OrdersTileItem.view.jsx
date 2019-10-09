import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { BodyCopy } from '../../../../../../../../common/atoms';
import Anchor from '../../../../../../../../common/atoms/Anchor';
import internalEndpoints from '../../../../../internalEndpoints';

export const OrdersTileItem = ({ labels, orderItem }) => {
  return (
    <BodyCopy component="div" className="elem-mb-LRG">
      <BodyCopy component="div" className="elem-mt-XXXS">
        <BodyCopy component="span" data-locator="emailLbl" fontSize="fs14" fontFamily="secondary">
          {getLabelValue(labels, 'lbl_ordersTile_orderNum', 'orders')}
          {': '}
          <Anchor
            fontSizeVariation="large"
            underline
            anchorVariation="primary"
            fontSize="fs14"
            dataLocator="order-number-value"
            to={`${internalEndpoints.orderPage.link}&orderId=${orderItem.orderNumber}`}
            asPath={`${internalEndpoints.orderPage.path}/${orderItem.orderNumber}`}
            fontFamily="secondary"
          >
            {orderItem.orderNumber}
          </Anchor>
        </BodyCopy>
      </BodyCopy>
      <BodyCopy component="div" className="elem-mt-XXXS">
        <BodyCopy component="span" data-locator="emailLbl" fontSize="fs14" fontFamily="secondary">
          {getLabelValue(labels, 'lbl_orders_orderDate', 'orders')}
          {': '}
          {orderItem.orderDate}
        </BodyCopy>
      </BodyCopy>
      <BodyCopy component="div" className="elem-mt-XXXS">
        <BodyCopy component="span" data-locator="emailLbl" fontSize="fs14" fontFamily="secondary">
          {getLabelValue(labels, 'lbl_ordersTile_purchase', 'orders')}
          {': '}
          {orderItem.isEcomOrder
            ? getLabelValue(labels, 'lbl_orders_online', 'orders')
            : getLabelValue(labels, 'lbl_orders_pickupStore', 'orders')}
        </BodyCopy>
      </BodyCopy>
      <BodyCopy component="div" className="elem-mt-XXXS">
        <BodyCopy component="span" data-locator="emailLbl" fontSize="fs14" fontFamily="secondary">
          {getLabelValue(labels, 'lbl_orders_orderStatus', 'orders')}
          {': '}
          {getLabelValue(labels, orderItem.orderStatus, 'orders')}
        </BodyCopy>
      </BodyCopy>
      <BodyCopy component="div" className="elem-mt-XXXS">
        <BodyCopy component="span" data-locator="emailLbl" fontSize="fs14" fontFamily="secondary">
          {getLabelValue(labels, 'lbl_orders_orderTotal', 'orders')}
          {': '}
          {orderItem.orderTotal}
        </BodyCopy>
      </BodyCopy>
    </BodyCopy>
  );
};

OrdersTileItem.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  orderItem: PropTypes.shape({}).isRequired,
};

export default OrdersTileItem;
