import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import FormPageHeading from '../../common/molecule/FormPageHeading';
import RecentOrders from '../molecules/RecentOrders';
import OrdersLinks from '../molecules/OrdersLinks';
import PastOrders from '../molecules/PastOrders';
import OrderPreviewItemsList from '../molecules/OrderPreviewItemsList';

/**
 * This component will render OrdersList component
 * @param { string, object }
 */
export const OrdersList = ({ labels, orderItems, ordersListItems, ...otherprops }) => {
  return (
    <React.Fragment>
      <FormPageHeading
        className="elem-mb-XL myAccountRightView"
        heading={getLabelValue(labels, 'lbl_orders_heading', 'orders')}
        data-locator="OrdersListPageLbl"
      />
      <OrdersLinks labels={labels} {...otherprops} />
      <RecentOrders labels={labels} ordersListItems={ordersListItems} />
      {orderItems && orderItems.length > 0 ? (
        <OrderPreviewItemsList
          labels={labels}
          items={orderItems.slice(0, 3)}
          orderNumber={ordersListItems[0].orderNumber}
          trackingUrl={ordersListItems[0].orderTrackingUrl}
        />
      ) : null}
      {ordersListItems && ordersListItems.length > 1 ? (
        <PastOrders labels={labels} ordersListItems={ordersListItems} />
      ) : null}
    </React.Fragment>
  );
};

OrdersList.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  ordersListItems: PropTypes.shape([]).isRequired,
  orderItems: PropTypes.shape({}).isRequired,
};

export default OrdersList;
