import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import OrdersListItem from '../../OrdersListItem';
import EmptyOrdersList from '../../EmptyOrdersList';

/**
 * This component will render RecentOrders component
 * @param { string, object, object }
 */
export const RecentOrders = ({ className, ordersListItems, labels }) => {
  return (
    <BodyCopy className={className}>
      <BodyCopy
        dataLocator="recent-order_heading"
        fontFamily="secondary"
        fontSize="fs16"
        component="h3"
        fontWeight="semibold"
        className="elem-mt-SM"
      >
        {getLabelValue(labels, 'lbl_orders_recentOrder', 'orders')}
      </BodyCopy>
      {ordersListItems && ordersListItems.length ? (
        <OrdersListItem labels={labels} orderItem={ordersListItems[0]} />
      ) : (
        <EmptyOrdersList labels={labels} />
      )}
    </BodyCopy>
  );
};

RecentOrders.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  ordersListItems: PropTypes.shape([]).isRequired,
  className: PropTypes.string,
};

RecentOrders.defaultProps = {
  className: '',
};

export default RecentOrders;
