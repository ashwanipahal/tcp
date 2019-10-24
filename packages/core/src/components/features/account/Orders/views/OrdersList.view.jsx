import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import FormPageHeading from '../../common/molecule/FormPageHeading';
import RecentOrders from '../molecules/RecentOrders';
import OrdersLinks from '../molecules/OrdersLinks';
import PastOrders from '../molecules/PastOrders';

/**
 * This component will render OrdersList component
 * @param { string, object }
 */
export const OrdersList = ({ labels, ordersListItems, ...otherprops }) => {
  return (
    <React.Fragment>
      <FormPageHeading
        className="elem-mb-XL myAccountRightView"
        heading={getLabelValue(labels, 'lbl_orders_heading', 'orders')}
        data-locator="OrdersListPageLbl"
      />
      <OrdersLinks labels={labels} {...otherprops} />
      <RecentOrders labels={labels} ordersListItems={ordersListItems} />
      {ordersListItems && ordersListItems.length > 1 ? (
        <PastOrders labels={labels} ordersListItems={ordersListItems} />
      ) : null}
    </React.Fragment>
  );
};

OrdersList.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  ordersListItems: PropTypes.shape([]).isRequired,
};

export default OrdersList;
