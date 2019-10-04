import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/OrdersTile.style';
import AccountOverviewTile from '../../../../../../common/molecules/AccountOverviewTile';
import EmptyOrdersTile from '../../../molecule/EmptyOrdersTile';
import { OrdersTileItem } from '../molecules/OrderTileItem/views/OrdersTileItem.view';

export const OrdersTile = ({ labels, ordersList }) => {
  const selectedOrders = ordersList && ordersList.orders.slice(0, 2);
  let ordersItemList;
  if (selectedOrders && selectedOrders.length) {
    ordersItemList = selectedOrders.map(orderItem => (
      <OrdersTileItem orderItem={orderItem} labels={labels} />
    ));
  } else {
    ordersItemList = <EmptyOrdersTile labels={labels} />;
  }
  return (
    <AccountOverviewTile
      title={getLabelValue(labels, 'lbl_ordersTile_heading', 'orders')}
      ctaTitle={getLabelValue(labels, 'lbl_ordersTile_viewAllOrders', 'orders')}
      dataLocatorPrefix="orders"
      ctaLink="/account?id=orders"
      ctaPath="/account/orders"
    >
      {ordersItemList}
    </AccountOverviewTile>
  );
};

OrdersTile.propTypes = {
  labels: PropTypes.shape({}),
  ordersList: PropTypes.shape({}).isRequired,
};

OrdersTile.defaultProps = {
  labels: {
    lbl_ordersTile_heading: '',
    lbl_ordersTile_viewAllOrders: '',
  },
};

export default withStyles(OrdersTile, styles);
