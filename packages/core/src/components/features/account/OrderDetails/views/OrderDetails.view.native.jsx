import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';

import { OrderDetailsMainView } from '../styles/OrderDetails.style.native';
import OrderBasicDetails from '../organism/OrderBasicDetails';
import OrderShippingDetails from '../organism/OrderShippingDetails';
import OrderBillingDetails from '../organism/OrderBillingDetails';
import OrderSummaryDetails from '../organism/OrderSummaryDetails';

export const OrderDetailsView = ({ orderDetailsData, ordersLabels }) => {
  const { orderNumber } = orderDetailsData || {};
  return (
    <>
      {orderDetailsData && (
        <>
          <OrderDetailsMainView>
            <BodyCopyWithSpacing
              fontFamily="primary"
              fontSize="fs12"
              fontWeight="semibold"
              spacingStyles="margin-top-MED margin-bottom-MED"
              text={`${getLabelValue(ordersLabels, 'lbl_orderDetail_heading')} #${orderNumber}`}
              textAlign="center"
            />
          </OrderDetailsMainView>
          <OrderBasicDetails orderDetailsData={orderDetailsData} ordersLabels={ordersLabels} />
          <OrderShippingDetails orderDetailsData={orderDetailsData} ordersLabels={ordersLabels} />
          <OrderBillingDetails orderDetailsData={orderDetailsData} ordersLabels={ordersLabels} />
          <OrderSummaryDetails orderDetailsData={orderDetailsData} ordersLabels={ordersLabels} />
        </>
      )}
    </>
  );
};

OrderDetailsView.propTypes = {
  orderDetailsData: PropTypes.shape({}),
  ordersLabels: PropTypes.shape({}),
};

OrderDetailsView.defaultProps = {
  ordersLabels: {},
  orderDetailsData: {},
};

export default OrderDetailsView;
